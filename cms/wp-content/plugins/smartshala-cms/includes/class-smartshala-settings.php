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

	public static function boot() {
		add_action( 'admin_menu', array( __CLASS__, 'menu' ), 20 );
		add_action( 'admin_post_smartshala_save_settings', array( __CLASS__, 'handle_save' ) );
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
}
