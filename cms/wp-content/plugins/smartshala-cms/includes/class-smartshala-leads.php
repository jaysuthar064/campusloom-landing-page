<?php
/**
 * Demo requests.
 *
 * Stores submissions as a private post type so they are readable in wp-admin,
 * and emails the site admin. Public POST endpoint:
 *
 *   POST /wp-json/smartshala/v1/leads
 *
 * Spam handling is deliberately simple rather than a third-party service: a
 * honeypot field plus a per-IP rate limit stops the drive-by bots that make up
 * almost all of it. Add a captcha later if real volume gets through.
 */

defined( 'ABSPATH' ) || exit;

class SmartShala_Leads {

	const POST_TYPE   = 'smartshala_lead';
	const RATE_WINDOW = 300; // seconds
	const RATE_MAX    = 5;   // submissions per window, per IP

	public static function boot() {
		add_action( 'init', array( __CLASS__, 'register_type' ) );
		add_action( 'rest_api_init', array( __CLASS__, 'routes' ) );
		add_filter( 'manage_' . self::POST_TYPE . '_posts_columns', array( __CLASS__, 'columns' ) );
		add_action( 'manage_' . self::POST_TYPE . '_posts_custom_column', array( __CLASS__, 'column' ), 10, 2 );
	}

	public static function register_type() {
		register_post_type( self::POST_TYPE, array(
			'labels'          => array(
				'name'          => __( 'Demo Requests', 'smartshala' ),
				'singular_name' => __( 'Demo Request', 'smartshala' ),
				'menu_name'     => __( 'Demo Requests', 'smartshala' ),
			),
			'public'          => false,
			'show_ui'         => true,
			'show_in_menu'    => 'smartshala',
			'capability_type' => 'post',
			'capabilities'    => array( 'create_posts' => 'do_not_allow' ),
			'map_meta_cap'    => true,
			'supports'        => array( 'title' ),
		) );
	}

	public static function routes() {
		register_rest_route( 'smartshala/v1', '/leads', array(
			'methods'             => 'POST',
			'permission_callback' => '__return_true',
			'callback'            => array( __CLASS__, 'create' ),
		) );
	}

	/** The fields a submission may contain, and how each is cleaned. */
	protected static function fields() {
		return array(
			'name'     => 'sanitize_text_field',
			'school'   => 'sanitize_text_field',
			'role'     => 'sanitize_text_field',
			'email'    => 'sanitize_email',
			'phone'    => 'sanitize_text_field',
			'city'     => 'sanitize_text_field',
			'students' => 'sanitize_text_field',
			'subject'  => 'sanitize_text_field',
			'message'  => 'sanitize_textarea_field',
			'source'   => 'sanitize_text_field',
		);
	}

	public static function create( WP_REST_Request $request ) {
		// Honeypot: a real browser leaves this empty because it is hidden.
		if ( ! empty( $request->get_param( 'website' ) ) ) {
			return rest_ensure_response( array( 'ok' => true ) );
		}

		$ip  = isset( $_SERVER['REMOTE_ADDR'] ) ? sanitize_text_field( wp_unslash( $_SERVER['REMOTE_ADDR'] ) ) : 'unknown';
		$key = 'smartshala_rate_' . md5( $ip );

		$hits = (int) get_transient( $key );
		if ( $hits >= self::RATE_MAX ) {
			return new WP_Error(
				'smartshala_rate_limited',
				__( 'Too many requests. Please try again in a few minutes.', 'smartshala' ),
				array( 'status' => 429 )
			);
		}
		set_transient( $key, $hits + 1, self::RATE_WINDOW );

		$data = array();
		foreach ( self::fields() as $field => $sanitizer ) {
			$data[ $field ] = call_user_func( $sanitizer, (string) $request->get_param( $field ) );
		}

		if ( '' === $data['name'] || '' === $data['school'] ) {
			return new WP_Error( 'smartshala_missing', __( 'Please provide your name and school.', 'smartshala' ), array( 'status' => 400 ) );
		}
		if ( ! is_email( $data['email'] ) ) {
			return new WP_Error( 'smartshala_email', __( 'Please provide a valid email address.', 'smartshala' ), array( 'status' => 400 ) );
		}
		if ( '' === $data['phone'] ) {
			return new WP_Error( 'smartshala_phone', __( 'Please provide a phone number.', 'smartshala' ), array( 'status' => 400 ) );
		}

		$post_id = wp_insert_post( array(
			'post_type'   => self::POST_TYPE,
			'post_status' => 'private',
			'post_title'  => sprintf( '%s — %s', $data['name'], $data['school'] ),
		), true );

		if ( is_wp_error( $post_id ) ) {
			return new WP_Error( 'smartshala_save', __( 'Could not save your request.', 'smartshala' ), array( 'status' => 500 ) );
		}

		foreach ( $data as $field => $value ) {
			update_post_meta( $post_id, '_ss_' . $field, $value );
		}
		update_post_meta( $post_id, '_ss_ip', $ip );

		$lines = array();
		foreach ( $data as $field => $value ) {
			if ( '' !== $value ) {
				$lines[] = ucfirst( $field ) . ': ' . $value;
			}
		}

		$kind = '' !== $data['source'] ? $data['source'] : 'Enquiry';

		/*
		 * Reply-To is set to the enquirer, so hitting reply in the inbox goes
		 * straight back to the school rather than to the site's own address.
		 * The From address is left alone — rewriting it to the visitor's domain
		 * would fail SPF and land the notification in spam.
		 */
		$headers = array( 'Reply-To: ' . $data['name'] . ' <' . $data['email'] . '>' );

		/*
		 * Set From only around our own send, rather than filtering globally.
		 * A global filter would rewrite every WordPress email and would fight
		 * an SMTP plugin that has its own From configured.
		 */
		$from       = function () { return SmartShala_Settings::from_address(); };
		$from_name  = function () { return SmartShala_Settings::from_name(); };

		add_filter( 'wp_mail_from', $from );
		add_filter( 'wp_mail_from_name', $from_name );

		$sent = wp_mail(
			SmartShala_Settings::recipients(),
			sprintf( '[SmartShala] %s — %s', $kind, $data['school'] ),
			implode( "\n", $lines ),
			$headers
		);

		remove_filter( 'wp_mail_from', $from );
		remove_filter( 'wp_mail_from_name', $from_name );

		/*
		 * Record whether the notification actually went out. The submission is
		 * already saved either way, but a silent mail failure means nobody
		 * finds out about an enquiry until they happen to check this screen —
		 * so it is surfaced in the Demo Requests list instead.
		 */
		update_post_meta( $post_id, '_ss_mail_sent', $sent ? '1' : '0' );

		/*
		 * Push the lead to Freshsales CRM if configured.
		 *
		 * This runs after the lead is safely saved and the email is sent, so
		 * a CRM outage never blocks or loses the submission. The sync result
		 * is recorded as post meta for the Demo Requests list.
		 */
		SmartShala_Freshsales::push( $post_id, $data );

		return rest_ensure_response( array( 'ok' => true, 'id' => $post_id ) );
	}

	public static function columns( $columns ) {
		return array(
			'cb'       => isset( $columns['cb'] ) ? $columns['cb'] : '',
			'title'    => __( 'Contact', 'smartshala' ),
			'ss_email' => __( 'Email', 'smartshala' ),
			'ss_phone' => __( 'Phone', 'smartshala' ),
			'ss_city'  => __( 'City', 'smartshala' ),
			'ss_size'  => __( 'Students', 'smartshala' ),
			'ss_src'   => __( 'From', 'smartshala' ),
			'ss_mail'  => __( 'Notified', 'smartshala' ),
			'ss_crm'   => __( 'CRM', 'smartshala' ),
			'date'     => __( 'Received', 'smartshala' ),
		);
	}

	public static function column( $column, $post_id ) {
		if ( 'ss_mail' === $column ) {
			$sent = get_post_meta( $post_id, '_ss_mail_sent', true );

			if ( '1' === $sent ) {
				echo '<span style="color:#1a7f37;">' . esc_html__( 'sent', 'smartshala' ) . '</span>';
			} elseif ( '0' === $sent ) {
				echo '<strong style="color:#b32d2e;">' . esc_html__( 'FAILED', 'smartshala' ) . '</strong>';
			} else {
				echo '<span style="color:#8c8f94;">&mdash;</span>';
			}
			return;
		}

		if ( 'ss_crm' === $column ) {
			$synced = get_post_meta( $post_id, '_ss_crm_synced', true );

			if ( '1' === $synced ) {
				$contact_id = get_post_meta( $post_id, '_ss_crm_contact_id', true );
				$label      = $contact_id ? sprintf( '#%s', $contact_id ) : esc_html__( 'synced', 'smartshala' );
				echo '<span style="color:#1a7f37;">' . esc_html( $label ) . '</span>';
			} elseif ( '0' === $synced ) {
				$error = get_post_meta( $post_id, '_ss_crm_error', true );
				echo '<strong style="color:#b32d2e;" title="' . esc_attr( $error ) . '">' . esc_html__( 'FAILED', 'smartshala' ) . '</strong>';
			} elseif ( 'not_configured' === $synced ) {
				echo '<span style="color:#8c8f94;">' . esc_html__( 'n/a', 'smartshala' ) . '</span>';
			} else {
				echo '<span style="color:#8c8f94;">&mdash;</span>';
			}
			return;
		}

		$map = array(
			'ss_email' => '_ss_email',
			'ss_phone' => '_ss_phone',
			'ss_city'  => '_ss_city',
			'ss_size'  => '_ss_students',
			'ss_src'   => '_ss_source',
		);

		if ( isset( $map[ $column ] ) ) {
			echo esc_html( (string) get_post_meta( $post_id, $map[ $column ], true ) );
		}
	}
}
