<?php
/**
 * Book a demo page schema.
 *
 * The conversion page — every CTA on the site points here. Submissions go to
 * SmartShala → Demo Requests in wp-admin and are emailed to the site admin.
 * See includes/class-smartshala-leads.php.
 */

defined( 'ABSPATH' ) || exit;

return array(
	'id'          => 'book-demo',
	'label'       => __( 'Book Demo page', 'smartshala' ),
	'description' => __( 'Content for /book-demo. Submissions appear under Demo Requests.', 'smartshala' ),
	'sections'    => array(

		array(
			'id'     => 'hero',
			'label'  => __( 'Page header', 'smartshala' ),
			'fields' => array(
				array( 'id' => 'eyebrow', 'type' => 'text', 'label' => __( 'Eyebrow', 'smartshala' ), 'default' => 'BOOK A FREE DEMO' ),
				array( 'id' => 'heading', 'type' => 'text', 'label' => __( 'Heading', 'smartshala' ), 'default' => 'See SmartShala Running' ),
				array( 'id' => 'heading_highlight', 'type' => 'text', 'label' => __( 'Heading — blue', 'smartshala' ), 'default' => 'On Your School Data.' ),
				array(
					'id'      => 'subheading',
					'type'    => 'textarea',
					'label'   => __( 'Sub-heading', 'smartshala' ),
					'default' => 'A 30-minute walkthrough with someone who knows school operations — not a generic sales pitch. We will set up a sample of your classes and fee structure so you can judge it properly.',
				),
			),
		),

		array(
			'id'     => 'form',
			'label'  => __( 'Form', 'smartshala' ),
			'fields' => array(
				array( 'id' => 'title', 'type' => 'text', 'label' => __( 'Form title', 'smartshala' ), 'default' => 'Request your demo' ),
				array( 'id' => 'note', 'type' => 'text', 'label' => __( 'Note under the form', 'smartshala' ), 'default' => 'We reply within one working day. Your details are never shared.' ),
				array( 'id' => 'submit_label', 'type' => 'text', 'label' => __( 'Submit button', 'smartshala' ), 'default' => 'Request Demo' ),
				array( 'id' => 'success_title', 'type' => 'text', 'label' => __( 'Success title', 'smartshala' ), 'default' => 'Thank you — we have your request.' ),
				array( 'id' => 'success_body', 'type' => 'textarea', 'label' => __( 'Success message', 'smartshala' ), 'default' => 'Someone from our team will call you within one working day to schedule a time that suits your school.' ),
			),
		),

		array(
			'id'     => 'expect',
			'label'  => __( 'What happens next', 'smartshala' ),
			'fields' => array(
				array( 'id' => 'heading', 'type' => 'text', 'label' => __( 'Heading', 'smartshala' ), 'default' => 'What happens next' ),
				array(
					'id'        => 'items',
					'type'      => 'repeater',
					'label'     => __( 'Steps', 'smartshala' ),
					'row_label' => 'title',
					'add_label' => __( 'Add step', 'smartshala' ),
					'fields'    => array(
						array( 'id' => 'icon', 'type' => 'icon', 'label' => __( 'Icon', 'smartshala' ) ),
						array( 'id' => 'title', 'type' => 'text', 'label' => __( 'Title', 'smartshala' ) ),
						array( 'id' => 'description', 'type' => 'text', 'label' => __( 'Description', 'smartshala' ) ),
					),
					'default'   => array(
						array( 'icon' => 'phone-call', 'title' => 'We call you back', 'description' => 'Within one working day, to understand your school and pick a time.' ),
						array( 'icon' => 'monitor-play', 'title' => 'Live walkthrough', 'description' => '30 minutes on the modules that matter to you, with your own data as the example.' ),
						array( 'icon' => 'file-text', 'title' => 'A written quote', 'description' => 'An exact figure for your student count, with nothing hidden in the footnotes.' ),
					),
				),
			),
		),

		array(
			'id'     => 'trust',
			'label'  => __( 'Trust strip', 'smartshala' ),
			'fields' => array(
				array(
					'id'        => 'items',
					'type'      => 'repeater',
					'label'     => __( 'Items', 'smartshala' ),
					'row_label' => 'label',
					'add_label' => __( 'Add item', 'smartshala' ),
					'fields'    => array(
						array( 'id' => 'icon', 'type' => 'icon', 'label' => __( 'Icon', 'smartshala' ) ),
						array( 'id' => 'label', 'type' => 'text', 'label' => __( 'Label', 'smartshala' ) ),
					),
					'default'   => array(
						array( 'icon' => 'clock', 'label' => 'No obligation' ),
						array( 'icon' => 'shield-check', 'label' => 'Your data stays private' ),
						array( 'icon' => 'users', 'label' => 'Trusted by 100+ schools' ),
					),
				),
			),
		),
	),
);
