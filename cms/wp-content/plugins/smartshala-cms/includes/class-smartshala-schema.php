<?php
/**
 * The schema registry.
 *
 * Holds the description of every page, its sections and their fields. Nothing
 * else in the plugin knows what a "hero" or a "navbar" is — they all read it
 * from here.
 *
 * Field types
 * -----------
 *   text      single line
 *   textarea  multi line
 *   url       single line, sanitised as a URL
 *   image     media library picker -> { id, url, alt }
 *   icon      lucide icon name, e.g. "calendar"
 *   select    fixed choices, needs 'choices' => [ value => label ]
 *   toggle    boolean
 *   group     fixed set of child 'fields'
 *   repeater  variable number of rows, each with child 'fields'
 */

defined( 'ABSPATH' ) || exit;

class SmartShala_Schema {

	/** @var array<string,array> Registered pages, keyed by page id. */
	protected static $pages = array();

	public static function boot() {
		$pages = array();

		foreach ( glob( SMARTSHALA_DIR . 'schema/*.php' ) as $file ) {
			$page = require $file;
			if ( is_array( $page ) && ! empty( $page['id'] ) ) {
				$pages[ $page['id'] ] = $page;
			}
		}

		/**
		 * Allows extra pages or sections to be registered from elsewhere.
		 */
		self::$pages = apply_filters( 'smartshala_pages', $pages );
	}

	/** @return array<string,array> */
	public static function pages() {
		return self::$pages;
	}

	/** @return array|null */
	public static function page( $page_id ) {
		return isset( self::$pages[ $page_id ] ) ? self::$pages[ $page_id ] : null;
	}

	/** @return array|null */
	public static function section( $page_id, $section_id ) {
		$page = self::page( $page_id );
		if ( ! $page ) {
			return null;
		}
		foreach ( $page['sections'] as $section ) {
			if ( $section['id'] === $section_id ) {
				return $section;
			}
		}
		return null;
	}

	/**
	 * Default value for a single field definition.
	 *
	 * @return mixed
	 */
	public static function field_default( array $field ) {
		if ( array_key_exists( 'default', $field ) ) {
			return $field['default'];
		}

		switch ( $field['type'] ) {
			case 'repeater':
				return array();
			case 'toggle':
				return false;
			case 'image':
				return array( 'id' => 0, 'url' => '', 'alt' => '' );
			case 'group':
				$out = array();
				foreach ( $field['fields'] as $child ) {
					$out[ $child['id'] ] = self::field_default( $child );
				}
				return $out;
			default:
				return '';
		}
	}

	/**
	 * Defaults for a whole section, keyed by field id.
	 */
	public static function section_defaults( array $section ) {
		$out = array();
		foreach ( $section['fields'] as $field ) {
			$out[ $field['id'] ] = self::field_default( $field );
		}
		return $out;
	}
}
