export const defaultContent = {
  pricingPlans: [
    {
      name: "Basic",
      desc: "Perfect for small institutions getting started.",
      price: "₹3,999",
      features: ["Up to 500 Students", "Basic Reporting", "Email Support", "Core Modules"],
      paymentLink: "#test-mode-basic"
    },
    {
      name: "Pro",
      desc: "Ideal for growing schools with advanced needs.",
      price: "₹7,999",
      features: ["Up to 2000 Students", "Advanced Analytics", "Priority Support", "Custom Branding", "SMS Alerts"],
      paymentLink: "#test-mode-pro"
    },
    {
      name: "Enterprise",
      desc: "Full suite for large school districts.",
      price: "₹15,999",
      features: ["Unlimited Students", "Dedicated Account Manager", "API Access", "Custom Integrations", "On-site Training"],
      paymentLink: "#contact" // Enterprise usually requires contacting sales, not direct payment
    }
  ],
  faqs: [
    {
      q: "How long does it take to deploy Campus Loom?",
      a: "Setup typically takes less than 48 hours. Our onboarding team will assist you with data migration and initial configuration to ensure a smooth transition."
    },
    {
      q: "Is my data secure?",
      a: "Absolutely. We use bank-level encryption, regular backups, and strict access controls to ensure all student and administrative data remains highly secure and compliant with local regulations."
    },
    {
      q: "Can parents access the system?",
      a: "Yes! We provide a dedicated parent portal where they can track attendance, grades, pay fees, and receive instant notifications."
    },
    {
      q: "Do you offer customer support?",
      a: "We offer 24/7 email support for all plans, and priority phone/chat support for our Pro and Enterprise tiers."
    }
  ],
  workflowTabs: [
    { label: "Attendance", title: "Automated Attendance Tracking", desc: "Easily mark attendance using RFID or mobile apps. Instantly notify parents of absentees." },
    { label: "Fees", title: "Smart Fee Management", desc: "Automate fee collection, send reminders, and track financial reports with zero manual effort." },
    { label: "Exams", title: "Comprehensive Grading", desc: "Generate report cards instantly with custom grading systems and automated percentage calculations." },
    { label: "Comms", title: "Instant Communication", desc: "Send bulk SMS, emails, and in-app notifications to parents, staff, and students in one click." }
  ],
  hero: {
    title1: "The modern solutions to run your institution.",
    title2: "Empower your school with Campus Loom.",
    subtitle: "Streamline operations, boost engagement, and simplify administration with our all-in-one platform.",
    btn1: "Book a Demo",
    btn2: "Explore Features",
    subtext: "Trusted by over 500+ top educational institutions.",
    imgLeft: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&h=800&fit=crop",
    imgRight: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=600&h=800&fit=crop",
    leftCard: { title: "Total Enrolled", num: "1,829", badge: "↑ 15%" },
    rightCard: { title: "Fee Balance", num: "₹5,56,897", legend1: "Collected", legend2: "Pending" }
  },
  features: [
    { title: "Smarter Academic Management", desc: "Easily track academic performance, manage classes, and generate automatic reports." },
    { title: "Simplified Fee Collection", desc: "Automate fee structures, send reminders, and securely accept online payments." }
  ],
  stats: [
    { value: "10k+", label: "Active Students", desc: "Currently managed using our intuitive platform every single day." },
    { value: "98%", label: "Parent Satisfaction", desc: "High engagement rates through our dedicated mobile applications." },
    { value: "500+", label: "Institutions", desc: "Trust Campus Loom to run their entire administrative backend." }
  ],
  extraData: {
    hero_btn1: "Book a Demo",
    hero_btn2: "Explore Features",
    hero_sub: "Trusted by over 500+ top educational institutions.",
    
    feat1_l1: "Academic Performance",
    feat1_l2: "72%",
    feat1_l3: "Class Average",
    
    sf_title: "Excellence by the numbers.",
    sf_sub: "Easily visualize your institution's growth and daily operations through intuitive dashboards.",
    
    pr_btn1: "Get Started",
    pr_hide: "0",
    
    faq_t: "Got questions?<br/>We've got answers.",
    faq_s: "Everything you need to know about Campus Loom.",
    
    cta_t: "Ready to modernize your campus?",
    cta_s: "Join hundreds of schools already using Campus Loom to streamline their operations.",
    cta_btn2: "Contact Sales",
    cta_ft: "No credit card required. Cancel at anytime.",
    
    c_email: "hello@campusloom.com",
    c_phone: "+1 (555) 123-4567",
    c_address: "123 Innovation Drive, Tech City, TC 90210"
  }
};
