<?php
/**
 * Privacy Policy page schema.
 *
 * ---------------------------------------------------------------------------
 * NOT LEGAL ADVICE. This is a reasonable starting draft for an Indian SaaS
 * handling children's data, written so the client has something concrete to
 * take to a lawyer. It MUST be reviewed before launch — particularly the
 * DPDP Act 2023 obligations around verifiable parental consent for processing
 * children's personal data, which carry real penalties.
 * ---------------------------------------------------------------------------
 */

defined( 'ABSPATH' ) || exit;

return array(
	'id'          => 'privacy',
	'label'       => __( 'Privacy Policy', 'smartshala' ),
	'description' => __( 'Content for /privacy. Draft only — must be reviewed by a lawyer before launch.', 'smartshala' ),
	'sections'    => array(

		array(
			'id'     => 'hero',
			'label'  => __( 'Page header', 'smartshala' ),
			'fields' => array(
				array( 'id' => 'heading', 'type' => 'text', 'label' => __( 'Heading', 'smartshala' ), 'default' => 'Privacy Policy' ),
				array( 'id' => 'updated', 'type' => 'text', 'label' => __( 'Last updated', 'smartshala' ), 'default' => 'Last updated: 3 August 2026' ),
				array( 'id' => 'intro', 'type' => 'textarea', 'label' => __( 'Intro', 'smartshala' ), 'default' => 'SmartShala Technologies Pvt. Ltd. ("SmartShala", "we") provides school management software to educational institutions. This policy explains what personal data we handle, why, and what rights you have. It applies to our website and to the SmartShala platform and mobile apps.' ),
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
							'title' => 'Our role: processor, not owner',
							'body'  => "When your school uses SmartShala, the school is the Data Fiduciary for its student, parent and staff data. We are the Data Processor: we hold and process that data on the school's instructions, under our agreement with them.\n\nWe do not sell personal data. We do not use student data to train advertising systems or share it with advertisers.",
						),
						array(
							'title' => 'Data we process',
							'body'  => "On behalf of schools:\n- Student records — name, admission number, class and section, date of birth, photograph, guardian details, address and contact numbers\n- Attendance, examination marks, report cards and disciplinary notes\n- Fee records, payment history and receipts\n- Staff records — name, designation, contact details, qualifications and payroll inputs where enabled\n\nDirectly from website visitors:\n- Details you submit through our demo and contact forms — name, school, role, email, phone, city and message\n- Basic technical data such as IP address and browser type, used for security and to keep the service running",
						),
						array(
							'title' => "Children's data",
							'body'  => "Much of the data we process concerns children. We process it solely to deliver school management functions the school has asked for.\n\nWe do not undertake tracking, behavioural monitoring or targeted advertising directed at children. Schools are responsible for obtaining any parental consent required under the Digital Personal Data Protection Act, 2023, and we support them in honouring parental requests relating to their child's data.",
						),
						array(
							'title' => 'Why we process it',
							'body'  => "- To provide the platform and its modules to your school\n- To authenticate users and enforce role-based access\n- To send notifications your school configures, such as attendance alerts, fee reminders and announcements\n- To provide support, investigate faults and improve reliability\n- To meet legal, tax and audit obligations",
						),
						array(
							'title' => 'Storage, security and retention',
							'body'  => "Data is stored on servers located in India. We use encryption in transit and at rest, role-based access controls, audit logging and automated daily backups.\n\nWe retain school data for as long as the school's subscription is active. On termination we retain it for 90 days so the school can export it, then delete it from live systems, with backup copies aging out on their normal cycle. Enquiry data from our website is retained for up to 24 months.",
						),
						array(
							'title' => 'Sharing',
							'body'  => "We share data only with:\n- Sub-processors who help us run the service, such as cloud hosting, SMS and email delivery and payment gateways, each bound by confidentiality and data protection terms\n- Authorities, where required by law\n\nWe do not transfer personal data outside India except where a sub-processor requires it, and only with appropriate safeguards.",
						),
						array(
							'title' => 'Your rights',
							'body'  => "You may request access to, correction of, or deletion of your personal data, and you may withdraw consent where processing relies on it.\n\nIf you are a parent, student or staff member of a school using SmartShala, please contact your school first — they control the record. If they direct the request to us, we will act on their instruction. For data you gave us directly through this website, contact us and we will action it.",
						),
						array(
							'title' => 'Cookies',
							'body'  => "Our website uses only cookies necessary for the site to function and for basic, aggregated usage measurement. We do not use advertising or cross-site tracking cookies. The SmartShala platform uses a session cookie to keep you signed in.",
						),
						array(
							'title' => 'Changes and contact',
							'body'  => "We will update this policy as the service changes and will revise the date above. Material changes will be notified to schools directly.\n\nQuestions, or to exercise a right:\nSmartShala Technologies Pvt. Ltd.\nAhmedabad, Gujarat, India – 380015\nhello@letssmartshala.com",
						),
					),
				),
			),
		),
	),
);
