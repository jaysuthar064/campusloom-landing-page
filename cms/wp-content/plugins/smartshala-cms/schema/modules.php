<?php
/**
 * Modules page schema.
 *
 * Where /features answers "what can it do", this answers "what do we switch on".
 * Modules are grouped the way schools actually budget for them: academics,
 * finance, people, operations.
 */

defined( 'ABSPATH' ) || exit;

return array(
	'id'          => 'modules',
	'label'       => __( 'Modules page', 'smartshala' ),
	'description' => __( 'Content for /modules.', 'smartshala' ),
	'sections'    => array(

		array(
			'id'     => 'hero',
			'label'  => __( 'Page header', 'smartshala' ),
			'fields' => array(
				array( 'id' => 'eyebrow', 'type' => 'text', 'label' => __( 'Eyebrow', 'smartshala' ), 'default' => 'ALL MODULES INCLUDED' ),
				array( 'id' => 'heading', 'type' => 'text', 'label' => __( 'Heading', 'smartshala' ), 'default' => 'Every Module Your' ),
				array( 'id' => 'heading_highlight', 'type' => 'text', 'label' => __( 'Heading — blue', 'smartshala' ), 'default' => 'School Runs On.' ),
				array(
					'id'      => 'subheading',
					'type'    => 'textarea',
					'label'   => __( 'Sub-heading', 'smartshala' ),
					'default' => 'No tiered plans and no module upsells. Every school on SmartShala gets all of it from day one, and they all share the same student record.',
				),
				array( 'id' => 'primary_label', 'type' => 'text', 'label' => __( 'Button label', 'smartshala' ), 'default' => 'Book Free Demo' ),
				array( 'id' => 'primary_url', 'type' => 'url', 'label' => __( 'Button link', 'smartshala' ), 'default' => '/book-demo' ),
			),
		),

		array(
			'id'          => 'list',
			'label'       => __( 'Module list', 'smartshala' ),
			'description' => __( 'Grouped cards. Use the group field to sort them into bands.', 'smartshala' ),
			'fields'      => array(
				array(
					'id'        => 'items',
					'type'      => 'repeater',
					'label'     => __( 'Modules', 'smartshala' ),
					'row_label' => 'title',
					'add_label' => __( 'Add module', 'smartshala' ),
					'fields'    => array(
						array( 'id' => 'icon', 'type' => 'icon', 'label' => __( 'Icon', 'smartshala' ) ),
						array( 'id' => 'title', 'type' => 'text', 'label' => __( 'Title', 'smartshala' ) ),
						array( 'id' => 'description', 'type' => 'textarea', 'label' => __( 'Description', 'smartshala' ) ),
						array(
							'id'      => 'group',
							'type'    => 'select',
							'label'   => __( 'Group', 'smartshala' ),
							'choices' => array(
								'academics'  => __( 'Academics', 'smartshala' ),
								'finance'    => __( 'Finance', 'smartshala' ),
								'people'     => __( 'People', 'smartshala' ),
								'operations' => __( 'Operations', 'smartshala' ),
							),
							'default' => 'academics',
						),
					),
					'default'   => array(
						array( 'icon' => 'users', 'title' => 'Students', 'group' => 'academics', 'description' => 'The central student record every other module reads from — admission details, guardians, documents and history.' ),
						array( 'icon' => 'calendar-check', 'title' => 'Attendance', 'group' => 'academics', 'description' => 'Daily and period-wise attendance with automatic parent alerts and term registers.' ),
						array( 'icon' => 'clipboard-pen', 'title' => 'Exams', 'group' => 'academics', 'description' => 'Exam schedules, hall tickets, marks entry and board-format report cards.' ),
						array( 'icon' => 'calendar-days', 'title' => 'Timetable', 'group' => 'academics', 'description' => 'Class and teacher timetables with clash detection and same-day substitution planning.' ),

						array( 'icon' => 'wallet', 'title' => 'Fees', 'group' => 'finance', 'description' => 'Fee structures, instalments, online collection, receipts, concessions and dues tracking.' ),
						array( 'icon' => 'file-chart-column', 'title' => 'Reports', 'group' => 'finance', 'description' => 'Collection, outstanding, admission and attendance reports, exportable to Excel and PDF.' ),
						array( 'icon' => 'bar-chart-3', 'title' => 'Analytics', 'group' => 'finance', 'description' => 'Live dashboards showing where fees, admissions and academic results are trending.' ),

						array( 'icon' => 'users-round', 'title' => 'Teachers', 'group' => 'people', 'description' => 'Staff profiles, subject allocation, workload balancing, leave and approval trails.' ),
						array( 'icon' => 'graduation-cap', 'title' => 'Admissions', 'group' => 'people', 'description' => 'Enquiry capture, application forms, follow-ups and conversion into enrolled students.' ),
						array( 'icon' => 'message-circle', 'title' => 'Communication', 'group' => 'people', 'description' => 'SMS, WhatsApp, email and app notifications, with delivery reports for every circular.' ),

						array( 'icon' => 'bell', 'title' => 'Notifications', 'group' => 'operations', 'description' => 'Automated reminders for fee dues, absences, exams, holidays and PTMs.' ),
						array( 'icon' => 'file-pen', 'title' => 'Logs', 'group' => 'operations', 'description' => 'A full audit trail of who changed what and when, across every module.' ),
					),
				),
			),
		),

		array(
			'id'     => 'cta',
			'label'  => __( 'Closing CTA', 'smartshala' ),
			'fields' => array(
				array( 'id' => 'heading', 'type' => 'text', 'label' => __( 'Heading', 'smartshala' ), 'default' => 'All modules. One price. No upsells.' ),
				array( 'id' => 'subheading', 'type' => 'textarea', 'label' => __( 'Sub-heading', 'smartshala' ), 'default' => 'Every module on this page is included in your subscription. Book a demo and we will show you the ones your school needs first.' ),
				array( 'id' => 'primary_label', 'type' => 'text', 'label' => __( 'Primary button', 'smartshala' ), 'default' => 'Book Free Demo' ),
				array( 'id' => 'primary_url', 'type' => 'url', 'label' => __( 'Primary link', 'smartshala' ), 'default' => '/book-demo' ),
				array( 'id' => 'secondary_label', 'type' => 'text', 'label' => __( 'Secondary button', 'smartshala' ), 'default' => 'View Pricing' ),
				array( 'id' => 'secondary_url', 'type' => 'url', 'label' => __( 'Secondary link', 'smartshala' ), 'default' => '/pricing' ),
			),
		),
	),
);
