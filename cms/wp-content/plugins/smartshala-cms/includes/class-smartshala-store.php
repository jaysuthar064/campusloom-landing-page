<?php
/**
 * Reading, sanitising and writing section content.
 *
 * One WordPress option per page ("smartshala_page_home"), holding an array
 * keyed by section id. Stored values are always merged over the schema
 * defaults, so a field added to the schema later appears immediately with its
 * default rather than as null.
 */

defined( 'ABSPATH' ) || exit;

class SmartShala_Store {

	const PREFIX = 'smartshala_page_';

	protected static function option_name( $page_id ) {
		return self::PREFIX . $page_id;
	}

	/**
	 * Raw saved values for a page, with no defaults applied.
	 */
	public static function raw( $page_id ) {
		$value = get_option( self::option_name( $page_id ), array() );
		return is_array( $value ) ? $value : array();
	}

	/**
	 * A single section's content, defaults merged in.
	 */
	public static function section( $page_id, $section_id ) {
		$section = SmartShala_Schema::section( $page_id, $section_id );
		if ( ! $section ) {
			return array();
		}

		$saved = self::raw( $page_id );
		$saved = isset( $saved[ $section_id ] ) && is_array( $saved[ $section_id ] )
			? $saved[ $section_id ]
			: array();

		$out = array();
		foreach ( $section['fields'] as $field ) {
			$out[ $field['id'] ] = array_key_exists( $field['id'], $saved )
				? self::resolve( $field, $saved[ $field['id'] ] )
				: SmartShala_Schema::field_default( $field );
		}
		return $out;
	}

	/**
	 * Every section of a page, defaults merged in. This is what REST returns.
	 */
	public static function page( $page_id ) {
		$page = SmartShala_Schema::page( $page_id );
		if ( ! $page ) {
			return array();
		}

		$out = array();
		foreach ( $page['sections'] as $section ) {
			$out[ $section['id'] ] = self::section( $page_id, $section['id'] );
		}
		return $out;
	}

	/**
	 * Turn a stored value into its output form.
	 *
	 * Images are the only type that needs work: only the attachment id is
	 * authoritative, so the URL is looked up fresh each time. That way moving
	 * to a CDN or regenerating thumbnails does not leave stale URLs behind.
	 *
	 * @return mixed
	 */
	protected static function resolve( array $field, $value ) {
		switch ( $field['type'] ) {

			case 'image':
				$id  = is_array( $value ) && ! empty( $value['id'] ) ? (int) $value['id'] : 0;
				$url = is_array( $value ) && ! empty( $value['url'] ) ? $value['url'] : '';

				if ( $id ) {
					$fresh = wp_get_attachment_url( $id );
					if ( $fresh ) {
						$url = $fresh;
					}
				}

				return array(
					'id'  => $id,
					'url' => $url,
					'alt' => $id ? (string) get_post_meta( $id, '_wp_attachment_image_alt', true ) : '',
				);

			case 'group':
				$value = is_array( $value ) ? $value : array();
				$out   = array();
				foreach ( $field['fields'] as $child ) {
					$out[ $child['id'] ] = array_key_exists( $child['id'], $value )
						? self::resolve( $child, $value[ $child['id'] ] )
						: SmartShala_Schema::field_default( $child );
				}
				return $out;

			case 'repeater':
				if ( ! is_array( $value ) ) {
					return array();
				}
				$rows = array();
				foreach ( $value as $row ) {
					if ( ! is_array( $row ) ) {
						continue;
					}
					$out = array();
					foreach ( $field['fields'] as $child ) {
						$out[ $child['id'] ] = array_key_exists( $child['id'], $row )
							? self::resolve( $child, $row[ $child['id'] ] )
							: SmartShala_Schema::field_default( $child );
					}
					$rows[] = $out;
				}
				return array_values( $rows );

			case 'toggle':
				return (bool) $value;

			default:
				return $value;
		}
	}

	/**
	 * Save one section, sanitising strictly against its schema.
	 *
	 * Anything not described by the schema is dropped, so a tampered form post
	 * cannot write arbitrary keys into the option.
	 */
	public static function save_section( $page_id, $section_id, array $input ) {
		$section = SmartShala_Schema::section( $page_id, $section_id );
		if ( ! $section ) {
			return false;
		}

		$clean = array();
		foreach ( $section['fields'] as $field ) {
			$clean[ $field['id'] ] = self::sanitize(
				$field,
				array_key_exists( $field['id'], $input ) ? $input[ $field['id'] ] : null
			);
		}

		$all                = self::raw( $page_id );
		$all[ $section_id ] = $clean;

		return update_option( self::option_name( $page_id ), $all, false );
	}

	/**
	 * @return mixed
	 */
	protected static function sanitize( array $field, $value ) {
		if ( null === $value ) {
			return SmartShala_Schema::field_default( $field );
		}

		switch ( $field['type'] ) {

			case 'textarea':
				return sanitize_textarea_field( (string) $value );

			case 'url':
				// Allow in-page anchors and relative paths as well as absolute URLs.
				$value = trim( (string) $value );
				if ( '' === $value ) {
					return '';
				}
				if ( str_starts_with( $value, '#' ) || str_starts_with( $value, '/' ) ) {
					return sanitize_text_field( $value );
				}
				return esc_url_raw( $value );

			case 'icon':
				return sanitize_key( (string) $value );

			case 'toggle':
				return (bool) $value && 'false' !== $value;

			case 'select':
				$choices = isset( $field['choices'] ) ? array_keys( $field['choices'] ) : array();
				$value   = sanitize_text_field( (string) $value );
				return in_array( $value, $choices, true )
					? $value
					: SmartShala_Schema::field_default( $field );

			case 'image':
				$value = is_array( $value ) ? $value : array();
				$id    = ! empty( $value['id'] ) ? absint( $value['id'] ) : 0;
				return array(
					'id'  => $id,
					'url' => $id ? (string) wp_get_attachment_url( $id ) : '',
					'alt' => '',
				);

			case 'group':
				$value = is_array( $value ) ? $value : array();
				$out   = array();
				foreach ( $field['fields'] as $child ) {
					$out[ $child['id'] ] = self::sanitize(
						$child,
						array_key_exists( $child['id'], $value ) ? $value[ $child['id'] ] : null
					);
				}
				return $out;

			case 'repeater':
				if ( ! is_array( $value ) ) {
					return array();
				}
				$rows = array();
				foreach ( $value as $row ) {
					if ( ! is_array( $row ) ) {
						continue;
					}
					// The JS keeps an empty hidden template row; skip it.
					if ( ! empty( $row['__template'] ) ) {
						continue;
					}
					$clean = array();
					foreach ( $field['fields'] as $child ) {
						$clean[ $child['id'] ] = self::sanitize(
							$child,
							array_key_exists( $child['id'], $row ) ? $row[ $child['id'] ] : null
						);
					}
					$rows[] = $clean;
				}
				return array_values( $rows );

			default:
				return sanitize_text_field( (string) $value );
		}
	}
}
