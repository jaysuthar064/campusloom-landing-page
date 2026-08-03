<?php
/**
 * Pricing page schema.
 *
 * Published per-student annual pricing with volume tiers, which is the norm in
 * the Indian school ERP market (roughly ₹10–15 per student per month, or
 * ₹120–180 a year). Schools shortlist on published numbers; "request a quote"
 * pages get skipped.
 *
 * The figures below are placeholders in the sense that they are market-typical
 * rather than agreed — confirm them before launch.
 */

defined( 'ABSPATH' ) || exit;

return array(
	'id'          => 'pricing',
	'label'       => __( 'Pricing page', 'smartshala' ),
	'description' => __( 'Content for /pricing.', 'smartshala' ),
	'sections'    => array(

		array(
			'id'     => 'hero',
			'label'  => __( 'Page header', 'smartshala' ),
			'fields' => array(
				array( 'id' => 'eyebrow', 'type' => 'text', 'label' => __( 'Eyebrow', 'smartshala' ), 'default' => 'SIMPLE, HONEST PRICING' ),
				array( 'id' => 'heading', 'type' => 'text', 'label' => __( 'Heading', 'smartshala' ), 'default' => 'Every Module Included.' ),
				array( 'id' => 'heading_highlight', 'type' => 'text', 'label' => __( 'Heading — blue', 'smartshala' ), 'default' => 'No Hidden Costs.' ),
				array(
					'id'      => 'subheading',
					'type'    => 'textarea',
					'label'   => __( 'Sub-heading', 'smartshala' ),
					'default' => 'One annual subscription based on your student count. Setup, data migration, staff training and support are included — not billed separately.',
				),
			),
		),

		array(
			'id'          => 'plans',
			'label'       => __( 'Plans', 'smartshala' ),
			'description' => __( 'Volume tiers. Mark one as featured to highlight it.', 'smartshala' ),
			'fields'      => array(
				array( 'id' => 'note', 'type' => 'text', 'label' => __( 'Note above the plans', 'smartshala' ), 'default' => 'Billed annually · GST extra · No setup fee' ),
				array(
					'id'        => 'items',
					'type'      => 'repeater',
					'label'     => __( 'Plans', 'smartshala' ),
					'row_label' => 'name',
					'add_label' => __( 'Add plan', 'smartshala' ),
					'fields'    => array(
						array( 'id' => 'name', 'type' => 'text', 'label' => __( 'Name', 'smartshala' ) ),
						array( 'id' => 'audience', 'type' => 'text', 'label' => __( 'Who it is for', 'smartshala' ) ),
						array( 'id' => 'price', 'type' => 'text', 'label' => __( 'Price', 'smartshala' ) ),
						array( 'id' => 'unit', 'type' => 'text', 'label' => __( 'Price unit', 'smartshala' ) ),
						array( 'id' => 'points', 'type' => 'textarea', 'label' => __( 'Included', 'smartshala' ), 'help' => __( 'One per line.', 'smartshala' ) ),
						array( 'id' => 'cta_label', 'type' => 'text', 'label' => __( 'Button label', 'smartshala' ), 'default' => 'Book Free Demo' ),
						array( 'id' => 'cta_url', 'type' => 'url', 'label' => __( 'Button link', 'smartshala' ), 'default' => '/book-demo' ),
						array( 'id' => 'featured', 'type' => 'toggle', 'label' => __( 'Featured', 'smartshala' ), 'toggle_label' => __( 'Highlight this plan', 'smartshala' ) ),
					),
					'default'   => array(
						array(
							'name'      => 'Essential',
							'audience'  => 'Schools up to 500 students',
							'price'     => '₹150',
							'unit'      => 'per student / year',
							'points'    => "All modules included\nParent, teacher and student apps\nData migration and setup\nStaff training\nEmail and phone support",
							'cta_label' => 'Book Free Demo',
							'cta_url'   => '/book-demo',
							'featured'  => false,
						),
						array(
							'name'      => 'Professional',
							'audience'  => '500 – 2,000 students',
							'price'     => '₹120',
							'unit'      => 'per student / year',
							'points'    => "Everything in Essential\nBiometric and RFID integration\nOnline fee collection gateway\nAdvanced reports and analytics\nPriority 24/7 support\nDedicated account manager",
							'cta_label' => 'Book Free Demo',
							'cta_url'   => '/book-demo',
							'featured'  => true,
						),
						array(
							'name'      => 'Enterprise',
							'audience'  => '2,000+ students or multi-branch',
							'price'     => 'Custom',
							'unit'      => 'talk to us',
							'points'    => "Everything in Professional\nMulti-branch management\nGroup-level consolidated reporting\nCustom integrations and API access\nOn-site training\nNamed implementation manager",
							'cta_label' => 'Talk to Sales',
							'cta_url'   => '/book-demo',
							'featured'  => false,
						),
					),
				),
			),
		),

		array(
			'id'     => 'included',
			'label'  => __( 'Included in every plan', 'smartshala' ),
			'fields' => array(
				array( 'id' => 'heading', 'type' => 'text', 'label' => __( 'Heading', 'smartshala' ), 'default' => 'Included in every plan' ),
				array( 'id' => 'subheading', 'type' => 'text', 'label' => __( 'Sub-heading', 'smartshala' ), 'default' => 'The things other vendors charge extra for.' ),
				array(
					'id'        => 'items',
					'type'      => 'repeater',
					'label'     => __( 'Items', 'smartshala' ),
					'row_label' => 'title',
					'add_label' => __( 'Add item', 'smartshala' ),
					'fields'    => array(
						array( 'id' => 'icon', 'type' => 'icon', 'label' => __( 'Icon', 'smartshala' ) ),
						array( 'id' => 'title', 'type' => 'text', 'label' => __( 'Title', 'smartshala' ) ),
						array( 'id' => 'description', 'type' => 'text', 'label' => __( 'Description', 'smartshala' ) ),
					),
					'default'   => array(
						array( 'icon' => 'database', 'title' => 'Data migration', 'description' => 'We import your existing student, staff and fee records.' ),
						array( 'icon' => 'graduation-cap', 'title' => 'Staff training', 'description' => 'Hands-on sessions until your team is comfortable.' ),
						array( 'icon' => 'smartphone', 'title' => 'Mobile apps', 'description' => 'Parent, teacher and student apps at no extra cost.' ),
						array( 'icon' => 'server', 'title' => 'Hosting and backups', 'description' => 'No server to buy, no AMC, daily automated backups.' ),
						array( 'icon' => 'refresh-cw', 'title' => 'All updates', 'description' => 'New features and board format changes included.' ),
						array( 'icon' => 'headset', 'title' => 'Support', 'description' => 'Phone, email and WhatsApp, all year round.' ),
					),
				),
			),
		),

		array(
			'id'     => 'faq',
			'label'  => __( 'Pricing FAQ', 'smartshala' ),
			'fields' => array(
				array( 'id' => 'heading', 'type' => 'text', 'label' => __( 'Heading', 'smartshala' ), 'default' => 'Pricing questions' ),
				array(
					'id'        => 'items',
					'type'      => 'repeater',
					'label'     => __( 'Questions', 'smartshala' ),
					'row_label' => 'question',
					'add_label' => __( 'Add question', 'smartshala' ),
					'fields'    => array(
						array( 'id' => 'question', 'type' => 'text', 'label' => __( 'Question', 'smartshala' ) ),
						array( 'id' => 'answer', 'type' => 'textarea', 'label' => __( 'Answer', 'smartshala' ) ),
					),
					'default'   => array(
						array( 'question' => 'Is there a setup or implementation fee?', 'answer' => 'No. Data migration, configuration and staff training are part of your subscription. There is no one-time implementation charge.' ),
						array( 'question' => 'How is the student count calculated?', 'answer' => 'On your enrolled students at the start of the academic session. Students who join mid-session are counted pro-rata at renewal, not billed immediately.' ),
						array( 'question' => 'Do we pay extra for modules we turn on later?', 'answer' => 'No. Every module is included from day one. Switch on transport, library or hostel whenever you are ready at no extra cost.' ),
						array( 'question' => 'What about the mobile apps?', 'answer' => 'Parent, teacher and student apps are included. There is no per-app or per-parent charge.' ),
						array( 'question' => 'Can we leave and take our data with us?', 'answer' => 'Yes. Your data is yours. Export students, staff, fees and results to Excel at any time, and we will assist with a full export if you ever move on.' ),
						array( 'question' => 'Do you offer a discount for annual upfront payment?', 'answer' => 'All plans are billed annually by default. Multi-year commitments and school groups qualify for additional discounts — ask during your demo.' ),
					),
				),
			),
		),

		array(
			'id'     => 'cta',
			'label'  => __( 'Closing CTA', 'smartshala' ),
			'fields' => array(
				array( 'id' => 'heading', 'type' => 'text', 'label' => __( 'Heading', 'smartshala' ), 'default' => 'Not sure which plan fits?' ),
				array( 'id' => 'subheading', 'type' => 'textarea', 'label' => __( 'Sub-heading', 'smartshala' ), 'default' => 'Tell us your student count and we will give you an exact figure on the call — no obligation, no sales pressure.' ),
				array( 'id' => 'primary_label', 'type' => 'text', 'label' => __( 'Primary button', 'smartshala' ), 'default' => 'Book Free Demo' ),
				array( 'id' => 'primary_url', 'type' => 'url', 'label' => __( 'Primary link', 'smartshala' ), 'default' => '/book-demo' ),
				array( 'id' => 'secondary_label', 'type' => 'text', 'label' => __( 'Secondary button', 'smartshala' ), 'default' => 'See All Features' ),
				array( 'id' => 'secondary_url', 'type' => 'url', 'label' => __( 'Secondary link', 'smartshala' ), 'default' => '/features' ),
			),
		),
	),
);
