<?php
/**
 * Terms of Service page schema.
 *
 * ---------------------------------------------------------------------------
 * NOT LEGAL ADVICE. A reasonable starting draft for an Indian SaaS agreement,
 * written so the client has something concrete to take to a lawyer. Liability
 * caps, refund terms and the governing-law clause in particular must be
 * reviewed and agreed before launch.
 * ---------------------------------------------------------------------------
 */

defined( 'ABSPATH' ) || exit;

return array(
	'id'          => 'terms',
	'label'       => __( 'Terms of Service', 'smartshala' ),
	'description' => __( 'Content for /terms. Draft only — must be reviewed by a lawyer before launch.', 'smartshala' ),
	'sections'    => array(

		array(
			'id'     => 'hero',
			'label'  => __( 'Page header', 'smartshala' ),
			'fields' => array(
				array( 'id' => 'heading', 'type' => 'text', 'label' => __( 'Heading', 'smartshala' ), 'default' => 'Terms of Service' ),
				array( 'id' => 'updated', 'type' => 'text', 'label' => __( 'Last updated', 'smartshala' ), 'default' => 'Last updated: 3 August 2026' ),
				array( 'id' => 'intro', 'type' => 'textarea', 'label' => __( 'Intro', 'smartshala' ), 'default' => 'These terms govern use of the SmartShala platform, mobile apps and website, provided by SmartShala Technologies Pvt. Ltd. By subscribing to or using the service, your institution agrees to them.' ),
			),
		),

		array(
			'id'     => 'body',
			'label'  => __( 'Sections', 'smartshala' ),
			'fields' => array(
				array(
					'id'        => 'items',
					'type'      => 'repeater',
					'label'     => __( 'Sections', 'smartshala' ),
					'row_label' => 'title',
					'add_label' => __( 'Add section', 'smartshala' ),
					'fields'    => array(
						array( 'id' => 'title', 'type' => 'text', 'label' => __( 'Title', 'smartshala' ) ),
						array( 'id' => 'body', 'type' => 'textarea', 'label' => __( 'Body', 'smartshala' ), 'help' => __( 'Blank line between paragraphs. Lines starting with "- " render as bullets.', 'smartshala' ) ),
					),
					'default'   => array(
						array(
							'title' => 'The service',
							'body'  => "SmartShala is a subscription, cloud-hosted school management platform. We grant your institution a non-exclusive, non-transferable right to use it for its own administration for the duration of the subscription.\n\nWe may improve, change or retire individual features. Where a change materially reduces functionality you rely on, we will give reasonable notice.",
						),
						array(
							'title' => 'Accounts and acceptable use',
							'body'  => "Your institution is responsible for the accounts it creates, the roles it assigns and the confidentiality of its credentials. Tell us promptly if you suspect unauthorised access.\n\nYou agree not to:\n- Share credentials outside your institution or resell access\n- Upload unlawful content, malware, or data you have no right to process\n- Attempt to breach security, reverse engineer the platform, or place unreasonable load on it",
						),
						array(
							'title' => 'Your data',
							'body'  => "Your institution retains ownership of all data it enters. We process it only to provide the service, as set out in our Privacy Policy.\n\nYou may export your data at any time. We will assist with a full export on request during your subscription and for 90 days after it ends.",
						),
						array(
							'title' => 'Fees and payment',
							'body'  => "Subscription fees are billed annually in advance, based on enrolled student count at the start of the academic session, at the rates quoted to your institution. GST applies in addition.\n\nInvoices are payable within 30 days. We may suspend access for accounts materially overdue, after written notice. Fees for a term already paid are non-refundable except where we fail to provide the service and cannot remedy it.",
						),
						array(
							'title' => 'Onboarding and support',
							'body'  => "Data migration, configuration and staff training are included in your subscription. Support is available by phone, email and WhatsApp.\n\nWe target 99.9% monthly uptime, excluding scheduled maintenance notified in advance and events outside our reasonable control.",
						),
						array(
							'title' => 'Intellectual property',
							'body'  => "The platform, its software, design and documentation remain our property. Nothing here transfers ownership of it to your institution. Your institution's name and logo remain yours; we will not use them publicly as a reference without permission.",
						),
						array(
							'title' => 'Term and termination',
							'body'  => "Subscriptions run for twelve months and renew unless either party gives 30 days' written notice before the renewal date.\n\nEither party may terminate for material breach that is not remedied within 30 days of written notice. On termination, access ends and we retain your data for 90 days so you can export it.",
						),
						array(
							'title' => 'Liability',
							'body'  => "The service is provided on a best-efforts basis. To the extent permitted by law, we are not liable for indirect or consequential loss, loss of profit, or loss of data where you have not used the export tools available to you.\n\nOur total aggregate liability in any twelve-month period is limited to the subscription fees paid by your institution in that period. Nothing limits liability that cannot lawfully be limited.",
						),
						array(
							'title' => 'Governing law',
							'body'  => "These terms are governed by the laws of India. The courts at Ahmedabad, Gujarat have exclusive jurisdiction over any dispute.\n\nQuestions about these terms:\nSmartShala Technologies Pvt. Ltd.\nAhmedabad, Gujarat, India – 380015\nhello@letssmartshala.com",
						),
					),
				),
			),
		),
	),
);
