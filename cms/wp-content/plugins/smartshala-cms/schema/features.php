<?php
/**
 * Features page schema.
 *
 * Copy is written to the conventions of the Indian school ERP market — the
 * things schools actually evaluate on: board compliance, per-period attendance,
 * online fee collection with receipts, and parent reach over SMS/WhatsApp.
 *
 * "Key points" fields take one bullet per line; a nested repeater would be
 * fussier to edit for no gain.
 */

defined( 'ABSPATH' ) || exit;

return array(
	'id'          => 'features',
	'label'       => __( 'Features page', 'smartshala' ),
	'description' => __( 'Content for /features.', 'smartshala' ),
	'sections'    => array(

		array(
			'id'          => 'hero',
			'label'       => __( 'Page header', 'smartshala' ),
			'description' => __( 'The band at the top of the page.', 'smartshala' ),
			'fields'      => array(
				array( 'id' => 'eyebrow', 'type' => 'text', 'label' => __( 'Eyebrow', 'smartshala' ), 'default' => 'POWERFUL FEATURES' ),
				array( 'id' => 'heading', 'type' => 'text', 'label' => __( 'Heading', 'smartshala' ), 'default' => 'Everything Your School Needs,' ),
				array( 'id' => 'heading_highlight', 'type' => 'text', 'label' => __( 'Heading — blue', 'smartshala' ), 'default' => 'In One Platform.' ),
				array(
					'id'      => 'subheading',
					'type'    => 'textarea',
					'label'   => __( 'Sub-heading', 'smartshala' ),
					'default' => 'From admissions to report cards, SmartShala replaces the registers, spreadsheets and WhatsApp groups your school runs on today — with one system every department shares.',
				),
				array( 'id' => 'primary_label', 'type' => 'text', 'label' => __( 'Button label', 'smartshala' ), 'default' => 'Book Free Demo' ),
				array( 'id' => 'primary_url', 'type' => 'url', 'label' => __( 'Button link', 'smartshala' ), 'default' => '/book-demo' ),
			),
		),

		array(
			'id'          => 'list',
			'label'       => __( 'Feature list', 'smartshala' ),
			'description' => __( 'Each feature is a full-width block, alternating left and right.', 'smartshala' ),
			'fields'      => array(
				array(
					'id'        => 'items',
					'type'      => 'repeater',
					'label'     => __( 'Features', 'smartshala' ),
					'row_label' => 'title',
					'add_label' => __( 'Add feature', 'smartshala' ),
					'fields'    => array(
						array( 'id' => 'icon', 'type' => 'icon', 'label' => __( 'Icon', 'smartshala' ) ),
						array( 'id' => 'title', 'type' => 'text', 'label' => __( 'Title', 'smartshala' ) ),
						array( 'id' => 'summary', 'type' => 'textarea', 'label' => __( 'Summary', 'smartshala' ) ),
						array( 'id' => 'points', 'type' => 'textarea', 'label' => __( 'Key points', 'smartshala' ), 'help' => __( 'One per line.', 'smartshala' ) ),
					),
					'default'   => array(
						array(
							'icon'    => 'users',
							'title'   => 'Student Management',
							'summary' => 'One record per student, from enquiry to alumni — admission details, guardians, documents, house, section and transfer certificates, all searchable in seconds.',
							'points'  => "Bulk import existing records from Excel\nDigital document vault for TC, Aadhaar and certificates\nSection, house and roll-number allocation\nStudent, sibling and guardian linking",
						),
						array(
							'icon'    => 'calendar-check',
							'title'   => 'Attendance Management',
							'summary' => 'Mark attendance in seconds — daily or period-wise — and let parents know the same morning instead of at the end of term.',
							'points'  => "Daily and period-wise marking from any device\nAutomatic absent alerts to parents\nBiometric and RFID device integration\nMonthly and term attendance registers",
						),
						array(
							'icon'    => 'wallet',
							'title'   => 'Fee Management',
							'summary' => 'Define any fee structure, collect online or at the counter, and stop chasing dues by hand.',
							'points'  => "Class-wise structures, instalments and due dates\nOnline payment with instant digital receipts\nConcessions, scholarships and sibling discounts\nAutomated reminders for outstanding dues",
						),
						array(
							'icon'    => 'clipboard-check',
							'title'   => 'Examinations & Marks',
							'summary' => 'Schedule exams, enter marks once, and generate board-format report cards without rebuilding them every term.',
							'points'  => "Exam scheduling with seating and hall tickets\nSubject-wise marks entry with grade rules\nCBSE, ICSE and State report card formats\nResult analysis by class, subject and student",
						),
						array(
							'icon'    => 'message-circle',
							'title'   => 'Parent Communication',
							'summary' => 'Reach every parent on the channel they actually read — without maintaining a hundred WhatsApp groups.',
							'points'  => "SMS, WhatsApp, email and in-app notifications\nCirculars, holiday notices and event updates\nPTM scheduling and teacher messaging\nDelivery reports for every announcement",
						),
						array(
							'icon'    => 'file-chart-column',
							'title'   => 'Reports & Analytics',
							'summary' => 'The numbers your management committee asks for, ready before they ask — not assembled overnight from spreadsheets.',
							'points'  => "Live dashboards for admissions, fees and attendance\nFee collection and outstanding analysis\nAcademic performance trends by class and subject\nOne-click export to Excel and PDF",
						),
						array(
							'icon'    => 'presentation',
							'title'   => 'Teacher Management',
							'summary' => 'Staff records, subject allocation and workload in one place, so timetabling and substitutions stop being guesswork.',
							'points'  => "Staff profiles, qualifications and documents\nSubject and class allocation per teacher\nWorkload balancing and substitution planning\nLeave requests and approval trail",
						),
						array(
							'icon'    => 'cloud',
							'title'   => 'Cloud Access',
							'summary' => 'No server in the principal\'s office, no annual maintenance contract, no data lost when a machine fails.',
							'points'  => "Secure servers hosted in India\nAutomatic daily backups\nWorks on phone, tablet and desktop\n99.9% uptime commitment",
						),
						array(
							'icon'    => 'refresh-cw',
							'title'   => 'Regular Updates',
							'summary' => 'New features and board format changes arrive automatically — you never pay for a version upgrade.',
							'points'  => "Free updates for the life of your subscription\nBoard and compliance format changes included\nNo downtime during releases\nFeature requests from schools shape the roadmap",
						),
						array(
							'icon'    => 'headset',
							'title'   => 'Customer Support',
							'summary' => 'Onboarding that actually finishes, and a team that answers when your office needs help mid-admission season.',
							'points'  => "Guided data migration and setup\nOn-site and online staff training\n24/7 support by phone, email and WhatsApp\nDedicated account manager",
						),
					),
				),
			),
		),

		array(
			'id'          => 'cta',
			'label'       => __( 'Closing CTA', 'smartshala' ),
			'description' => __( 'The band at the foot of the page.', 'smartshala' ),
			'fields'      => array(
				array( 'id' => 'heading', 'type' => 'text', 'label' => __( 'Heading', 'smartshala' ), 'default' => 'See it running on your own school data.' ),
				array( 'id' => 'subheading', 'type' => 'textarea', 'label' => __( 'Sub-heading', 'smartshala' ), 'default' => 'Book a 30-minute walkthrough. We will set up a sample of your classes and fee structure so you can judge it properly.' ),
				array( 'id' => 'primary_label', 'type' => 'text', 'label' => __( 'Primary button', 'smartshala' ), 'default' => 'Book Free Demo' ),
				array( 'id' => 'primary_url', 'type' => 'url', 'label' => __( 'Primary link', 'smartshala' ), 'default' => '/book-demo' ),
				array( 'id' => 'secondary_label', 'type' => 'text', 'label' => __( 'Secondary button', 'smartshala' ), 'default' => 'View Pricing' ),
				array( 'id' => 'secondary_url', 'type' => 'url', 'label' => __( 'Secondary link', 'smartshala' ), 'default' => '/pricing' ),
			),
		),
	),
);
