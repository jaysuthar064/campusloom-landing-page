<?php
/**
 * Plugin Name:       SmartShala CMS
 * Plugin URI:        https://letssmartshala.com
 * Description:       Headless content management for the SmartShala site. Every page is broken into sections, and every piece of text, image and link in those sections is editable here and served over the REST API.
 * Version:           1.2.0
 * Requires at least: 6.5
 * Requires PHP:      8.0
 * Author:            Site ON Lab
 * Text Domain:       smartshala
 *
 * ---------------------------------------------------------------------------
 * How this plugin works
 * ---------------------------------------------------------------------------
 * It is schema driven. A page is described once, as a PHP array, in schema/.
 * That single description generates three things automatically:
 *
 *   1. the admin editing screen (one submenu per page, one tab per section),
 *   2. the save + sanitise routine,
 *   3. the REST response the React frontend consumes.
 *
 * So adding a new field, section or page later means editing the schema only.
 * There is no admin markup or REST code to touch. See schema/home.php.
 */

defined( 'ABSPATH' ) || exit;

define( 'SMARTSHALA_VERSION', '1.2.0' );
define( 'SMARTSHALA_FILE', __FILE__ );
define( 'SMARTSHALA_DIR', plugin_dir_path( __FILE__ ) );
define( 'SMARTSHALA_URL', plugin_dir_url( __FILE__ ) );

require_once SMARTSHALA_DIR . 'includes/class-smartshala-schema.php';
require_once SMARTSHALA_DIR . 'includes/class-smartshala-store.php';
require_once SMARTSHALA_DIR . 'includes/class-smartshala-admin.php';
require_once SMARTSHALA_DIR . 'includes/class-smartshala-rest.php';
require_once SMARTSHALA_DIR . 'includes/class-smartshala-leads.php';

/**
 * Boot on `init`, not `plugins_loaded`.
 *
 * The schema files call __() for their labels, and WordPress 6.7+ warns if a
 * text domain is loaded before `init`. Booting here keeps translation loading
 * legal. `admin_menu` and `rest_api_init` both fire after `init`, so nothing
 * is registered too late.
 */
add_action( 'init', function () {
	SmartShala_Schema::boot();
	SmartShala_Admin::boot();
	SmartShala_REST::boot();
	SmartShala_Leads::boot();
}, 1 );

/**
 * The frontend is served from a different origin during development (Vite on
 * :5173), so the REST API has to allow it explicitly. Read endpoints only —
 * writes still require a logged-in WordPress user and a nonce.
 */
add_action( 'rest_api_init', function () {
	remove_filter( 'rest_pre_serve_request', 'rest_send_cors_headers' );

	add_filter( 'rest_pre_serve_request', function ( $value ) {
		$origin  = get_http_origin();
		$allowed = apply_filters( 'smartshala_allowed_origins', array(
			'http://localhost:5173',
			'http://127.0.0.1:5173',
			'http://localhost:4173',
		) );

		if ( $origin && in_array( $origin, $allowed, true ) ) {
			header( 'Access-Control-Allow-Origin: ' . esc_url_raw( $origin ) );
			header( 'Access-Control-Allow-Methods: GET, POST, OPTIONS' );
			header( 'Access-Control-Allow-Credentials: true' );
			header( 'Vary: Origin' );
		}

		return $value;
	} );
}, 15 );
