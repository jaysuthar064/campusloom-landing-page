<?php
/**
 * The read API the React frontend consumes.
 *
 *   GET /wp-json/smartshala/v1/pages              list registered pages
 *   GET /wp-json/smartshala/v1/page/{id}          every section of a page
 *   GET /wp-json/smartshala/v1/page/{id}/{sect}   one section
 *
 * Public and read-only — this is published website content.
 */

defined( 'ABSPATH' ) || exit;

class SmartShala_REST {

	const NAMESPACE = 'smartshala/v1';

	public static function boot() {
		add_action( 'rest_api_init', array( __CLASS__, 'routes' ) );
	}

	public static function routes() {
		register_rest_route( self::NAMESPACE, '/pages', array(
			'methods'             => WP_REST_Server::READABLE,
			'permission_callback' => '__return_true',
			'callback'            => array( __CLASS__, 'get_pages' ),
		) );

		register_rest_route( self::NAMESPACE, '/page/(?P<page>[a-z0-9\-_]+)', array(
			'methods'             => WP_REST_Server::READABLE,
			'permission_callback' => '__return_true',
			'callback'            => array( __CLASS__, 'get_page' ),
			'args'                => array(
				'page' => array( 'sanitize_callback' => 'sanitize_key' ),
			),
		) );

		register_rest_route( self::NAMESPACE, '/page/(?P<page>[a-z0-9\-_]+)/(?P<section>[a-z0-9\-_]+)', array(
			'methods'             => WP_REST_Server::READABLE,
			'permission_callback' => '__return_true',
			'callback'            => array( __CLASS__, 'get_section' ),
			'args'                => array(
				'page'    => array( 'sanitize_callback' => 'sanitize_key' ),
				'section' => array( 'sanitize_callback' => 'sanitize_key' ),
			),
		) );
	}

	public static function get_pages() {
		$out = array();
		foreach ( SmartShala_Schema::pages() as $page ) {
			$sections = array();
			foreach ( $page['sections'] as $section ) {
				$sections[] = array(
					'id'    => $section['id'],
					'label' => $section['label'],
				);
			}
			$out[] = array(
				'id'       => $page['id'],
				'label'    => $page['label'],
				'sections' => $sections,
			);
		}
		return rest_ensure_response( $out );
	}

	public static function get_page( WP_REST_Request $request ) {
		$page_id = $request['page'];

		if ( ! SmartShala_Schema::page( $page_id ) ) {
			return new WP_Error( 'smartshala_no_page', __( 'Page not found.', 'smartshala' ), array( 'status' => 404 ) );
		}

		return rest_ensure_response( array(
			'page'     => $page_id,
			'sections' => SmartShala_Store::page( $page_id ),
		) );
	}

	public static function get_section( WP_REST_Request $request ) {
		$page_id    = $request['page'];
		$section_id = $request['section'];

		if ( ! SmartShala_Schema::section( $page_id, $section_id ) ) {
			return new WP_Error( 'smartshala_no_section', __( 'Section not found.', 'smartshala' ), array( 'status' => 404 ) );
		}

		return rest_ensure_response( SmartShala_Store::section( $page_id, $section_id ) );
	}
}
