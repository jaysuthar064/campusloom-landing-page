<?php
/**
 * The admin UI.
 *
 * Renders one submenu per page and one tab per section, entirely from the
 * schema. Adding a field to schema/home.php makes it appear here with no
 * changes to this file.
 */

defined( 'ABSPATH' ) || exit;

class SmartShala_Admin {

	const CAPABILITY = 'manage_options';
	const SLUG       = 'smartshala';

	public static function boot() {
		add_action( 'admin_menu', array( __CLASS__, 'menu' ) );
		add_action( 'admin_enqueue_scripts', array( __CLASS__, 'assets' ) );
		add_action( 'admin_post_smartshala_save', array( __CLASS__, 'handle_save' ) );
	}

	public static function menu() {
		$pages = SmartShala_Schema::pages();
		if ( ! $pages ) {
			return;
		}

		add_menu_page(
			__( 'SmartShala CMS', 'smartshala' ),
			__( 'SmartShala', 'smartshala' ),
			self::CAPABILITY,
			self::SLUG,
			array( __CLASS__, 'render' ),
			'dashicons-welcome-widgets-menus',
			3
		);

		foreach ( $pages as $page ) {
			add_submenu_page(
				self::SLUG,
				sprintf( __( '%s page', 'smartshala' ), $page['label'] ),
				$page['label'],
				self::CAPABILITY,
				self::SLUG . '-' . $page['id'],
				array( __CLASS__, 'render' )
			);
		}

		// The auto-added duplicate of the parent item.
		remove_submenu_page( self::SLUG, self::SLUG );
	}

	/**
	 * Which page is being edited. Defaults to the first registered page.
	 */
	protected static function current_page_id() {
		$screen = isset( $_GET['page'] ) ? sanitize_key( wp_unslash( $_GET['page'] ) ) : '';
		$id     = str_replace( self::SLUG . '-', '', $screen );
		$pages  = SmartShala_Schema::pages();

		if ( isset( $pages[ $id ] ) ) {
			return $id;
		}
		return $pages ? array_key_first( $pages ) : '';
	}

	protected static function current_section_id( array $page ) {
		$requested = isset( $_GET['section'] ) ? sanitize_key( wp_unslash( $_GET['section'] ) ) : '';
		foreach ( $page['sections'] as $section ) {
			if ( $section['id'] === $requested ) {
				return $requested;
			}
		}
		return $page['sections'][0]['id'];
	}

	public static function assets( $hook ) {
		if ( false === strpos( $hook, self::SLUG ) ) {
			return;
		}

		wp_enqueue_media();

		wp_enqueue_style(
			'smartshala-admin',
			SMARTSHALA_URL . 'assets/admin.css',
			array(),
			SMARTSHALA_VERSION
		);

		wp_enqueue_script(
			'smartshala-admin',
			SMARTSHALA_URL . 'assets/admin.js',
			array(),
			SMARTSHALA_VERSION,
			true
		);

		wp_localize_script( 'smartshala-admin', 'smartshalaAdmin', array(
			'chooseImage' => __( 'Choose image', 'smartshala' ),
			'useImage'    => __( 'Use this image', 'smartshala' ),
			'confirmRow'  => __( 'Remove this item?', 'smartshala' ),
		) );
	}

	public static function render() {
		$page_id = self::current_page_id();
		$page    = SmartShala_Schema::page( $page_id );

		if ( ! $page ) {
			echo '<div class="wrap"><p>' . esc_html__( 'No pages registered.', 'smartshala' ) . '</p></div>';
			return;
		}

		$section_id = self::current_section_id( $page );
		$section    = SmartShala_Schema::section( $page_id, $section_id );
		$values     = SmartShala_Store::section( $page_id, $section_id );
		$base       = admin_url( 'admin.php?page=' . self::SLUG . '-' . $page_id );
		?>
		<div class="wrap smartshala-wrap">
			<h1><?php echo esc_html( sprintf( __( '%s page', 'smartshala' ), $page['label'] ) ); ?></h1>

			<?php if ( ! empty( $page['description'] ) ) : ?>
				<p class="description"><?php echo esc_html( $page['description'] ); ?></p>
			<?php endif; ?>

			<?php if ( isset( $_GET['updated'] ) ) : ?>
				<div class="notice notice-success is-dismissible">
					<p><?php esc_html_e( 'Content saved.', 'smartshala' ); ?></p>
				</div>
			<?php endif; ?>

			<div class="smartshala-layout">
				<nav class="smartshala-tabs">
					<?php foreach ( $page['sections'] as $i => $tab ) : ?>
						<a
							href="<?php echo esc_url( add_query_arg( 'section', $tab['id'], $base ) ); ?>"
							class="smartshala-tab <?php echo $tab['id'] === $section_id ? 'is-active' : ''; ?>"
						>
							<span class="smartshala-tab__num"><?php echo esc_html( str_pad( $i + 1, 2, '0', STR_PAD_LEFT ) ); ?></span>
							<span class="smartshala-tab__label"><?php echo esc_html( $tab['label'] ); ?></span>
						</a>
					<?php endforeach; ?>
				</nav>

				<div class="smartshala-panel">
					<form method="post" action="<?php echo esc_url( admin_url( 'admin-post.php' ) ); ?>">
						<input type="hidden" name="action" value="smartshala_save">
						<input type="hidden" name="page_id" value="<?php echo esc_attr( $page_id ); ?>">
						<input type="hidden" name="section_id" value="<?php echo esc_attr( $section_id ); ?>">
						<?php wp_nonce_field( 'smartshala_save_' . $page_id . '_' . $section_id ); ?>

						<header class="smartshala-panel__head">
							<h2><?php echo esc_html( $section['label'] ); ?></h2>
							<?php if ( ! empty( $section['description'] ) ) : ?>
								<p class="description"><?php echo esc_html( $section['description'] ); ?></p>
							<?php endif; ?>
						</header>

						<?php
						foreach ( $section['fields'] as $field ) {
							self::render_field( $field, $values[ $field['id'] ], 'smartshala[' . $field['id'] . ']' );
						}
						?>

						<p class="smartshala-actions">
							<button type="submit" class="button button-primary button-hero">
								<?php esc_html_e( 'Save changes', 'smartshala' ); ?>
							</button>
						</p>
					</form>
				</div>
			</div>
		</div>
		<?php
	}

	/**
	 * Render one field. Recurses for group and repeater.
	 *
	 * @param mixed  $value
	 * @param string $name  Form input name, already bracketed.
	 */
	protected static function render_field( array $field, $value, $name ) {
		$type = $field['type'];
		$id   = 'f-' . md5( $name );

		if ( 'group' === $type ) {
			echo '<fieldset class="smartshala-group">';
			echo '<legend>' . esc_html( $field['label'] ) . '</legend>';
			if ( ! empty( $field['help'] ) ) {
				echo '<p class="description">' . esc_html( $field['help'] ) . '</p>';
			}
			foreach ( $field['fields'] as $child ) {
				self::render_field(
					$child,
					isset( $value[ $child['id'] ] ) ? $value[ $child['id'] ] : SmartShala_Schema::field_default( $child ),
					$name . '[' . $child['id'] . ']'
				);
			}
			echo '</fieldset>';
			return;
		}

		if ( 'repeater' === $type ) {
			self::render_repeater( $field, is_array( $value ) ? $value : array(), $name );
			return;
		}

		echo '<div class="smartshala-field smartshala-field--' . esc_attr( $type ) . '">';
		echo '<label class="smartshala-label" for="' . esc_attr( $id ) . '">' . esc_html( $field['label'] ) . '</label>';

		switch ( $type ) {

			case 'textarea':
				printf(
					'<textarea id="%s" name="%s" rows="3" class="large-text">%s</textarea>',
					esc_attr( $id ),
					esc_attr( $name ),
					esc_textarea( (string) $value )
				);
				break;

			case 'toggle':
				printf(
					'<label class="smartshala-toggle"><input type="checkbox" name="%s" value="1" %s> %s</label>',
					esc_attr( $name ),
					checked( (bool) $value, true, false ),
					esc_html( isset( $field['toggle_label'] ) ? $field['toggle_label'] : __( 'Enabled', 'smartshala' ) )
				);
				break;

			case 'select':
				printf( '<select id="%s" name="%s">', esc_attr( $id ), esc_attr( $name ) );
				foreach ( $field['choices'] as $key => $label ) {
					printf(
						'<option value="%s" %s>%s</option>',
						esc_attr( $key ),
						selected( (string) $value, (string) $key, false ),
						esc_html( $label )
					);
				}
				echo '</select>';
				break;

			case 'image':
				$img_id  = is_array( $value ) && ! empty( $value['id'] ) ? (int) $value['id'] : 0;
				$img_url = is_array( $value ) && ! empty( $value['url'] ) ? $value['url'] : '';
				echo '<div class="smartshala-image" data-smartshala-image>';
				printf(
					'<input type="hidden" name="%s[id]" value="%d" data-image-id>',
					esc_attr( $name ),
					$img_id
				);
				printf(
					'<div class="smartshala-image__preview" data-image-preview>%s</div>',
					$img_url
						? '<img src="' . esc_url( $img_url ) . '" alt="">'
						: '<span class="smartshala-image__empty">' . esc_html__( 'No image selected', 'smartshala' ) . '</span>'
				);
				echo '<p class="smartshala-image__buttons">';
				echo '<button type="button" class="button" data-image-select>' . esc_html__( 'Select image', 'smartshala' ) . '</button> ';
				echo '<button type="button" class="button-link smartshala-remove" data-image-clear>' . esc_html__( 'Remove', 'smartshala' ) . '</button>';
				echo '</p></div>';
				break;

			case 'icon':
				printf(
					'<input type="text" id="%s" name="%s" value="%s" class="regular-text" placeholder="calendar">',
					esc_attr( $id ),
					esc_attr( $name ),
					esc_attr( (string) $value )
				);
				echo '<p class="description">' . esc_html__( 'Lucide icon name, lowercase with dashes — e.g. "graduation-cap". See lucide.dev/icons', 'smartshala' ) . '</p>';
				break;

			default: // text, url
				printf(
					'<input type="text" id="%s" name="%s" value="%s" class="large-text"%s>',
					esc_attr( $id ),
					esc_attr( $name ),
					esc_attr( (string) $value ),
					! empty( $field['placeholder'] ) ? ' placeholder="' . esc_attr( $field['placeholder'] ) . '"' : ''
				);
				break;
		}

		if ( ! empty( $field['help'] ) && 'icon' !== $type ) {
			echo '<p class="description">' . esc_html( $field['help'] ) . '</p>';
		}

		echo '</div>';
	}

	protected static function render_repeater( array $field, array $rows, $name ) {
		$label_key = isset( $field['row_label'] ) ? $field['row_label'] : null;

		echo '<div class="smartshala-repeater" data-smartshala-repeater data-name="' . esc_attr( $name ) . '">';
		echo '<div class="smartshala-repeater__head">';
		echo '<h3>' . esc_html( $field['label'] ) . '</h3>';
		if ( ! empty( $field['help'] ) ) {
			echo '<p class="description">' . esc_html( $field['help'] ) . '</p>';
		}
		echo '</div>';

		echo '<div class="smartshala-repeater__rows" data-repeater-rows>';
		foreach ( $rows as $i => $row ) {
			self::render_repeater_row( $field, $row, $name, $i, $label_key );
		}
		echo '</div>';

		/*
		 * Template the JS clones for new rows; __INDEX__ is swapped on add.
		 *
		 * This must be a <template>, not a <script type="text/html">. Script
		 * content is raw text, so escaping it left the JS holding literal
		 * "&lt;div..." which produced no element and made "Add" do nothing.
		 * <template> is inert but properly parsed, so innerHTML round-trips.
		 */
		echo '<template data-repeater-template>';
		self::render_repeater_row(
			$field,
			SmartShala_Schema::field_default( array( 'type' => 'group', 'fields' => $field['fields'] ) ),
			$name,
			'__INDEX__',
			$label_key
		);
		echo '</template>';

		printf(
			'<p><button type="button" class="button" data-repeater-add>+ %s</button></p>',
			esc_html( isset( $field['add_label'] ) ? $field['add_label'] : __( 'Add item', 'smartshala' ) )
		);
		echo '</div>';
	}

	protected static function render_repeater_row( array $field, $row, $name, $index, $label_key ) {
		$row   = is_array( $row ) ? $row : array();
		$title = $label_key && ! empty( $row[ $label_key ] ) ? $row[ $label_key ] : __( 'Item', 'smartshala' );

		echo '<div class="smartshala-row" data-repeater-row>';
		echo '<div class="smartshala-row__bar">';
		echo '<span class="smartshala-row__handle dashicons dashicons-menu"></span>';
		echo '<strong class="smartshala-row__title">' . esc_html( $title ) . '</strong>';
		echo '<button type="button" class="button-link smartshala-remove" data-repeater-remove>' . esc_html__( 'Remove', 'smartshala' ) . '</button>';
		echo '</div>';
		echo '<div class="smartshala-row__body">';

		foreach ( $field['fields'] as $child ) {
			self::render_field(
				$child,
				array_key_exists( $child['id'], $row ) ? $row[ $child['id'] ] : SmartShala_Schema::field_default( $child ),
				$name . '[' . $index . '][' . $child['id'] . ']'
			);
		}

		echo '</div></div>';
	}

	public static function handle_save() {
		if ( ! current_user_can( self::CAPABILITY ) ) {
			wp_die( esc_html__( 'You are not allowed to edit this content.', 'smartshala' ) );
		}

		$page_id    = isset( $_POST['page_id'] ) ? sanitize_key( wp_unslash( $_POST['page_id'] ) ) : '';
		$section_id = isset( $_POST['section_id'] ) ? sanitize_key( wp_unslash( $_POST['section_id'] ) ) : '';

		check_admin_referer( 'smartshala_save_' . $page_id . '_' . $section_id );

		if ( ! SmartShala_Schema::section( $page_id, $section_id ) ) {
			wp_die( esc_html__( 'Unknown section.', 'smartshala' ) );
		}

		// Raw by design: every value is sanitised against the schema in the
		// store, which also discards anything the schema does not describe.
		$input = isset( $_POST['smartshala'] ) ? wp_unslash( $_POST['smartshala'] ) : array();
		SmartShala_Store::save_section( $page_id, $section_id, is_array( $input ) ? $input : array() );

		wp_safe_redirect( add_query_arg(
			array(
				'page'    => self::SLUG . '-' . $page_id,
				'section' => $section_id,
				'updated' => 1,
			),
			admin_url( 'admin.php' )
		) );
		exit;
	}
}
