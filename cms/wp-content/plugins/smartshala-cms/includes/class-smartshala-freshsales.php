<?php
/**
 * Freshsales CRM integration.
 *
 * Pushes every new lead submission to Freshsales as a contact, so the sales
 * team can track and follow up from their CRM without checking WordPress.
 *
 * The push is fire-and-forget: if Freshsales is unreachable or rejects the
 * payload, the lead is still safely stored in WordPress. The sync result is
 * recorded as post meta so the Demo Requests list shows whether each lead
 * made it to the CRM.
 *
 * Credentials are stored as WordPress options and editable from
 * SmartShala → Settings in wp-admin.
 */

defined( 'ABSPATH' ) || exit;

class SmartShala_Freshsales {

	const OPTION_API_KEY = 'smartshala_freshsales_api_key';
	const OPTION_DOMAIN  = 'smartshala_freshsales_domain';

	/**
	 * Whether the integration is configured and ready to use.
	 */
	public static function is_configured() {
		return '' !== self::api_key() && '' !== self::domain();
	}

	public static function api_key() {
		return trim( (string) get_option( self::OPTION_API_KEY, '' ) );
	}

	public static function domain() {
		return trim( (string) get_option( self::OPTION_DOMAIN, '' ) );
	}

	/**
	 * Build the Freshworks CRM API base URL.
	 *
	 * Supports both the older standalone Freshsales (domain.freshsales.io)
	 * and the newer Freshworks CRM (domain.myfreshworks.com/crm/sales).
	 *
	 * @return string e.g. https://hybridmonksllp.myfreshworks.com/crm/sales/api
	 */
	private static function api_url() {
		$domain = self::domain();

		// If the domain contains a dot, assume it's a full subdomain like
		// "hybridmonksllp.myfreshworks.com" — use it as-is with /crm/sales/api.
		if ( str_contains( $domain, '.' ) ) {
			$scheme = 'https://';
			$host   = preg_replace( '#^https?://#i', '', $domain );
			return $scheme . $host . '/crm/sales/api';
		}

		// Legacy standalone Freshsales format.
		return sprintf( 'https://%s.freshsales.io/api', $domain );
	}

	/**
	 * Push a lead to Freshsales after it has been saved in WordPress.
	 *
	 * Called from SmartShala_Leads::create() with the WP post ID and the
	 * already-sanitised field data.
	 *
	 * @param int   $post_id  The smartshala_lead post ID.
	 * @param array $data     Sanitised lead fields (name, school, email, etc.).
	 */
	public static function push( $post_id, $data ) {
		if ( ! self::is_configured() ) {
			update_post_meta( $post_id, '_ss_crm_synced', 'not_configured' );
			return;
		}

		// Split full name into first + last for Freshsales.
		$name_parts = self::split_name( $data['name'] ?? '' );

		$contact = array(
			'first_name'    => $name_parts['first'],
			'last_name'     => $name_parts['last'],
			'email'         => $data['email'] ?? '',
			'mobile_number' => $data['phone'] ?? '',
			'job_title'     => $data['role'] ?? '',
			'city'          => $data['city'] ?? '',
			'lead_source'   => $data['source'] ?? 'Website',
		);

		// Attach company (school/organisation) name.
		$school = $data['school'] ?? '';
		if ( '' !== $school ) {
			$contact['company'] = array( 'name' => $school );
		}

		// Custom fields — students count. The client must create a custom
		// field named "students" in Freshsales → Admin Settings → Contacts
		// → Custom Fields. The key format is cf_students.
		$students = $data['students'] ?? '';
		if ( '' !== $students ) {
			$contact['custom_field'] = array( 'cf_students' => $students );
		}

		$response = wp_remote_post(
			self::api_url() . '/contacts',
			array(
				'timeout' => 15,
				'headers' => array(
					'Authorization' => 'Token token=' . self::api_key(),
					'Content-Type'  => 'application/json',
					'Accept'        => 'application/json',
				),
				'body'    => wp_json_encode( array( 'contact' => $contact ) ),
			)
		);

		if ( is_wp_error( $response ) ) {
			update_post_meta( $post_id, '_ss_crm_synced', '0' );
			update_post_meta( $post_id, '_ss_crm_error', $response->get_error_message() );
			return;
		}

		$code = wp_remote_retrieve_response_code( $response );
		$body = json_decode( wp_remote_retrieve_body( $response ), true );

		if ( $code >= 200 && $code < 300 ) {
			update_post_meta( $post_id, '_ss_crm_synced', '1' );

			// Store the Freshsales contact ID for reference.
			if ( ! empty( $body['contact']['id'] ) ) {
				update_post_meta( $post_id, '_ss_crm_contact_id', (string) $body['contact']['id'] );
			}

			// If there's a message/note, add it as a note on the contact.
			$message = $data['message'] ?? '';
			if ( '' !== $message && ! empty( $body['contact']['id'] ) ) {
				self::add_note( $body['contact']['id'], $message, $data );
			}
		} else {
			update_post_meta( $post_id, '_ss_crm_synced', '0' );
			$error_msg = '';
			if ( ! empty( $body['errors']['message'] ) ) {
				$error_msg = is_array( $body['errors']['message'] )
					? implode( '; ', $body['errors']['message'] )
					: (string) $body['errors']['message'];
			} elseif ( ! empty( $body['message'] ) ) {
				$error_msg = (string) $body['message'];
			} else {
				$error_msg = sprintf( 'HTTP %d', $code );
			}
			update_post_meta( $post_id, '_ss_crm_error', $error_msg );
		}
	}

	/**
	 * Add a note to a Freshsales contact.
	 *
	 * @param int|string $contact_id Freshsales contact ID.
	 * @param string     $message    The note body.
	 * @param array      $data       Original lead data for context.
	 */
	private static function add_note( $contact_id, $message, $data ) {
		$source  = $data['source'] ?? 'Website';
		$subject = $data['subject'] ?? '';

		$description = '';
		if ( '' !== $subject ) {
			$description .= "Subject: {$subject}\n\n";
		}
		$description .= $message;

		wp_remote_post(
			self::api_url() . '/notes',
			array(
				'timeout' => 10,
				'headers' => array(
					'Authorization' => 'Token token=' . self::api_key(),
					'Content-Type'  => 'application/json',
					'Accept'        => 'application/json',
				),
				'body'    => wp_json_encode( array(
					'note' => array(
						'description'   => $description,
						'targetable_id' => (int) $contact_id,
						'targetable_type' => 'Contact',
					),
				) ),
			)
		);
	}

	/**
	 * Split a full name into first and last.
	 *
	 * @param string $name Full name.
	 * @return array { first: string, last: string }
	 */
	private static function split_name( $name ) {
		$name  = trim( $name );
		$parts = preg_split( '/\s+/', $name, 2 );

		return array(
			'first' => $parts[0] ?? '',
			'last'  => $parts[1] ?? '',
		);
	}
}
