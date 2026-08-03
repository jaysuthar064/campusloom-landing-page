<?php
/**
 * FAQs page schema.
 *
 * The long-form version of the home page FAQ, grouped by topic. Questions are
 * the ones schools actually ask during evaluation: migration from an existing
 * system, board report formats, offline access, parent adoption and exit terms.
 */

defined( 'ABSPATH' ) || exit;

return array(
	'id'          => 'faqs',
	'label'       => __( 'FAQs page', 'smartshala' ),
	'description' => __( 'Content for /faqs.', 'smartshala' ),
	'sections'    => array(

		array(
			'id'     => 'hero',
			'label'  => __( 'Page header', 'smartshala' ),
			'fields' => array(
				array( 'id' => 'eyebrow', 'type' => 'text', 'label' => __( 'Eyebrow', 'smartshala' ), 'default' => 'FREQUENTLY ASKED QUESTIONS' ),
				array( 'id' => 'heading', 'type' => 'text', 'label' => __( 'Heading', 'smartshala' ), 'default' => 'Everything Schools Ask' ),
				array( 'id' => 'heading_highlight', 'type' => 'text', 'label' => __( 'Heading — blue', 'smartshala' ), 'default' => 'Before Switching.' ),
				array( 'id' => 'subheading', 'type' => 'textarea', 'label' => __( 'Sub-heading', 'smartshala' ), 'default' => 'Straight answers on migration, security, pricing and support. If something is missing, ask us directly.' ),
			),
		),

		array(
			'id'          => 'groups',
			'label'       => __( 'Question groups', 'smartshala' ),
			'description' => __( 'Each group renders as a heading with its questions beneath.', 'smartshala' ),
			'fields'      => array(
				array(
					'id'        => 'items',
					'type'      => 'repeater',
					'label'     => __( 'Groups', 'smartshala' ),
					'row_label' => 'title',
					'add_label' => __( 'Add group', 'smartshala' ),
					'fields'    => array(
						array( 'id' => 'icon', 'type' => 'icon', 'label' => __( 'Icon', 'smartshala' ) ),
						array( 'id' => 'title', 'type' => 'text', 'label' => __( 'Group title', 'smartshala' ) ),
						array(
							'id'      => 'questions',
							'type'    => 'textarea',
							'label'   => __( 'Questions', 'smartshala' ),
							'help'    => __( 'One per line, as "Question | Answer".', 'smartshala' ),
						),
					),
					'default'   => array(
						array(
							'icon'      => 'circle-help',
							'title'     => 'Getting started',
							'questions' => "What is SmartShala? | SmartShala is a cloud-based school management platform that brings admissions, attendance, fees, examinations, communication and reporting into one system, with a shared student record across every department.\nHow long does setup take? | Most schools are live within two to three weeks. That covers data migration, configuring your classes, sections and fee structures, and training your staff.\nDo we need to buy servers or hardware? | No. SmartShala is fully cloud-hosted. You need internet and a browser. Biometric or RFID devices are optional and integrate if you already have them.\nCan we start mid-session? | Yes. Many schools switch mid-year. We import your data as it stands, so opening balances and attendance history carry across correctly.",
						),
						array(
							'icon'      => 'database',
							'title'     => 'Migration and data',
							'questions' => "We already use another system. Can you migrate our data? | Yes. Send us your existing records in whatever format you have — Excel, CSV, or an export from your current vendor — and we migrate students, staff, fee history and results for you.\nWhat if our data is only on paper or in Excel? | That is the most common case. Share your registers as spreadsheets and we will structure and import them. Our team does the mapping, not your office staff.\nWho owns our data? | Your school does, entirely. You can export students, staff, fees and results to Excel whenever you like, and we assist with a full export if you ever leave.\nDoes it support our board's report card format? | Yes. Report cards are configurable for CBSE, ICSE, IB and State board patterns, including grade scales, co-scholastic areas and remarks.",
						),
						array(
							'icon'      => 'shield-check',
							'title'     => 'Security and reliability',
							'questions' => "Where is our data stored? | On secure servers located in India, encrypted in transit and at rest, with automated daily backups.\nWho can see student information? | Only the roles you allow. Permissions are role-based, so a class teacher sees their classes, an accountant sees fees, and parents see only their own child.\nWhat happens if the internet goes down at school? | The platform is cloud-based, so it needs connectivity. Teachers can mark attendance on the mobile app and it syncs once the connection returns.\nWhat uptime do you guarantee? | We maintain 99.9% uptime, with monitoring and redundancy on the hosting side.",
						),
						array(
							'icon'      => 'wallet',
							'title'     => 'Pricing and billing',
							'questions' => "How is SmartShala priced? | An annual subscription based on your enrolled student count. Every module is included — there are no per-module charges.\nAre there setup or training fees? | No. Migration, configuration and staff training are part of the subscription.\nIs the parent app charged separately? | No. Parent, teacher and student apps are included at no extra cost, for unlimited users.\nCan parents pay fees online? | Yes. Online fee collection is supported with receipts generated automatically. Payment gateway charges are set by the gateway, not by us.",
						),
						array(
							'icon'      => 'headset',
							'title'     => 'Training and support',
							'questions' => "How are our teachers trained? | We run hands-on sessions with your staff, grouped by role, and provide short guides they can refer back to. Refresher sessions are available whenever you add new staff.\nWhat support do we get after go-live? | A dedicated support team on phone, email and WhatsApp, available 24/7, plus a named point of contact for your school.\nWhat if parents struggle with the app? | We provide a parent onboarding kit — a short guide and an announcement template you can send out. Parents can also contact our support directly.\nDo we pay for updates? | No. New features, board format changes and improvements arrive automatically at no additional cost.",
						),
					),
				),
			),
		),

		array(
			'id'     => 'cta',
			'label'  => __( 'Closing CTA', 'smartshala' ),
			'fields' => array(
				array( 'id' => 'heading', 'type' => 'text', 'label' => __( 'Heading', 'smartshala' ), 'default' => 'Still have a question?' ),
				array( 'id' => 'subheading', 'type' => 'textarea', 'label' => __( 'Sub-heading', 'smartshala' ), 'default' => 'Ask us anything about your school\'s specific setup — we would rather answer it now than have you find out later.' ),
				array( 'id' => 'primary_label', 'type' => 'text', 'label' => __( 'Primary button', 'smartshala' ), 'default' => 'Book Free Demo' ),
				array( 'id' => 'primary_url', 'type' => 'url', 'label' => __( 'Primary link', 'smartshala' ), 'default' => '/book-demo' ),
				array( 'id' => 'secondary_label', 'type' => 'text', 'label' => __( 'Secondary button', 'smartshala' ), 'default' => 'Contact Us' ),
				array( 'id' => 'secondary_url', 'type' => 'url', 'label' => __( 'Secondary link', 'smartshala' ), 'default' => '/contact' ),
			),
		),
	),
);
