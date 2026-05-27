<?php
/**
 * Plugin Name: Campus Loom Local Auto Login
 * Description: Local development helper for one-click wp-admin access.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function campus_loom_local_auto_login_allowed(): bool {
	$host   = strtolower( trim( (string) ( $_SERVER['HTTP_HOST'] ?? '' ) ) );
	$remote = (string) ( $_SERVER['REMOTE_ADDR'] ?? '' );

	return in_array( $host, [ 'localhost:8883', '127.0.0.1:8883' ], true )
		&& in_array( $remote, [ '127.0.0.1', '::1' ], true );
}

add_action(
	'init',
	static function (): void {
		if ( empty( $_GET['campus_local_login'] ) ) {
			return;
		}

		if ( ! campus_loom_local_auto_login_allowed() ) {
			status_header( 403 );
			wp_die( 'Local auto-login is only available from localhost.' );
		}

		$expected_token = defined( 'CAMPUS_LOOM_AUTO_LOGIN_TOKEN' ) ? (string) CAMPUS_LOOM_AUTO_LOGIN_TOKEN : '';
		$given_token    = sanitize_text_field( wp_unslash( $_GET['token'] ?? '' ) );

		if ( '' === $expected_token || ! hash_equals( $expected_token, $given_token ) ) {
			status_header( 403 );
			wp_die( 'Invalid local auto-login token.' );
		}

		$user = get_user_by( 'login', 'admin' );

		if ( ! $user instanceof WP_User || ! user_can( $user, 'manage_options' ) ) {
			status_header( 403 );
			wp_die( 'Local admin user was not found.' );
		}

		wp_set_current_user( (int) $user->ID, $user->user_login );
		wp_set_auth_cookie( (int) $user->ID, true, is_ssl() );
		do_action( 'wp_login', $user->user_login, $user );

		wp_safe_redirect( admin_url() );
		exit;
	},
	1
);
