<?php
/**
 * Help Center page schema.
 *
 * A signposting page rather than a documentation system: it points staff at the
 * right guide and, more importantly, at a human. Swap the article links for a
 * real knowledge base when one exists.
 */

defined( 'ABSPATH' ) || exit;

return array(
	'id'          => 'help',
	'label'       => __( 'Help Center page', 'smartshala' ),
	'description' => __( 'Content for /help.', 'smartshala' ),
	'sections'    => array(

		array(
			'id'     => 'hero',
			'label'  => __( 'Page header', 'smartshala' ),
			'fields' => array(
				array( 'id' => 'eyebrow', 'type' => 'text', 'label' => __( 'Eyebrow', 'smartshala' ), 'default' => 'HELP CENTER' ),
				array( 'id' => 'heading', 'type' => 'text', 'label' => __( 'Heading', 'smartshala' ), 'default' => 'Help, When Your' ),
				array( 'id' => 'heading_highlight', 'type' => 'text', 'label' => __( 'Heading — blue', 'smartshala' ), 'default' => 'Office Is Busy.' ),
				array( 'id' => 'subheading', 'type' => 'textarea', 'label' => __( 'Sub-heading', 'smartshala' ), 'default' => 'Guides for every role in your school, and a support team that picks up the phone during admission season.' ),
			),
		),

		array(
			'id'     => 'topics',
			'label'  => __( 'Topics', 'smartshala' ),
			'fields' => array(
				array( 'id' => 'heading', 'type' => 'text', 'label' => __( 'Heading', 'smartshala' ), 'default' => 'Browse by topic' ),
				array(
					'id'        => 'items',
					'type'      => 'repeater',
					'label'     => __( 'Topics', 'smartshala' ),
					'row_label' => 'title',
					'add_label' => __( 'Add topic', 'smartshala' ),
					'fields'    => array(
						array( 'id' => 'icon', 'type' => 'icon', 'label' => __( 'Icon', 'smartshala' ) ),
						array( 'id' => 'title', 'type' => 'text', 'label' => __( 'Title', 'smartshala' ) ),
						array( 'id' => 'description', 'type' => 'text', 'label' => __( 'Description', 'smartshala' ) ),
						array( 'id' => 'url', 'type' => 'url', 'label' => __( 'Links to', 'smartshala' ), 'default' => '/contact' ),
					),
					'default'   => array(
						array( 'icon' => 'rocket', 'title' => 'Getting started', 'description' => 'First login, setting up classes, sections and the academic session.', 'url' => '/contact' ),
						array( 'icon' => 'users', 'title' => 'Students and admissions', 'description' => 'Adding students, bulk import, transfers and TC generation.', 'url' => '/contact' ),
						array( 'icon' => 'calendar-check', 'title' => 'Attendance', 'description' => 'Daily and period-wise marking, corrections, and monthly reports.', 'url' => '/contact' ),
						array( 'icon' => 'wallet', 'title' => 'Fees and receipts', 'description' => 'Fee heads, instalments, concessions, online payments and defaulters.', 'url' => '/contact' ),
						array( 'icon' => 'clipboard-check', 'title' => 'Exams and report cards', 'description' => 'Exam schedules, mark entry, grade scales and printing report cards.', 'url' => '/contact' ),
						array( 'icon' => 'smartphone', 'title' => 'Parent and teacher apps', 'description' => 'Getting parents onboard, notifications and common app questions.', 'url' => '/contact' ),
					),
				),
			),
		),

		array(
			'id'     => 'support',
			'label'  => __( 'Support panel', 'smartshala' ),
			'fields' => array(
				array( 'id' => 'heading', 'type' => 'text', 'label' => __( 'Heading', 'smartshala' ), 'default' => 'Need a person instead?' ),
				array( 'id' => 'subheading', 'type' => 'textarea', 'label' => __( 'Sub-heading', 'smartshala' ), 'default' => 'Existing schools have 24/7 access to our support team. New to SmartShala? Book a demo and we will walk you through it.' ),
				array(
					'id'        => 'items',
					'type'      => 'repeater',
					'label'     => __( 'Channels', 'smartshala' ),
					'row_label' => 'title',
					'add_label' => __( 'Add channel', 'smartshala' ),
					'fields'    => array(
						array( 'id' => 'icon', 'type' => 'icon', 'label' => __( 'Icon', 'smartshala' ) ),
						array( 'id' => 'title', 'type' => 'text', 'label' => __( 'Title', 'smartshala' ) ),
						array( 'id' => 'value', 'type' => 'text', 'label' => __( 'Value', 'smartshala' ) ),
						array( 'id' => 'url', 'type' => 'url', 'label' => __( 'Link', 'smartshala' ) ),
					),
					'default'   => array(
						array( 'icon' => 'phone', 'title' => 'Phone', 'value' => '+91 98765 43210', 'url' => 'tel:+919876543210' ),
						array( 'icon' => 'mail', 'title' => 'Email', 'value' => 'hello@letssmartshala.com', 'url' => 'mailto:hello@letssmartshala.com' ),
						array( 'icon' => 'message-circle', 'title' => 'WhatsApp', 'value' => 'Chat with support', 'url' => 'https://wa.me/919876543210' ),
					),
				),
			),
		),
	),
);
