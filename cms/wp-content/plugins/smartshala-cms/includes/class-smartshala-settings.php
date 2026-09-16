<?php
/**
 * Settings screen.
 *
 * Currently one setting: which frontend origins may read the API.
 *
 * Left empty, WordPress core's default applies and any origin can read — which
 * is correct for public marketing content and means a new deployment works
 * without anyone touching this. Fill it in to lock the API to known origins.
 */

defined( 'ABSPATH' ) || exit;

class SmartShala_Settings {

	const CAPABILITY = 'manage_options';
	const SLUG       = 'smartshala-settings';
	const OPTION     = 'smartshala_frontend_origins';
	const RECIPIENTS = 'smartshala_lead_recipients';
	const FROM_EMAIL = 'smartshala_mail_from';
	const FROM_NAME  = 'smartshala_mail_from_name';

	/**
	 * The address notifications are sent *from*.
	 *
	 * This must be on a domain you control. Sending as the visitor's address
	 * would fail SPF and land the mail in spam — that is what Reply-To is for.
	 *
	 * WordPress's own default is wordpress@<host>, which PHPMailer rejects
	 * outright when the host has no dot in it (localhost), so the fallback here
	 * ends on the admin address rather than something undeliverable.
	 */
	public static function from_address() {
		$saved = sanitize_email( (string) get_option( self::FROM_EMAIL, '' ) );
		if ( $saved && is_email( $saved ) ) {
			return $saved;
		}

		$host = (string) wp_parse_url( home_url(), PHP_URL_HOST );
		$host = preg_replace( '~^www\.~i', '', $host );

		if ( $host && str_contains( $host, '.' ) ) {
			return 'noreply@' . $host;
		}

		return (string) get_option( 'admin_email' );
	}

	public static function from_name() {
		$saved = trim( (string) get_option( self::FROM_NAME, '' ) );
		return '' !== $saved ? $saved : (string) get_bloginfo( 'name' );
	}

	/**
	 * Is anything actually taking charge of delivery?
	 *
	 * SMTP plugins all work by hooking one of these. If none is present,
	 * WordPress falls back to the server's mail function and deliverability is
	 * whatever the host happens to give you.
	 */
	public static function has_smtp() {
		foreach ( array( 'phpmailer_init', 'pre_wp_mail' ) as $hook ) {
			if ( has_filter( $hook ) ) {
				return true;
			}
		}
		return false;
	}

	/**
	 * Where demo and contact submissions are emailed.
	 *
	 * Falls back to the WordPress admin email so notifications are never
	 * silently lost just because nobody filled this in.
	 *
	 * @return string[]
	 */
	public static function recipients() {
		$saved = array();

		foreach ( preg_split( '/[\r\n,]+/', (string) get_option( self::RECIPIENTS, '' ) ) as $email ) {
			$email = sanitize_email( trim( $email ) );
			if ( $email && is_email( $email ) ) {
				$saved[] = $email;
			}
		}

		if ( $saved ) {
			return array_values( array_unique( $saved ) );
		}

		return array( get_option( 'admin_email' ) );
	}

	public static function boot() {
		add_action( 'admin_menu', array( __CLASS__, 'menu' ), 20 );
		add_action( 'admin_post_smartshala_save_settings', array( __CLASS__, 'handle_save' ) );
		add_action( 'admin_post_smartshala_save_emails', array( __CLASS__, 'handle_save_emails' ) );
		add_action( 'admin_post_smartshala_save_freshsales', array( __CLASS__, 'handle_save_freshsales' ) );
	}

	public static function menu() {
		add_submenu_page(
			SmartShala_Admin::SLUG,
			__( 'Settings', 'smartshala' ),
			__( 'Settings', 'smartshala' ),
			self::CAPABILITY,
			self::SLUG,
			array( __CLASS__, 'render' )
		);
	}

	/**
	 * Normalise a list of origins to one scheme://host[:port] per line.
	 * Anything that is not a usable origin is dropped.
	 *
	 * @return string[]
	 */
	public static function parse( $raw ) {
		$out = array();

		foreach ( preg_split( '/[\r\n,]+/', (string) $raw ) as $line ) {
			$line = trim( $line );
			if ( '' === $line ) {
				continue;
			}

			// Tolerate someone pasting a bare domain.
			if ( ! preg_match( '~^https?://~i', $line ) ) {
				$line = 'https://' . $line;
			}

			$parts = wp_parse_url( $line );
			if ( empty( $parts['host'] ) ) {
				continue;
			}

			// parse_url() is lenient — it will happily hand back "not a url" as
			// a host. Only accept something that could actually be one.
			$host = strtolower( $parts['host'] );
			if ( ! preg_match( '~^[a-z0-9]([a-z0-9.-]*[a-z0-9])?$~', $host ) ) {
				continue;
			}

			$origin = strtolower( $parts['scheme'] ?? 'https' ) . '://' . $host;
			if ( ! empty( $parts['port'] ) ) {
				$origin .= ':' . (int) $parts['port'];
			}

			$out[] = $origin;
		}

		return array_values( array_unique( $out ) );
	}

	public static function render() {
		$saved   = self::parse( get_option( self::OPTION, '' ) );
		$is_open = empty( $saved );
		?>
		<div class="wrap smartshala-wrap">
			<h1><?php esc_html_e( 'SmartShala settings', 'smartshala' ); ?></h1>

			<?php if ( isset( $_GET['updated'] ) ) : ?>
				<div class="notice notice-success is-dismissible">
					<p><?php esc_html_e( 'Settings saved.', 'smartshala' ); ?></p>
				</div>
			<?php endif; ?>

			<div class="smartshala-panel" style="margin-top:20px;max-width:820px;">
				<form method="post" action="<?php echo esc_url( admin_url( 'admin-post.php' ) ); ?>">
					<input type="hidden" name="action" value="smartshala_save_settings">
					<?php wp_nonce_field( 'smartshala_save_settings' ); ?>

					<header class="smartshala-panel__head">
						<h2><?php esc_html_e( 'Allowed frontend origins', 'smartshala' ); ?></h2>
						<p class="description">
							<?php esc_html_e( 'Which websites may read this API from a browser. Add the address your frontend is served from — one per line.', 'smartshala' ); ?>
						</p>
					</header>

					<div class="smartshala-field">
						<label class="smartshala-label" for="smartshala-origins">
							<?php esc_html_e( 'Origins', 'smartshala' ); ?>
						</label>

						<textarea
							id="smartshala-origins"
							name="frontend_origins"
							rows="6"
							class="large-text code"
							spellcheck="false"
							placeholder="https://your-site.vercel.app&#10;https://letssmartshala.com&#10;http://localhost:5173"
						><?php echo esc_textarea( implode( "\n", $saved ) ); ?></textarea>

						<p class="description">
							<?php esc_html_e( 'Scheme and domain only — no paths. A bare domain is fine, https:// is assumed. Include the port for local development.', 'smartshala' ); ?>
						</p>
					</div>

					<div class="smartshala-field">
						<p style="margin:0;padding:12px 14px;border-radius:8px;background:<?php echo $is_open ? '#fff8e5' : '#edfaef'; ?>;border:1px solid <?php echo $is_open ? '#f0d68a' : '#a7dbb1'; ?>;">
							<?php if ( $is_open ) : ?>
								<strong><?php esc_html_e( 'Currently open to any website.', 'smartshala' ); ?></strong><br>
								<?php esc_html_e( 'This is the WordPress default and is fine for public content — a new deployment will work without changes. Add origins above only if you want to restrict it.', 'smartshala' ); ?>
							<?php else : ?>
								<strong><?php esc_html_e( 'Currently restricted.', 'smartshala' ); ?></strong><br>
								<?php
								printf(
									/* translators: %d: number of allowed origins */
									esc_html( _n( 'Only the %d origin listed above can read this API from a browser. Anything else is blocked. Remember to add your preview and local URLs too, or they will stop working.', 'Only the %d origins listed above can read this API from a browser. Anything else is blocked. Remember to add your preview and local URLs too, or they will stop working.', count( $saved ), 'smartshala' ) ),
									count( $saved )
								);
								?>
							<?php endif; ?>
						</p>
					</div>

					<p class="smartshala-actions">
						<button type="submit" class="button button-primary button-hero">
							<?php esc_html_e( 'Save settings', 'smartshala' ); ?>
						</button>
					</p>
				</form>
			</div>

			<div class="smartshala-panel" style="margin-top:18px;max-width:820px;">
				<form method="post" action="<?php echo esc_url( admin_url( 'admin-post.php' ) ); ?>">
					<input type="hidden" name="action" value="smartshala_save_emails">
					<?php wp_nonce_field( 'smartshala_save_emails' ); ?>

					<header class="smartshala-panel__head">
						<h2><?php esc_html_e( 'Form notifications', 'smartshala' ); ?></h2>
						<p class="description">
							<?php esc_html_e( 'Where demo requests and contact messages are emailed. Every submission is also saved under Demo Requests, so nothing is lost if email fails.', 'smartshala' ); ?>
						</p>
					</header>

					<div class="smartshala-field">
						<label class="smartshala-label" for="smartshala-recipients">
							<?php esc_html_e( 'Send submissions to', 'smartshala' ); ?>
						</label>

						<textarea
							id="smartshala-recipients"
							name="lead_recipients"
							rows="3"
							class="large-text code"
							spellcheck="false"
							placeholder="sales@letssmartshala.com&#10;principal@letssmartshala.com"
						><?php echo esc_textarea( (string) get_option( self::RECIPIENTS, '' ) ); ?></textarea>

						<p class="description">
							<?php
							printf(
								/* translators: %s: email address currently receiving notifications */
								esc_html__( 'One address per line. Leave empty to use the site admin address (%s).', 'smartshala' ),
								esc_html( get_option( 'admin_email' ) )
							);
							?>
						</p>
					</div>

					<div class="smartshala-field">
						<label class="smartshala-label" for="smartshala-from-name">
							<?php esc_html_e( 'Send from — name', 'smartshala' ); ?>
						</label>
						<input
							type="text"
							id="smartshala-from-name"
							name="mail_from_name"
							class="large-text"
							value="<?php echo esc_attr( (string) get_option( self::FROM_NAME, '' ) ); ?>"
							placeholder="<?php echo esc_attr( get_bloginfo( 'name' ) ); ?>"
						>
					</div>

					<div class="smartshala-field">
						<label class="smartshala-label" for="smartshala-from-email">
							<?php esc_html_e( 'Send from — address', 'smartshala' ); ?>
						</label>
						<input
							type="email"
							id="smartshala-from-email"
							name="mail_from"
							class="large-text code"
							value="<?php echo esc_attr( (string) get_option( self::FROM_EMAIL, '' ) ); ?>"
							placeholder="noreply@letssmartshala.com"
						>
						<p class="description">
							<?php esc_html_e( 'Must be on a domain you control, or the mail will be treated as spoofed and land in spam. Replies still go to the enquirer — every notification carries their address as Reply-To.', 'smartshala' ); ?>
						</p>
					</div>

					<div class="smartshala-field">
						<p style="margin:0;padding:12px 14px;border-radius:8px;background:#f0f4ff;border:1px solid #c3d3fb;">
							<strong><?php esc_html_e( 'Currently sending to:', 'smartshala' ); ?></strong>
							<?php echo esc_html( implode( ', ', self::recipients() ) ); ?><br>
							<strong><?php esc_html_e( 'From:', 'smartshala' ); ?></strong>
							<?php echo esc_html( sprintf( '%s <%s>', self::from_name(), self::from_address() ) ); ?>
						</p>
					</div>

					<?php if ( ! self::has_smtp() ) : ?>
						<div class="smartshala-field">
							<p style="margin:0;padding:12px 14px;border-radius:8px;background:#fff8e5;border:1px solid #f0d68a;">
								<strong><?php esc_html_e( 'No SMTP plugin detected.', 'smartshala' ); ?></strong><br>
								<?php esc_html_e( 'WordPress will hand these to the server\'s own mail function, which usually has no SPF or DKIM for your domain — messages get spam-foldered or dropped, silently. Install an SMTP plugin such as FluentSMTP and point it at the service that runs your email.', 'smartshala' ); ?>
							</p>
						</div>
					<?php endif; ?>

					<p class="smartshala-actions">
						<button type="submit" class="button button-primary button-hero">
							<?php esc_html_e( 'Save notification emails', 'smartshala' ); ?>
						</button>
					</p>
				</form>
			</div>

			<div class="smartshala-panel" style="margin-top:18px;max-width:820px;">
				<header class="smartshala-panel__head">
					<h2><?php esc_html_e( 'API address', 'smartshala' ); ?></h2>
					<p class="description">
						<?php esc_html_e( 'Set this as VITE_WP_API_URL in your frontend hosting.', 'smartshala' ); ?>
					</p>
				</header>
				<p>
					<input
						type="text"
						class="large-text code"
						readonly
						onfocus="this.select()"
						value="<?php echo esc_attr( untrailingslashit( home_url() ) ); ?>"
					>
				</p>
				<p class="description">
					<?php
					printf(
						/* translators: %s: REST endpoint URL */
						esc_html__( 'Content is served from %s', 'smartshala' ),
						esc_html( rest_url( 'smartshala/v1/pages' ) )
					);
					?>
				</p>
			</div>

			<div class="smartshala-panel" style="margin-top:18px;max-width:820px;">
				<form method="post" action="<?php echo esc_url( admin_url( 'admin-post.php' ) ); ?>">
					<input type="hidden" name="action" value="smartshala_save_freshsales">
					<?php wp_nonce_field( 'smartshala_save_freshsales' ); ?>

					<header class="smartshala-panel__head">
						<h2><?php esc_html_e( 'Freshsales CRM', 'smartshala' ); ?></h2>
						<p class="description">
							<?php esc_html_e( 'Connect lead submissions to Freshsales so every enquiry appears in your CRM automatically. Leads are always saved in WordPress first — if Freshsales is unreachable, nothing is lost.', 'smartshala' ); ?>
						</p>
					</header>

					<div class="smartshala-field">
						<label class="smartshala-label" for="smartshala-fs-domain">
							<?php esc_html_e( 'Freshworks domain', 'smartshala' ); ?>
						</label>
						<input
							type="text"
							id="smartshala-fs-domain"
							name="freshsales_domain"
							class="large-text code"
							value="<?php echo esc_attr( SmartShala_Freshsales::domain() ); ?>"
							placeholder="hybridmonksllp or hybridmonksllp.myfreshworks.com"
							autocomplete="off"
						>
						<p class="description">
							<?php esc_html_e( 'The subdomain from your CRM URL, or paste the full URL. For https://hybridmonksllp.myfreshworks.com/crm/sales, enter only "hybridmonksllp" or "hybridmonksllp.myfreshworks.com".', 'smartshala' ); ?>
						</p>
					</div>

					<div class="smartshala-field">
						<label class="smartshala-label" for="smartshala-fs-key">
							<?php esc_html_e( 'API key', 'smartshala' ); ?>
						</label>
						<input
							type="password"
							id="smartshala-fs-key"
							name="freshsales_api_key"
							class="large-text code"
							value="<?php echo esc_attr( SmartShala_Freshsales::api_key() ); ?>"
							placeholder="<?php esc_attr_e( 'Paste your Freshsales API key here', 'smartshala' ); ?>"
							autocomplete="off"
						>
						<p class="description">
							<?php esc_html_e( 'Find this in Freshsales → Settings → API Settings → Your API Key.', 'smartshala' ); ?>
						</p>
					</div>

					<div class="smartshala-field">
						<?php if ( SmartShala_Freshsales::is_configured() ) : ?>
							<p style="margin:0;padding:12px 14px;border-radius:8px;background:#edfaef;border:1px solid #a7dbb1;">
								<strong><?php esc_html_e( 'Connected.', 'smartshala' ); ?></strong><br>
								<?php
								printf(
									/* translators: %s: Freshsales domain */
									esc_html__( 'New leads will be pushed to %s.freshsales.io as contacts.', 'smartshala' ),
									esc_html( SmartShala_Freshsales::domain() )
								);
								?>
							</p>
						<?php else : ?>
							<p style="margin:0;padding:12px 14px;border-radius:8px;background:#fff8e5;border:1px solid #f0d68a;">
								<strong><?php esc_html_e( 'Not connected.', 'smartshala' ); ?></strong><br>
								<?php esc_html_e( 'Enter your Freshsales domain and API key above to start syncing leads to your CRM.', 'smartshala' ); ?>
							</p>
						<?php endif; ?>
					</div>

					<p class="smartshala-actions">
						<button type="submit" class="button button-primary button-hero">
							<?php esc_html_e( 'Save Freshsales settings', 'smartshala' ); ?>
						</button>
					</p>
				</form>
			</div>
		</div>
		<?php
	}

	public static function handle_save() {
		if ( ! current_user_can( self::CAPABILITY ) ) {
			wp_die( esc_html__( 'You are not allowed to change these settings.', 'smartshala' ) );
		}

		check_admin_referer( 'smartshala_save_settings' );

		$raw    = isset( $_POST['frontend_origins'] ) ? wp_unslash( $_POST['frontend_origins'] ) : '';
		$origins = self::parse( $raw );

		update_option( self::OPTION, implode( "\n", $origins ), false );

		wp_safe_redirect( add_query_arg(
			array(
				'page'    => self::SLUG,
				'updated' => 1,
			),
			admin_url( 'admin.php' )
		) );
		exit;
	}

	public static function handle_save_emails() {
		if ( ! current_user_can( self::CAPABILITY ) ) {
			wp_die( esc_html__( 'You are not allowed to change these settings.', 'smartshala' ) );
		}

		check_admin_referer( 'smartshala_save_emails' );

		$raw   = isset( $_POST['lead_recipients'] ) ? wp_unslash( $_POST['lead_recipients'] ) : '';
		$clean = array();

		foreach ( preg_split( '/[\r\n,]+/', (string) $raw ) as $email ) {
			$email = sanitize_email( trim( $email ) );
			if ( $email && is_email( $email ) ) {
				$clean[] = $email;
			}
		}

		update_option( self::RECIPIENTS, implode( "\n", array_unique( $clean ) ), false );

		$from = sanitize_email( wp_unslash( $_POST['mail_from'] ?? '' ) );
		update_option( self::FROM_EMAIL, is_email( $from ) ? $from : '', false );

		$from_name = sanitize_text_field( wp_unslash( $_POST['mail_from_name'] ?? '' ) );
		update_option( self::FROM_NAME, $from_name, false );

		wp_safe_redirect( add_query_arg(
			array(
				'page'    => self::SLUG,
				'updated' => 1,
			),
			admin_url( 'admin.php' )
		) );
		exit;
	}

	public static function handle_save_freshsales() {
		if ( ! current_user_can( self::CAPABILITY ) ) {
			wp_die( esc_html__( 'You are not allowed to change these settings.', 'smartshala' ) );
		}

		check_admin_referer( 'smartshala_save_freshsales' );

		$domain = sanitize_text_field( wp_unslash( $_POST['freshsales_domain'] ?? '' ) );
		// Strip any accidental full URL pasting.
		$domain = preg_replace( '~^https?://~i', '', $domain );
		$domain = trim( $domain, ' /' );
		// Accept either a bare subdomain or a full *.myfreshworks.com / *.freshsales.io host.
		$domain = preg_replace( '~\.myfreshworks\.com/.*$~i', '.myfreshworks.com', $domain );
		$domain = preg_replace( '~\.freshsales\.io/.*$~i', '.freshsales.io', $domain );
		$domain = trim( $domain, ' /' );

		update_option( SmartShala_Freshsales::OPTION_DOMAIN, $domain, false );

		$api_key = sanitize_text_field( wp_unslash( $_POST['freshsales_api_key'] ?? '' ) );
		update_option( SmartShala_Freshsales::OPTION_API_KEY, $api_key, false );

		wp_safe_redirect( add_query_arg(
			array(
				'page'    => self::SLUG,
				'updated' => 1,
			),
			admin_url( 'admin.php' )
		) );
		exit;
	}
}
