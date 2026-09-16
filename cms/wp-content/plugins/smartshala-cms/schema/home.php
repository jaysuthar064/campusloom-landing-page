<?php
/**
 * Home page schema.
 *
 * Every default here is the exact copy from Smart Shala_home_page.pdf, so a
 * fresh install renders the design as drawn before anyone edits anything.
 *
 * Sections are added a phase at a time, in the order they appear on the page.
 * See Documents/DESIGN.md for the section breakdown.
 */

defined( 'ABSPATH' ) || exit;

return array(
	'id'          => 'home',
	'label'       => __( 'Home', 'smartshala' ),
	'description' => __( 'Content for the SmartShala home page. Each tab is one section of the page, top to bottom.', 'smartshala' ),
	'sections'    => array(

		/* ---------------------------------------------------------------
		 * 01 — Navbar
		 * ------------------------------------------------------------- */
		array(
			'id'          => 'navbar',
			'label'       => __( 'Navbar', 'smartshala' ),
			'description' => __( 'The sticky header: logo, main menu, and the two right-hand actions.', 'smartshala' ),
			'fields'      => array(

				array(
					'id'      => 'logo',
					'type'    => 'group',
					'label'   => __( 'Logo', 'smartshala' ),
					'fields'  => array(
						array(
							'id'      => 'image',
							'type'    => 'image',
							'label'   => __( 'Logo mark', 'smartshala' ),
							'help'    => __( 'The blue rounded square. Leave empty to use the built-in mark.', 'smartshala' ),
						),
						array(
							'id'      => 'text',
							'type'    => 'text',
							'label'   => __( 'Wordmark', 'smartshala' ),
							'default' => 'SmartShala',
						),
						array(
							'id'      => 'tagline',
							'type'    => 'text',
							'label'   => __( 'Tagline under the wordmark', 'smartshala' ),
							'default' => 'SCHOOL ERP',
						),
						array(
							'id'      => 'url',
							'type'    => 'url',
							'label'   => __( 'Logo links to', 'smartshala' ),
							'default' => '/',
						),
					),
				),

				array(
					'id'        => 'menu',
					'type'      => 'repeater',
					'label'     => __( 'Menu items', 'smartshala' ),
					'help'      => __( 'Shown in the centre of the navbar, in this order.', 'smartshala' ),
					'row_label' => 'label',
					'add_label' => __( 'Add menu item', 'smartshala' ),
					'fields'    => array(
						array( 'id' => 'label', 'type' => 'text', 'label' => __( 'Label', 'smartshala' ) ),
						array( 'id' => 'url', 'type' => 'url', 'label' => __( 'Links to', 'smartshala' ), 'default' => '#' ),
						array(
							'id'           => 'has_dropdown',
							'type'         => 'toggle',
							'label'        => __( 'Dropdown', 'smartshala' ),
							'toggle_label' => __( 'Show a chevron / dropdown arrow', 'smartshala' ),
						),
					),
					'default'   => array(
						array( 'label' => 'Features',  'url' => '/features',  'has_dropdown' => true ),
						array( 'label' => 'Resources', 'url' => '/faqs',      'has_dropdown' => true ),
						array( 'label' => 'Company',   'url' => '/about',     'has_dropdown' => false ),
					),
				),

				array(
					'id'     => 'login',
					'type'   => 'group',
					'label'  => __( 'Log in link', 'smartshala' ),
					'fields' => array(
						array( 'id' => 'label', 'type' => 'text', 'label' => __( 'Label', 'smartshala' ), 'default' => '' ),
						array(
							'id'      => 'url',
							'type'    => 'url',
							'label'   => __( 'Links to', 'smartshala' ),
							'help'    => __( 'The SmartShala app sign-in. Opens in the same tab, since people clicking Log In mean to leave the marketing site.', 'smartshala' ),
							'default' => 'https://app.letssmartshala.com/login',
						),
					),
				),

				array(
					'id'     => 'cta',
					'type'   => 'group',
					'label'  => __( 'Primary button', 'smartshala' ),
					'fields' => array(
						array( 'id' => 'label', 'type' => 'text', 'label' => __( 'Label', 'smartshala' ), 'default' => 'Book Free Demo' ),
						array( 'id' => 'url', 'type' => 'url', 'label' => __( 'Links to', 'smartshala' ), 'default' => '/book-demo' ),
					),
				),
			),
		),

		/* ---------------------------------------------------------------
		 * 02 — Hero
		 * ------------------------------------------------------------- */
		array(
			'id'          => 'hero',
			'label'       => __( 'Hero', 'smartshala' ),
			'description' => __( 'The opening section: headline, sub-heading, two buttons, the three trust items, and the dashboard visual with its floating stat cards.', 'smartshala' ),
			'fields'      => array(

				array(
					'id'      => 'heading_line_1',
					'type'    => 'text',
					'label'   => __( 'Headline — first line', 'smartshala' ),
					'default' => 'Modern',
				),
				array(
					'id'      => 'heading_line_2',
					'type'    => 'text',
					'label'   => __( 'Headline — second line', 'smartshala' ),
					'default' => 'Schools Choose',
				),
				array(
					'id'      => 'heading_highlight',
					'type'    => 'text',
					'label'   => __( 'Headline — highlighted line', 'smartshala' ),
					'help'    => __( 'Shown in brand blue on its own line.', 'smartshala' ),
					'default' => 'SmartShala',
				),
				array(
					'id'      => 'subheading',
					'type'    => 'textarea',
					'label'   => __( 'Sub-heading', 'smartshala' ),
					'default' => 'One intelligent platform to manage your school smarter, simpler and better.',
				),

				array(
					'id'     => 'primary_cta',
					'type'   => 'group',
					'label'  => __( 'Primary button', 'smartshala' ),
					'fields' => array(
						array( 'id' => 'label', 'type' => 'text', 'label' => __( 'Label', 'smartshala' ), 'default' => 'Book Free Demo' ),
						array( 'id' => 'url', 'type' => 'url', 'label' => __( 'Links to', 'smartshala' ), 'default' => '/book-demo' ),
						array( 'id' => 'icon', 'type' => 'icon', 'label' => __( 'Icon', 'smartshala' ), 'default' => 'calendar' ),
					),
				),
				array(
					'id'     => 'secondary_cta',
					'type'   => 'group',
					'label'  => __( 'Secondary button', 'smartshala' ),
					'fields' => array(
						array( 'id' => 'label', 'type' => 'text', 'label' => __( 'Label', 'smartshala' ), 'default' => 'Watch Product Tour' ),
						array( 'id' => 'url', 'type' => 'url', 'label' => __( 'Links to', 'smartshala' ), 'default' => '/features' ),
						array( 'id' => 'icon', 'type' => 'icon', 'label' => __( 'Icon', 'smartshala' ), 'default' => 'circle-play' ),
					),
				),

				array(
					'id'        => 'trust_items',
					'type'      => 'repeater',
					'label'     => __( 'Trust items', 'smartshala' ),
					'help'      => __( 'The three icon + title + caption items under the buttons.', 'smartshala' ),
					'row_label' => 'title',
					'add_label' => __( 'Add trust item', 'smartshala' ),
					'fields'    => array(
						array( 'id' => 'icon', 'type' => 'icon', 'label' => __( 'Icon', 'smartshala' ) ),
						array( 'id' => 'title', 'type' => 'text', 'label' => __( 'Title', 'smartshala' ) ),
						array( 'id' => 'caption', 'type' => 'text', 'label' => __( 'Caption', 'smartshala' ) ),
					),
					'default'   => array(
						array( 'icon' => 'shield-check', 'title' => 'Secure & Cloud-Based', 'caption' => 'Your data is always safe' ),
						array( 'icon' => 'users',        'title' => 'Trusted by Schools',   'caption' => 'Across India' ),
						array( 'icon' => 'headset',      'title' => 'Dedicated Support',    'caption' => "We're here to help" ),
					),
				),

				array(
					'id'    => 'dashboard_image',
					'type'  => 'image',
					'label' => __( 'Dashboard visual', 'smartshala' ),
					'help'  => __( 'The product screenshot on the right. Leave empty to use the built-in mockup.', 'smartshala' ),
				),

				array(
					'id'        => 'floating_cards',
					'type'      => 'repeater',
					'label'     => __( 'Floating stat cards', 'smartshala' ),
					'help'      => __( 'The small cards overlapping the dashboard visual.', 'smartshala' ),
					'row_label' => 'label',
					'add_label' => __( 'Add stat card', 'smartshala' ),
					'fields'    => array(
						array( 'id' => 'icon', 'type' => 'icon', 'label' => __( 'Icon', 'smartshala' ) ),
						array( 'id' => 'label', 'type' => 'text', 'label' => __( 'Label', 'smartshala' ) ),
						array( 'id' => 'value', 'type' => 'text', 'label' => __( 'Value', 'smartshala' ) ),
						array( 'id' => 'caption', 'type' => 'text', 'label' => __( 'Caption', 'smartshala' ) ),
						array(
							'id'      => 'position',
							'type'    => 'select',
							'label'   => __( 'Position', 'smartshala' ),
							'choices' => array(
								'top-left'     => __( 'Top left', 'smartshala' ),
								'bottom-left'  => __( 'Bottom left', 'smartshala' ),
								'top-right'    => __( 'Top right', 'smartshala' ),
								'bottom-right' => __( 'Bottom right', 'smartshala' ),
							),
							'default' => 'top-left',
						),
					),
					'default'   => array(
						array( 'icon' => 'users',          'label' => 'Attendance',      'value' => '92.6%',   'caption' => 'Today',          'position' => 'top-left' ),
						array( 'icon' => 'wallet',         'label' => 'Fees Collection', 'value' => '₹ 1.4 Cr', 'caption' => 'This Month',     'position' => 'bottom-left' ),
						array( 'icon' => 'bar-chart-3',    'label' => 'Analytics',       'value' => '+16.6%',  'caption' => 'vs Last Month',  'position' => 'top-right' ),
						array( 'icon' => 'message-circle', 'label' => 'Communication',   'value' => '128',     'caption' => 'New Messages',   'position' => 'bottom-right' ),
					),
				),
			),
		),

		/* ---------------------------------------------------------------
		 * 03 — Trust & stats
		 * ------------------------------------------------------------- */
		array(
			'id'          => 'trust',
			'label'       => __( 'Trust & stats', 'smartshala' ),
			'description' => __( 'The school logo row and the four headline numbers beneath it.', 'smartshala' ),
			'fields'      => array(

				array(
					'id'      => 'eyebrow',
					'type'    => 'text',
					'label'   => __( 'Eyebrow pill', 'smartshala' ),
					'default' => 'TRUSTED BY SCHOOLS ACROSS INDIA',
				),
				array(
					'id'      => 'heading_line_1',
					'type'    => 'text',
					'label'   => __( 'Heading — first line', 'smartshala' ),
					'default' => 'Helping Schools',
				),
				array(
					'id'      => 'heading_highlight',
					'type'    => 'text',
					'label'   => __( 'Heading — highlighted word', 'smartshala' ),
					'help'    => __( 'Shown in brand blue at the start of the second line.', 'smartshala' ),
					'default' => 'Simplify',
				),
				array(
					'id'      => 'heading_line_2',
					'type'    => 'text',
					'label'   => __( 'Heading — rest of second line', 'smartshala' ),
					'default' => 'Administration',
				),
				array(
					'id'      => 'subheading',
					'type'    => 'textarea',
					'label'   => __( 'Sub-heading', 'smartshala' ),
					'default' => 'SmartShala is trusted by progressive schools to manage their operations efficiently and focus on what matters most – students.',
				),

				array(
					'id'        => 'schools',
					'type'      => 'repeater',
					'label'     => __( 'School logos', 'smartshala' ),
					'help'      => __( 'Leave the logo empty to use the built-in crest for that position.', 'smartshala' ),
					'row_label' => 'name',
					'add_label' => __( 'Add school', 'smartshala' ),
					'fields'    => array(
						array( 'id' => 'logo', 'type' => 'image', 'label' => __( 'Crest', 'smartshala' ) ),
						array( 'id' => 'name', 'type' => 'text', 'label' => __( 'Name', 'smartshala' ) ),
						array( 'id' => 'subtitle', 'type' => 'text', 'label' => __( 'Subtitle', 'smartshala' ) ),
					),
					'default'   => array(
						array( 'name' => 'Greenwood',     'subtitle' => 'International School' ),
						array( 'name' => 'Maple Heights', 'subtitle' => 'PUBLIC SCHOOL' ),
						array( 'name' => "St. Joseph's",  'subtitle' => 'Convent School' ),
						array( 'name' => 'Lotus Valley',  'subtitle' => 'Global School' ),
						array( 'name' => 'Victoria',      'subtitle' => 'World School' ),
						array( 'name' => 'Cambridge',     'subtitle' => 'International School' ),
					),
				),

				array(
					'id'        => 'stats',
					'type'      => 'repeater',
					'label'     => __( 'Stats', 'smartshala' ),
					'row_label' => 'value',
					'add_label' => __( 'Add stat', 'smartshala' ),
					'fields'    => array(
						array( 'id' => 'icon', 'type' => 'icon', 'label' => __( 'Icon', 'smartshala' ) ),
						array( 'id' => 'value', 'type' => 'text', 'label' => __( 'Value', 'smartshala' ) ),
						array( 'id' => 'label', 'type' => 'text', 'label' => __( 'Label', 'smartshala' ) ),
					),
					'default'   => array(
						array( 'icon' => 'users',        'value' => '5000+',  'label' => 'Students Managed' ),
						array( 'icon' => 'school',       'value' => '100+',   'label' => 'Schools' ),
						array( 'icon' => 'shield-check', 'value' => '99.9%',  'label' => 'Uptime' ),
						array( 'icon' => 'headset',      'value' => '24/7',   'label' => 'Support' ),
					),
				),
			),
		),

		/* ---------------------------------------------------------------
		 * 04 — One Dashboard
		 * ------------------------------------------------------------- */
		array(
			'id'          => 'one_dashboard',
			'label'       => __( 'One Dashboard', 'smartshala' ),
			'description' => __( 'The dashboard with the capability chips orbiting it. Each chip picks its own side.', 'smartshala' ),
			'fields'      => array(

				array(
					'id'      => 'heading_line_1',
					'type'    => 'text',
					'label'   => __( 'Heading — first line', 'smartshala' ),
					'default' => 'Everything.',
				),
				array(
					'id'      => 'heading_highlight',
					'type'    => 'text',
					'label'   => __( 'Heading — second line (blue)', 'smartshala' ),
					'default' => 'One Dashboard.',
				),
				array(
					'id'      => 'subheading',
					'type'    => 'text',
					'label'   => __( 'Sub-heading', 'smartshala' ),
					'default' => 'Every department. Every student. Every report.',
				),
				array(
					'id'      => 'subheading_highlight',
					'type'    => 'text',
					'label'   => __( 'Sub-heading — highlighted word', 'smartshala' ),
					'help'    => __( 'Shown in brand blue on its own line beneath the sub-heading.', 'smartshala' ),
					'default' => 'Connected.',
				),

				array(
					'id'    => 'dashboard_image',
					'type'  => 'image',
					'label' => __( 'Dashboard image', 'smartshala' ),
					'help'  => __( 'Leave empty to use the built-in dashboard.', 'smartshala' ),
				),

				array(
					'id'        => 'chips',
					'type'      => 'repeater',
					'label'     => __( 'Capability chips', 'smartshala' ),
					'help'      => __( 'Listed top to bottom within whichever side you choose.', 'smartshala' ),
					'row_label' => 'label',
					'add_label' => __( 'Add chip', 'smartshala' ),
					'fields'    => array(
						array( 'id' => 'icon', 'type' => 'icon', 'label' => __( 'Icon', 'smartshala' ) ),
						array( 'id' => 'label', 'type' => 'text', 'label' => __( 'Label', 'smartshala' ) ),
						array(
							'id'      => 'side',
							'type'    => 'select',
							'label'   => __( 'Side', 'smartshala' ),
							'choices' => array(
								'left'  => __( 'Left', 'smartshala' ),
								'right' => __( 'Right', 'smartshala' ),
							),
							'default' => 'left',
						),
					),
					'default'   => array(
						array( 'icon' => 'calendar-check',  'label' => 'Attendance',    'side' => 'left' ),
						array( 'icon' => 'wallet',          'label' => 'Fees',          'side' => 'left' ),
						array( 'icon' => 'message-circle',  'label' => 'Communication', 'side' => 'left' ),
						array( 'icon' => 'file-chart-column', 'label' => 'Reports',     'side' => 'left' ),
						array( 'icon' => 'clipboard-pen',   'label' => 'Exams',         'side' => 'left' ),
						array( 'icon' => 'users',           'label' => 'Students',      'side' => 'left' ),
						array( 'icon' => 'bar-chart-3',     'label' => 'Analytics',     'side' => 'right' ),
						array( 'icon' => 'users-round',     'label' => 'Teachers',      'side' => 'right' ),
						array( 'icon' => 'calendar-days',   'label' => 'Timetable',     'side' => 'right' ),
						array( 'icon' => 'graduation-cap',  'label' => 'Admissions',    'side' => 'right' ),
						array( 'icon' => 'file-pen',        'label' => 'Logs',          'side' => 'right' ),
						array( 'icon' => 'bell',            'label' => 'Notifications', 'side' => 'right' ),
					),
				),
			),
		),

		/* ---------------------------------------------------------------
		 * 05 — Features grid
		 * ------------------------------------------------------------- */
		array(
			'id'          => 'features',
			'label'       => __( 'Features', 'smartshala' ),
			'description' => __( 'The ten feature cards and the security line beneath them.', 'smartshala' ),
			'fields'      => array(

				array(
					'id'      => 'eyebrow',
					'type'    => 'text',
					'label'   => __( 'Eyebrow pill', 'smartshala' ),
					'default' => 'POWERFUL FEATURES',
				),
				array(
					'id'      => 'heading_line_1',
					'type'    => 'text',
					'label'   => __( 'Heading — first line', 'smartshala' ),
					'default' => 'Everything You Need.',
				),
				array(
					'id'      => 'heading_line_2',
					'type'    => 'text',
					'label'   => __( 'Heading — start of second line', 'smartshala' ),
					'default' => 'Built for',
				),
				array(
					'id'      => 'heading_highlight',
					'type'    => 'text',
					'label'   => __( 'Heading — highlighted end', 'smartshala' ),
					'default' => 'Modern Schools.',
				),
				array(
					'id'      => 'subheading',
					'type'    => 'textarea',
					'label'   => __( 'Sub-heading', 'smartshala' ),
					'default' => 'SmartShala brings every aspect of school administration together in one intelligent platform.',
				),

				array(
					'id'        => 'items',
					'type'      => 'repeater',
					'label'     => __( 'Feature cards', 'smartshala' ),
					'row_label' => 'title',
					'add_label' => __( 'Add feature', 'smartshala' ),
					'fields'    => array(
						array( 'id' => 'icon', 'type' => 'icon', 'label' => __( 'Icon', 'smartshala' ) ),
						array( 'id' => 'title', 'type' => 'text', 'label' => __( 'Title', 'smartshala' ) ),
						array( 'id' => 'description', 'type' => 'textarea', 'label' => __( 'Description', 'smartshala' ) ),
					),
					'default'   => array(
						array( 'icon' => 'users',              'title' => 'Student Management',    'description' => 'Manage student profiles, admissions, roll numbers and more.' ),
						array( 'icon' => 'calendar-check',     'title' => 'Attendance Management', 'description' => 'Track daily attendance with real-time updates and reports.' ),
						array( 'icon' => 'wallet',             'title' => 'Fee Management',        'description' => 'Automate fee collection, reminders and receipts effortlessly.' ),
						array( 'icon' => 'clipboard-check',    'title' => 'Examinations & Marks',  'description' => 'Schedule exams, record marks and generate grade reports.' ),
						array( 'icon' => 'message-circle',     'title' => 'Parent Communication',  'description' => 'Keep parents informed with instant alerts and messages.' ),
						array( 'icon' => 'file-chart-column',  'title' => 'Reports & Analytics',   'description' => 'Get insightful reports and analytics for better decision making.' ),
						array( 'icon' => 'presentation',       'title' => 'Teacher Management',    'description' => 'Manage teacher profiles, subjects, classes and workloads.' ),
						array( 'icon' => 'cloud',              'title' => 'Cloud Access',          'description' => 'Access your school data securely from anywhere, anytime.' ),
						array( 'icon' => 'refresh-cw',         'title' => 'Regular Updates',       'description' => 'Get automatic updates with new features and improvements.' ),
						array( 'icon' => 'headset',            'title' => 'Customer Support',      'description' => 'Dedicated support team available 24/7 to help you succeed.' ),
					),
				),

				array(
					'id'     => 'footnote',
					'type'   => 'group',
					'label'  => __( 'Security line', 'smartshala' ),
					'fields' => array(
						array( 'id' => 'icon', 'type' => 'icon', 'label' => __( 'Icon', 'smartshala' ), 'default' => 'shield-check' ),
						array( 'id' => 'title', 'type' => 'text', 'label' => __( 'Title', 'smartshala' ), 'default' => 'Secure. Reliable. Trusted by Schools.' ),
						array( 'id' => 'caption', 'type' => 'text', 'label' => __( 'Caption', 'smartshala' ), 'default' => 'Enterprise-grade security with 99.9% uptime.' ),
					),
				),
			),
		),

		/* ---------------------------------------------------------------
		 * 06 — Benefits
		 * ------------------------------------------------------------- */
		array(
			'id'          => 'benefits',
			'label'       => __( 'Benefits', 'smartshala' ),
			'description' => __( 'Six benefit cards on the tinted band, with the icon beside the text.', 'smartshala' ),
			'fields'      => array(

				array(
					'id'      => 'eyebrow',
					'type'    => 'text',
					'label'   => __( 'Eyebrow pill', 'smartshala' ),
					'default' => 'Smarter Administration. Stronger Schools.',
				),
				array(
					'id'      => 'eyebrow_icon',
					'type'    => 'icon',
					'label'   => __( 'Eyebrow icon', 'smartshala' ),
					'default' => 'sparkles',
				),
				array(
					'id'      => 'heading_line_1',
					'type'    => 'text',
					'label'   => __( 'Heading — first line', 'smartshala' ),
					'default' => 'Spend Less Time Managing.',
				),
				array(
					'id'      => 'heading_highlight',
					'type'    => 'text',
					'label'   => __( 'Heading — second line (blue)', 'smartshala' ),
					'default' => 'More Time Growing.',
				),
				array(
					'id'      => 'subheading',
					'type'    => 'text',
					'label'   => __( 'Sub-heading', 'smartshala' ),
					'default' => 'SmartShala helps schools work smarter, not harder.',
				),

				array(
					'id'        => 'items',
					'type'      => 'repeater',
					'label'     => __( 'Benefit cards', 'smartshala' ),
					'row_label' => 'title',
					'add_label' => __( 'Add benefit', 'smartshala' ),
					'fields'    => array(
						array( 'id' => 'icon', 'type' => 'icon', 'label' => __( 'Icon', 'smartshala' ) ),
						array( 'id' => 'title', 'type' => 'text', 'label' => __( 'Title', 'smartshala' ) ),
						array( 'id' => 'description', 'type' => 'textarea', 'label' => __( 'Description', 'smartshala' ) ),
					),
					'default'   => array(
						array( 'icon' => 'clock',          'title' => 'Save Time',            'description' => 'Automate daily tasks and free up hours for what matters most.' ),
						array( 'icon' => 'file-text',      'title' => 'Reduce Paperwork',     'description' => 'Go digital and eliminate stacks of paper for good.' ),
						array( 'icon' => 'indian-rupee',   'title' => 'Collect Fees Faster',  'description' => 'Streamline fee collection and improve cash flow.' ),
						array( 'icon' => 'message-circle', 'title' => 'Better Communication', 'description' => 'Keep parents, teachers and students informed, always.' ),
						array( 'icon' => 'cloud',          'title' => 'Cloud Based',          'description' => 'Access your school data securely from anywhere, anytime.' ),
						array( 'icon' => 'bar-chart-3',    'title' => 'Real-time Reports',    'description' => 'Get instant insights and make smarter decisions, faster.' ),
					),
				),
			),
		),

		/* ---------------------------------------------------------------
		 * 07 — How It Works
		 * ------------------------------------------------------------- */
		array(
			'id'          => 'how_it_works',
			'label'       => __( 'How It Works', 'smartshala' ),
			'description' => __( 'The four onboarding steps, the button beneath them, and the reassurance line.', 'smartshala' ),
			'fields'      => array(

				array(
					'id'      => 'brand_name',
					'type'    => 'text',
					'label'   => __( 'Brand name above the heading', 'smartshala' ),
					'help'    => __( 'Leave empty to hide the logo lockup.', 'smartshala' ),
					'default' => 'SmartShala',
				),
				array(
					'id'      => 'heading_line_1',
					'type'    => 'text',
					'label'   => __( 'Heading', 'smartshala' ),
					'default' => 'How It',
				),
				array(
					'id'      => 'heading_highlight',
					'type'    => 'text',
					'label'   => __( 'Heading — highlighted word', 'smartshala' ),
					'default' => 'Works',
				),
				array(
					'id'      => 'subheading',
					'type'    => 'text',
					'label'   => __( 'Sub-heading', 'smartshala' ),
					'default' => 'From demo to digital transformation in 4 simple steps.',
				),

				array(
					'id'        => 'steps',
					'type'      => 'repeater',
					'label'     => __( 'Steps', 'smartshala' ),
					'row_label' => 'title',
					'add_label' => __( 'Add step', 'smartshala' ),
					'fields'    => array(
						array( 'id' => 'number', 'type' => 'text', 'label' => __( 'Number', 'smartshala' ) ),
						array( 'id' => 'icon', 'type' => 'icon', 'label' => __( 'Icon', 'smartshala' ) ),
						array( 'id' => 'title', 'type' => 'text', 'label' => __( 'Title', 'smartshala' ) ),
						array( 'id' => 'caption', 'type' => 'textarea', 'label' => __( 'Caption', 'smartshala' ) ),
					),
					'default'   => array(
						array( 'number' => '01', 'icon' => 'calendar-clock',  'title' => 'Book Demo', 'caption' => 'Schedule a personalised walkthrough' ),
						array( 'number' => '02', 'icon' => 'cloud-cog',       'title' => 'Setup',     'caption' => 'Configure your school in minutes' ),
						array( 'number' => '03', 'icon' => 'graduation-cap',  'title' => 'Training',  'caption' => 'Quick onboarding for your staff' ),
						array( 'number' => '04', 'icon' => 'rocket',          'title' => 'Go Live',   'caption' => 'Start managing your school digitally' ),
					),
				),

				array(
					'id'     => 'cta',
					'type'   => 'group',
					'label'  => __( 'Button', 'smartshala' ),
					'fields' => array(
						array( 'id' => 'label', 'type' => 'text', 'label' => __( 'Label', 'smartshala' ), 'default' => 'Book Free Demo' ),
						array( 'id' => 'url', 'type' => 'url', 'label' => __( 'Links to', 'smartshala' ), 'default' => '/book-demo' ),
					),
				),
				array(
					'id'     => 'footnote',
					'type'   => 'group',
					'label'  => __( 'Reassurance line', 'smartshala' ),
					'fields' => array(
						array( 'id' => 'icon', 'type' => 'icon', 'label' => __( 'Icon', 'smartshala' ), 'default' => 'shield-check' ),
						array( 'id' => 'text', 'type' => 'text', 'label' => __( 'Text', 'smartshala' ), 'default' => 'Simple setup. Fast onboarding. Ready in days.' ),
					),
				),
			),
		),

		/* ---------------------------------------------------------------
		 * 08 — Testimonials
		 * ------------------------------------------------------------- */
		array(
			'id'          => 'testimonials',
			'label'       => __( 'Testimonials', 'smartshala' ),
			'description' => __( 'What school leaders say. Shown as a slider — three at a time on desktop.', 'smartshala' ),
			'fields'      => array(

				array(
					'id'      => 'eyebrow',
					'type'    => 'text',
					'label'   => __( 'Eyebrow pill', 'smartshala' ),
					'default' => 'Trusted by Principals',
				),
				array(
					'id'      => 'eyebrow_icon',
					'type'    => 'icon',
					'label'   => __( 'Eyebrow icon', 'smartshala' ),
					'default' => 'quote',
				),
				array(
					'id'      => 'heading_line_1',
					'type'    => 'text',
					'label'   => __( 'Heading — first line', 'smartshala' ),
					'default' => 'Loved by Schools.',
				),
				array(
					'id'      => 'heading_line_2',
					'type'    => 'text',
					'label'   => __( 'Heading — start of second line', 'smartshala' ),
					'default' => 'Trusted by',
				),
				array(
					'id'      => 'heading_highlight',
					'type'    => 'text',
					'label'   => __( 'Heading — highlighted end', 'smartshala' ),
					'default' => 'Leaders.',
				),
				array(
					'id'      => 'subheading',
					'type'    => 'text',
					'label'   => __( 'Sub-heading', 'smartshala' ),
					'default' => 'See what school leaders have to say about SmartShala.',
				),

				array(
					'id'        => 'items',
					'type'      => 'repeater',
					'label'     => __( 'Testimonials', 'smartshala' ),
					'help'      => __( 'Leave the photo empty to use the built-in portrait for that position.', 'smartshala' ),
					'row_label' => 'name',
					'add_label' => __( 'Add testimonial', 'smartshala' ),
					'fields'    => array(
						array( 'id' => 'photo', 'type' => 'image', 'label' => __( 'Photo', 'smartshala' ) ),
						array( 'id' => 'name', 'type' => 'text', 'label' => __( 'Name', 'smartshala' ) ),
						array( 'id' => 'role', 'type' => 'text', 'label' => __( 'Role', 'smartshala' ), 'default' => 'Principal' ),
						array( 'id' => 'rating', 'type' => 'text', 'label' => __( 'Stars', 'smartshala' ), 'default' => '5' ),
						array( 'id' => 'quote', 'type' => 'textarea', 'label' => __( 'Quote', 'smartshala' ) ),
						array( 'id' => 'school', 'type' => 'text', 'label' => __( 'School', 'smartshala' ) ),
						array( 'id' => 'location', 'type' => 'text', 'label' => __( 'Location', 'smartshala' ) ),
					),
					'default'   => array(
						array(
							'name'     => 'Mrs. Anjali Sharma',
							'role'     => 'Principal',
							'rating'   => '5',
							'quote'    => 'SmartShala has simplified how we manage our school. It saves time, reduces paperwork and helps us focus on what truly matters – students.',
							'school'   => '',
							'location' => 'Jaipur, Rajasthan',
						),
						array(
							'name'     => 'Mr. Rajiv Mehta',
							'role'     => 'Principal',
							'rating'   => '5',
							'quote'    => 'The fee management and real-time reports are excellent. Communication with parents has never been easier and more effective.',
							'school'   => '',
							'location' => 'Bengaluru, Karnataka',
						),
						array(
							'name'     => 'Dr. Neha Kapoor',
							'role'     => 'Principal',
							'rating'   => '5',
							'quote'    => 'SmartShala is user-friendly, reliable and packed with everything a modern school needs. Highly recommended for every school leader.',
							'school'   => '',
							'location' => 'Lucknow, Uttar Pradesh',
						),
					),
				),
			),
		),

		/* ---------------------------------------------------------------
		 * 09 — FAQ
		 * ------------------------------------------------------------- */
		array(
			'id'          => 'faq',
			'label'       => __( 'FAQ', 'smartshala' ),
			'description' => __( 'The accordion. The first item is open by default, as in the design.', 'smartshala' ),
			'fields'      => array(

				array( 'id' => 'eyebrow', 'type' => 'text', 'label' => __( 'Eyebrow pill', 'smartshala' ), 'default' => 'Frequently Asked Questions' ),
				array( 'id' => 'eyebrow_icon', 'type' => 'icon', 'label' => __( 'Eyebrow icon', 'smartshala' ), 'default' => 'circle-help' ),
				array( 'id' => 'heading_line_1', 'type' => 'text', 'label' => __( 'Heading — first line', 'smartshala' ), 'default' => 'Everything You Need to Know' ),
				array( 'id' => 'heading_line_2', 'type' => 'text', 'label' => __( 'Heading — start of second line', 'smartshala' ), 'default' => 'About' ),
				array( 'id' => 'heading_highlight', 'type' => 'text', 'label' => __( 'Heading — highlighted end', 'smartshala' ), 'default' => 'SmartShala.' ),
				array( 'id' => 'subheading', 'type' => 'text', 'label' => __( 'Sub-heading', 'smartshala' ), 'default' => 'Quick answers to the most common questions from schools.' ),

				array(
					'id'        => 'items',
					'type'      => 'repeater',
					'label'     => __( 'Questions', 'smartshala' ),
					'help'      => __( 'Only the first answer appears in the client design — the rest are placeholders and need real copy.', 'smartshala' ),
					'row_label' => 'question',
					'add_label' => __( 'Add question', 'smartshala' ),
					'fields'    => array(
						array( 'id' => 'icon', 'type' => 'icon', 'label' => __( 'Icon', 'smartshala' ) ),
						array( 'id' => 'question', 'type' => 'text', 'label' => __( 'Question', 'smartshala' ) ),
						array( 'id' => 'answer', 'type' => 'textarea', 'label' => __( 'Answer', 'smartshala' ) ),
					),
					'default'   => array(
						array(
							'icon'     => 'school',
							'question' => 'What is SmartShala?',
							'answer'   => 'SmartShala is a comprehensive school management software that helps schools automate administration, improve communication and manage everything in one place.',
						),
						array(
							'icon'     => 'users',
							'question' => 'Who can use SmartShala?',
							'answer'   => 'SmartShala is built for K-12 schools of every size — CBSE, ICSE, IB and State board, whether you run a single campus or a group of branches. Each person signs in to a role-based view: administrators and principals see school-wide operations, teachers manage attendance, marks and classwork, accountants handle fees and receipts, and parents and students get their own portal for updates, results and payments.',
						),
						array(
							'icon'     => 'shield-check',
							'question' => 'Is my data safe and secure?',
							'answer'   => 'Yes. Your school\'s data is hosted on secure servers in India, encrypted with SSL in transit and at rest, and backed up automatically every day. Role-based permissions mean staff only see what their role allows, every action is logged for audit, and we maintain 99.9% uptime. Your data belongs to your school and can be exported at any time.',
						),
						array(
							'icon'     => 'smartphone',
							'question' => 'Can I access SmartShala on mobile?',
							'answer'   => 'Yes. SmartShala works in any modern browser on phone, tablet or desktop, and there are dedicated mobile apps for parents, teachers and students. Parents can check attendance, results, fee dues and announcements and pay online; teachers can mark attendance and enter marks from the classroom without returning to a computer.',
						),
						array(
							'icon'     => 'credit-card',
							'question' => 'How does the billing and pricing work?',
							'answer'   => 'Pricing is a simple annual subscription based on your student count, with every core module included — no per-module upsells, no setup fee and no separate hosting or server charges. Data migration, configuration and staff training are part of onboarding. Book a free demo and we\'ll share an exact quote for your school.',
						),
						array(
							'icon'     => 'headset',
							'question' => 'Do you provide training and support?',
							'answer'   => 'Every school gets guided onboarding: we migrate your existing student, staff and fee records, configure classes, sections and fee structures, and run hands-on training for your team. After go-live, a dedicated support team is available 24/7 by phone, email and WhatsApp, and free updates land automatically as new features ship.',
						),
					),
				),
			),
		),

		/* ---------------------------------------------------------------
		 * 10 — Final CTA
		 * ------------------------------------------------------------- */
		array(
			'id'          => 'final_cta',
			'label'       => __( 'Final CTA', 'smartshala' ),
			'description' => __( 'The closing call to action above the footer.', 'smartshala' ),
			'fields'      => array(

				array( 'id' => 'eyebrow', 'type' => 'text', 'label' => __( 'Eyebrow pill', 'smartshala' ), 'default' => 'Smarter Administration. Stronger Schools.' ),
				array( 'id' => 'eyebrow_icon', 'type' => 'icon', 'label' => __( 'Eyebrow icon', 'smartshala' ), 'default' => 'sparkles' ),
				array( 'id' => 'line_1_plain', 'type' => 'text', 'label' => __( 'Line 1 — black', 'smartshala' ), 'default' => 'Ready To' ),
				array( 'id' => 'line_1_blue', 'type' => 'text', 'label' => __( 'Line 1 — blue', 'smartshala' ), 'default' => 'Modernise' ),
				array( 'id' => 'line_2_plain', 'type' => 'text', 'label' => __( 'Line 2 — black', 'smartshala' ), 'default' => 'Your' ),
				array( 'id' => 'line_2_blue', 'type' => 'text', 'label' => __( 'Line 2 — blue', 'smartshala' ), 'default' => 'School?' ),
				array(
					'id'      => 'subheading',
					'type'    => 'textarea',
					'label'   => __( 'Sub-heading', 'smartshala' ),
					'default' => 'Join thousands of schools already using SmartShala to save time, reduce paperwork and focus on what matters most — students.',
				),

				array(
					'id'     => 'cta',
					'type'   => 'group',
					'label'  => __( 'Button', 'smartshala' ),
					'fields' => array(
						array( 'id' => 'label', 'type' => 'text', 'label' => __( 'Label', 'smartshala' ), 'default' => 'Book Free Demo' ),
						array( 'id' => 'url', 'type' => 'url', 'label' => __( 'Links to', 'smartshala' ), 'default' => '/book-demo' ),
					),
				),

				array(
					'id'        => 'trust_items',
					'type'      => 'repeater',
					'label'     => __( 'Trust strip', 'smartshala' ),
					'row_label' => 'label',
					'add_label' => __( 'Add item', 'smartshala' ),
					'fields'    => array(
						array( 'id' => 'icon', 'type' => 'icon', 'label' => __( 'Icon', 'smartshala' ) ),
						array( 'id' => 'label', 'type' => 'text', 'label' => __( 'Label', 'smartshala' ) ),
					),
					'default'   => array(
						array( 'icon' => 'shield-check', 'label' => 'Secure. Reliable.' ),
						array( 'icon' => 'cloud',        'label' => 'Cloud Based' ),
						array( 'icon' => 'headset',      'label' => '24/7 Support' ),
						array( 'icon' => 'users',        'label' => 'Trusted by 1000+ Schools' ),
					),
				),
			),
		),

		/* ---------------------------------------------------------------
		 * 11 — Footer
		 * ------------------------------------------------------------- */
		array(
			'id'          => 'footer',
			'label'       => __( 'Footer', 'smartshala' ),
			'description' => __( 'The link columns, contact details, closing CTA band and copyright.', 'smartshala' ),
			'fields'      => array(

				array( 'id' => 'brand_name', 'type' => 'text', 'label' => __( 'Wordmark', 'smartshala' ), 'default' => 'SmartShala' ),
				array( 'id' => 'headline', 'type' => 'text', 'label' => __( 'Headline', 'smartshala' ), 'default' => 'Modern Schools Choose SmartShala.' ),
				array( 'id' => 'tagline', 'type' => 'text', 'label' => __( 'Tagline', 'smartshala' ), 'default' => 'Manage your entire school from one intelligent platform.' ),

				array(
					'id'        => 'modules',
					'type'      => 'repeater',
					'label'     => __( 'Module list', 'smartshala' ),
					'help'      => __( 'The dot-separated line under the tagline.', 'smartshala' ),
					'row_label' => 'label',
					'add_label' => __( 'Add module', 'smartshala' ),
					'fields'    => array(
						array( 'id' => 'label', 'type' => 'text', 'label' => __( 'Label', 'smartshala' ) ),
					),
					'default'   => array(
						array( 'label' => 'Attendance' ),
						array( 'label' => 'Fees' ),
						array( 'label' => 'Students' ),
						array( 'label' => 'Exams' ),
						array( 'label' => 'Reports' ),
						array( 'label' => 'Communication' ),
					),
				),

				array(
					'id'     => 'col_product',
					'type'   => 'group',
					'label'  => __( 'Column 1', 'smartshala' ),
					'fields' => array(
						array( 'id' => 'title', 'type' => 'text', 'label' => __( 'Title', 'smartshala' ), 'default' => 'Product' ),
						array(
							'id'        => 'links',
							'type'      => 'repeater',
							'label'     => __( 'Links', 'smartshala' ),
							'row_label' => 'label',
							'add_label' => __( 'Add link', 'smartshala' ),
							'fields'    => array(
								array( 'id' => 'label', 'type' => 'text', 'label' => __( 'Label', 'smartshala' ) ),
								array( 'id' => 'url', 'type' => 'url', 'label' => __( 'Links to', 'smartshala' ), 'default' => '#' ),
							),
							'default'   => array(
								array( 'label' => 'Features', 'url' => '/features' ),
								array( 'label' => 'Attendance', 'url' => '/features' ),
								array( 'label' => 'Fee Management', 'url' => '/features' ),
								array( 'label' => 'Reports', 'url' => '/features' ),
							),
						),
					),
				),

				array(
					'id'     => 'col_company',
					'type'   => 'group',
					'label'  => __( 'Column 2', 'smartshala' ),
					'fields' => array(
						array( 'id' => 'title', 'type' => 'text', 'label' => __( 'Title', 'smartshala' ), 'default' => 'Company' ),
						array(
							'id'        => 'links',
							'type'      => 'repeater',
							'label'     => __( 'Links', 'smartshala' ),
							'row_label' => 'label',
							'add_label' => __( 'Add link', 'smartshala' ),
							'fields'    => array(
								array( 'id' => 'label', 'type' => 'text', 'label' => __( 'Label', 'smartshala' ) ),
								array( 'id' => 'url', 'type' => 'url', 'label' => __( 'Links to', 'smartshala' ), 'default' => '#' ),
							),
							'default'   => array(
								array( 'label' => 'About', 'url' => '/about' ),
								array( 'label' => 'Book Demo', 'url' => '/book-demo' ),
								array( 'label' => 'Contact', 'url' => '/contact' ),
							),
						),
					),
				),

				array(
					'id'     => 'col_resources',
					'type'   => 'group',
					'label'  => __( 'Column 3', 'smartshala' ),
					'fields' => array(
						array( 'id' => 'title', 'type' => 'text', 'label' => __( 'Title', 'smartshala' ), 'default' => 'Resources' ),
						array(
							'id'        => 'links',
							'type'      => 'repeater',
							'label'     => __( 'Links', 'smartshala' ),
							'row_label' => 'label',
							'add_label' => __( 'Add link', 'smartshala' ),
							'fields'    => array(
								array( 'id' => 'label', 'type' => 'text', 'label' => __( 'Label', 'smartshala' ) ),
								array( 'id' => 'url', 'type' => 'url', 'label' => __( 'Links to', 'smartshala' ), 'default' => '#' ),
							),
							'default'   => array(
								array( 'label' => 'Blog', 'url' => '/blog' ),
								array( 'label' => 'FAQs', 'url' => '/faqs' ),
								array( 'label' => 'Privacy Policy', 'url' => '/privacy' ),
								array( 'label' => 'Terms', 'url' => '/terms' ),
							),
						),
					),
				),

				array(
					'id'     => 'contact',
					'type'   => 'group',
					'label'  => __( 'Contact column', 'smartshala' ),
					'fields' => array(
						array( 'id' => 'title', 'type' => 'text', 'label' => __( 'Title', 'smartshala' ), 'default' => 'Contact' ),
						array( 'id' => 'phone', 'type' => 'text', 'label' => __( 'Phone', 'smartshala' ), 'default' => '+91 98765 43210' ),
						array( 'id' => 'email', 'type' => 'text', 'label' => __( 'Email', 'smartshala' ), 'default' => 'support@letssmartshala.com' ),
						array( 'id' => 'website', 'type' => 'text', 'label' => __( 'Website', 'smartshala' ), 'default' => 'www.letssmartshala.com' ),
						array( 'id' => 'company', 'type' => 'text', 'label' => __( 'Legal name', 'smartshala' ), 'default' => 'Hybrid Monks LLP' ),
						array( 'id' => 'address', 'type' => 'text', 'label' => __( 'Address', 'smartshala' ), 'default' => 'Ahmedabad, Gujarat, India – 380015' ),
					),
				),

				array(
					'id'     => 'cta_band',
					'type'   => 'group',
					'label'  => __( 'Closing CTA band', 'smartshala' ),
					'fields' => array(
						array( 'id' => 'icon', 'type' => 'icon', 'label' => __( 'Icon', 'smartshala' ), 'default' => 'school' ),
						array( 'id' => 'title', 'type' => 'text', 'label' => __( 'Title', 'smartshala' ), 'default' => 'Ready to Digitize Your School?' ),
						array( 'id' => 'description', 'type' => 'textarea', 'label' => __( 'Description', 'smartshala' ), 'default' => 'See how SmartShala can simplify operations and help your school grow.' ),
						array( 'id' => 'primary_label', 'type' => 'text', 'label' => __( 'Primary button', 'smartshala' ), 'default' => 'Book Free Demo' ),
						array( 'id' => 'primary_url', 'type' => 'url', 'label' => __( 'Primary link', 'smartshala' ), 'default' => '/book-demo' ),
						array( 'id' => 'secondary_label', 'type' => 'text', 'label' => __( 'Secondary button', 'smartshala' ), 'default' => 'Schedule a Call' ),
						array( 'id' => 'secondary_url', 'type' => 'url', 'label' => __( 'Secondary link', 'smartshala' ), 'default' => '/contact' ),
						array( 'id' => 'secondary_icon', 'type' => 'icon', 'label' => __( 'Secondary icon', 'smartshala' ), 'default' => 'phone' ),
					),
				),

				array(
					'id'      => 'copyright',
					'type'    => 'text',
					'label'   => __( 'Copyright line', 'smartshala' ),
					'default' => '@2026 Smart Shala (Product by Hybrid Monks LLP), All Rights Reserved',
				),

				array(
					'id'        => 'socials',
					'type'      => 'repeater',
					'label'     => __( 'Social links', 'smartshala' ),
					'help'      => __( 'Each icon is hidden until its link is filled in — an icon pointing at "#" would be a dead button. Paste your full profile URLs here.', 'smartshala' ),
					'row_label' => 'icon',
					'add_label' => __( 'Add social', 'smartshala' ),
					'fields'    => array(
						array( 'id' => 'icon', 'type' => 'icon', 'label' => __( 'Icon', 'smartshala' ) ),
						array( 'id' => 'url', 'type' => 'url', 'label' => __( 'Links to', 'smartshala' ), 'default' => '#' ),
					),
					'default'   => array(
						array( 'icon' => 'linkedin',  'url' => '#' ),
						array( 'icon' => 'facebook',  'url' => '#' ),
						array( 'icon' => 'instagram', 'url' => '#' ),
						array( 'icon' => 'youtube',   'url' => '#' ),
					),
				),
			),
		),
	),
);
