<?php
/**
 * Plugin Name:       SmartShala CMS
 * Plugin URI:        https://letssmartshala.com
 * Description:       Headless content management for the SmartShala site. Every page is broken into sections, and every piece of text, image and link in those sections is editable here and served over the REST API.
 * Version:           1.6.0
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

define( 'SMARTSHALA_VERSION', '1.6.0' );
define( 'SMARTSHALA_FILE', __FILE__ );
define( 'SMARTSHALA_DIR', plugin_dir_path( __FILE__ ) );
define( 'SMARTSHALA_URL', plugin_dir_url( __FILE__ ) );

require_once SMARTSHALA_DIR . 'includes/class-smartshala-schema.php';
require_once SMARTSHALA_DIR . 'includes/class-smartshala-store.php';
require_once SMARTSHALA_DIR . 'includes/class-smartshala-admin.php';
require_once SMARTSHALA_DIR . 'includes/class-smartshala-rest.php';
require_once SMARTSHALA_DIR . 'includes/class-smartshala-leads.php';
require_once SMARTSHALA_DIR . 'includes/class-smartshala-freshsales.php';
require_once SMARTSHALA_DIR . 'includes/class-smartshala-settings.php';

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
	SmartShala_Settings::boot();
}, 1 );

/**
 * CORS.
 *
 * WordPress core already echoes the requesting origin back for REST responses
 * (see rest_send_cors_headers), which is what makes a headless setup work from
 * any deployment host — Vite locally, Vercel previews, the live domain.
 *
 * An earlier version of this plugin removed that core handler and replaced it
 * with a hardcoded localhost allowlist. That silently broke every deployed
 * environment: the API answered fine, but the browser discarded the response
 * for want of a header and the site rendered empty. Do not do that again.
 *
 * If the API ever needs locking to specific origins, set the
 * `smartshala_frontend_origins` option to a whitespace or comma separated list
 * and this takes over. Left empty, core's default applies — which is right for
 * public marketing content.
 */
add_action( 'rest_api_init', function () {
	$configured = trim( (string) get_option( 'smartshala_frontend_origins', '' ) );

	// Nothing configured: leave core alone. Any origin may read, which is the
	// WordPress default and correct for a public headless site.
	if ( '' === $configured ) {
		return;
	}

	$allowed = array();
	foreach ( preg_split( '/[\s,]+/', $configured ) as $origin ) {
		$origin = trim( $origin );
		if ( '' !== $origin ) {
			$allowed[] = untrailingslashit( $origin );
		}
	}

	remove_filter( 'rest_pre_serve_request', 'rest_send_cors_headers' );

	add_filter( 'rest_pre_serve_request', function ( $value ) use ( $allowed ) {
		$origin = get_http_origin();

		if ( $origin && in_array( untrailingslashit( $origin ), $allowed, true ) ) {
			header( 'Access-Control-Allow-Origin: ' . sanitize_url( $origin ) );
			header( 'Access-Control-Allow-Methods: OPTIONS, GET, POST' );
			header( 'Access-Control-Allow-Credentials: true' );
		}

		header( 'Vary: Origin', false );

		return $value;
	} );
}, 15 );
