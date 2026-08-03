<?php
/**
 * About page schema.
 *
 * Positioned on operational credibility rather than technology claims — the
 * thing that actually wins school ERP deals is convincing a principal you
 * understand admission season and fee-collection week.
 *
 * Numbers here are placeholders; confirm before launch.
 */

defined( 'ABSPATH' ) || exit;

return array(
	'id'          => 'about',
	'label'       => __( 'About page', 'smartshala' ),
	'description' => __( 'Content for /about.', 'smartshala' ),
	'sections'    => array(

		array(
			'id'     => 'hero',
			'label'  => __( 'Page header', 'smartshala' ),
			'fields' => array(
				array( 'id' => 'eyebrow', 'type' => 'text', 'label' => __( 'Eyebrow', 'smartshala' ), 'default' => 'ABOUT SMARTSHALA' ),
				array( 'id' => 'heading', 'type' => 'text', 'label' => __( 'Heading', 'smartshala' ), 'default' => 'We Build Software for' ),
				array( 'id' => 'heading_highlight', 'type' => 'text', 'label' => __( 'Heading — blue', 'smartshala' ), 'default' => 'People Who Run Schools.' ),
				array(
					'id'      => 'subheading',
					'type'    => 'textarea',
					'label'   => __( 'Sub-heading', 'smartshala' ),
					'default' => 'Not a generic ERP with a school skin on top. SmartShala is built around how Indian schools actually work — admission season, fee cycles, board formats and the parent phone call at 8am.',
				),
			),
		),

		array(
			'id'     => 'story',
			'label'  => __( 'Story', 'smartshala' ),
			'fields' => array(
				array( 'id' => 'heading', 'type' => 'text', 'label' => __( 'Heading', 'smartshala' ), 'default' => 'Why we started' ),
				array(
					'id'      => 'body',
					'type'    => 'textarea',
					'label'   => __( 'Body', 'smartshala' ),
					'help'    => __( 'Blank line between paragraphs.', 'smartshala' ),
					'default' => "Most schools we met were running on three registers, five spreadsheets and a dozen WhatsApp groups. Attendance lived in one place, fees in another, and nobody could answer a simple question — how many students in Class 8 still owe second-instalment fees — without an afternoon of manual work.\n\nThe software that existed was either built for universities and bent awkwardly to fit a school, or sold cheaply and abandoned after installation. Schools were paying separately for modules, for the parent app, for hosting, for every support call.\n\nSo we built one platform where every department shares the same student record, priced it as a single annual subscription with nothing held back, and committed to onboarding every school properly rather than shipping a login and walking away.",
				),
			),
		),

		array(
			'id'     => 'stats',
			'label'  => __( 'Numbers', 'smartshala' ),
			'fields' => array(
				array(
					'id'        => 'items',
					'type'      => 'repeater',
					'label'     => __( 'Stats', 'smartshala' ),
					'row_label' => 'value',
					'add_label' => __( 'Add stat', 'smartshala' ),
					'fields'    => array(
						array( 'id' => 'value', 'type' => 'text', 'label' => __( 'Value', 'smartshala' ) ),
						array( 'id' => 'label', 'type' => 'text', 'label' => __( 'Label', 'smartshala' ) ),
					),
					'default'   => array(
						array( 'value' => '100+', 'label' => 'Schools running on SmartShala' ),
						array( 'value' => '5,000+', 'label' => 'Students managed daily' ),
						array( 'value' => '15+', 'label' => 'Cities across India' ),
						array( 'value' => '99.9%', 'label' => 'Platform uptime' ),
					),
				),
			),
		),

		array(
			'id'     => 'values',
			'label'  => __( 'What we stand for', 'smartshala' ),
			'fields' => array(
				array( 'id' => 'heading', 'type' => 'text', 'label' => __( 'Heading', 'smartshala' ), 'default' => 'What we stand for' ),
				array( 'id' => 'subheading', 'type' => 'text', 'label' => __( 'Sub-heading', 'smartshala' ), 'default' => 'The commitments we hold ourselves to, in writing.' ),
				array(
					'id'        => 'items',
					'type'      => 'repeater',
					'label'     => __( 'Values', 'smartshala' ),
					'row_label' => 'title',
					'add_label' => __( 'Add value', 'smartshala' ),
					'fields'    => array(
						array( 'id' => 'icon', 'type' => 'icon', 'label' => __( 'Icon', 'smartshala' ) ),
						array( 'id' => 'title', 'type' => 'text', 'label' => __( 'Title', 'smartshala' ) ),
						array( 'id' => 'description', 'type' => 'textarea', 'label' => __( 'Description', 'smartshala' ) ),
					),
					'default'   => array(
						array( 'icon' => 'receipt-indian-rupee', 'title' => 'Honest pricing', 'description' => 'One subscription, every module. We do not hold features back to sell them to you later.' ),
						array( 'icon' => 'lock', 'title' => 'Your data is yours', 'description' => 'Export it whenever you want. If you ever leave us, we help you take it with you.' ),
						array( 'icon' => 'handshake', 'title' => 'Onboarding that finishes', 'description' => 'We are not done when you get a login. We are done when your staff are using it without us.' ),
						array( 'icon' => 'ear', 'title' => 'We listen to schools', 'description' => 'Most of our roadmap comes from principals and office staff telling us what slows them down.' ),
					),
				),
			),
		),

		array(
			'id'     => 'cta',
			'label'  => __( 'Closing CTA', 'smartshala' ),
			'fields' => array(
				array( 'id' => 'heading', 'type' => 'text', 'label' => __( 'Heading', 'smartshala' ), 'default' => 'Come and see whether we are any good.' ),
				array( 'id' => 'subheading', 'type' => 'textarea', 'label' => __( 'Sub-heading', 'smartshala' ), 'default' => 'Thirty minutes, your own data, no obligation. Judge us on the product rather than the pitch.' ),
				array( 'id' => 'primary_label', 'type' => 'text', 'label' => __( 'Primary button', 'smartshala' ), 'default' => 'Book Free Demo' ),
				array( 'id' => 'primary_url', 'type' => 'url', 'label' => __( 'Primary link', 'smartshala' ), 'default' => '/book-demo' ),
				array( 'id' => 'secondary_label', 'type' => 'text', 'label' => __( 'Secondary button', 'smartshala' ), 'default' => 'Contact Us' ),
				array( 'id' => 'secondary_url', 'type' => 'url', 'label' => __( 'Secondary link', 'smartshala' ), 'default' => '/contact' ),
			),
		),
	),
);
