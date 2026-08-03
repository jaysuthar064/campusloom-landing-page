<?php
/**
 * Contact page schema.
 *
 * Submissions land in SmartShala → Demo Requests alongside demo bookings,
 * tagged with source "Contact" so the two are easy to tell apart.
 */

defined( 'ABSPATH' ) || exit;

return array(
	'id'          => 'contact',
	'label'       => __( 'Contact page', 'smartshala' ),
	'description' => __( 'Content for /contact.', 'smartshala' ),
	'sections'    => array(

		array(
			'id'     => 'hero',
			'label'  => __( 'Page header', 'smartshala' ),
			'fields' => array(
				array( 'id' => 'eyebrow', 'type' => 'text', 'label' => __( 'Eyebrow', 'smartshala' ), 'default' => 'GET IN TOUCH' ),
				array( 'id' => 'heading', 'type' => 'text', 'label' => __( 'Heading', 'smartshala' ), 'default' => 'Talk to Someone Who' ),
				array( 'id' => 'heading_highlight', 'type' => 'text', 'label' => __( 'Heading — blue', 'smartshala' ), 'default' => 'Knows Schools.' ),
				array(
					'id'      => 'subheading',
					'type'    => 'textarea',
					'label'   => __( 'Sub-heading', 'smartshala' ),
					'default' => 'Questions about modules, pricing, migrating from your current system, or anything else — write to us and a real person will reply.',
				),
			),
		),

		array(
			'id'     => 'form',
			'label'  => __( 'Form', 'smartshala' ),
			'fields' => array(
				array( 'id' => 'title', 'type' => 'text', 'label' => __( 'Form title', 'smartshala' ), 'default' => 'Send us a message' ),
				array( 'id' => 'note', 'type' => 'text', 'label' => __( 'Note under the form', 'smartshala' ), 'default' => 'We reply within one working day.' ),
				array( 'id' => 'submit_label', 'type' => 'text', 'label' => __( 'Submit button', 'smartshala' ), 'default' => 'Send Message' ),
				array( 'id' => 'success_title', 'type' => 'text', 'label' => __( 'Success title', 'smartshala' ), 'default' => 'Message received.' ),
				array( 'id' => 'success_body', 'type' => 'textarea', 'label' => __( 'Success message', 'smartshala' ), 'default' => 'Thank you for writing to us. Someone from the team will get back to you within one working day.' ),
			),
		),

		array(
			'id'     => 'details',
			'label'  => __( 'Contact details', 'smartshala' ),
			'fields' => array(
				array( 'id' => 'heading', 'type' => 'text', 'label' => __( 'Heading', 'smartshala' ), 'default' => 'Other ways to reach us' ),
				array(
					'id'        => 'items',
					'type'      => 'repeater',
					'label'     => __( 'Details', 'smartshala' ),
					'row_label' => 'title',
					'add_label' => __( 'Add detail', 'smartshala' ),
					'fields'    => array(
						array( 'id' => 'icon', 'type' => 'icon', 'label' => __( 'Icon', 'smartshala' ) ),
						array( 'id' => 'title', 'type' => 'text', 'label' => __( 'Title', 'smartshala' ) ),
						array( 'id' => 'value', 'type' => 'text', 'label' => __( 'Value', 'smartshala' ) ),
						array( 'id' => 'url', 'type' => 'url', 'label' => __( 'Link', 'smartshala' ), 'help' => __( 'Optional. Use tel: or mailto: where it makes sense.', 'smartshala' ) ),
					),
					'default'   => array(
						array( 'icon' => 'phone', 'title' => 'Call us', 'value' => '+91 98765 43210', 'url' => 'tel:+919876543210' ),
						array( 'icon' => 'mail', 'title' => 'Email us', 'value' => 'hello@letssmartshala.com', 'url' => 'mailto:hello@letssmartshala.com' ),
						array( 'icon' => 'message-circle', 'title' => 'WhatsApp', 'value' => '+91 98765 43210', 'url' => 'https://wa.me/919876543210' ),
						array( 'icon' => 'map-pin', 'title' => 'Office', 'value' => 'Ahmedabad, Gujarat, India – 380015', 'url' => '' ),
					),
				),
				array( 'id' => 'hours_title', 'type' => 'text', 'label' => __( 'Hours title', 'smartshala' ), 'default' => 'Office hours' ),
				array( 'id' => 'hours_value', 'type' => 'text', 'label' => __( 'Hours', 'smartshala' ), 'default' => 'Monday to Saturday, 9:30am – 6:30pm IST' ),
				array( 'id' => 'support_note', 'type' => 'text', 'label' => __( 'Support note', 'smartshala' ), 'default' => 'Existing schools get 24/7 support — use the number in your onboarding pack.' ),
			),
		),
	),
);
