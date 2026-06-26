import React from 'react';
import { Link } from 'react-router-dom';
import { useContent } from '../../context/ContentContext';
import { motion } from 'framer-motion';

export default function PricingSection() {
  const { content } = useContent();
  
  // Hide section if the toggle is checked in the CMS
  if (content?.extraData?.pr_hide === '1') {
    return null;
  }
  
  const allPlans = content?.pricingPlans || [];
  const [paymentResult, setPaymentResult] = React.useState({ show: false, success: false, data: null });
  const [registrationModal, setRegistrationModal] = React.useState({ show: false, plan: null });
  const [formData, setFormData] = React.useState({ name: '', email: '', phone: '', institution: '' });

  const handlePlanClick = (e, plan) => {
    if (plan.paymentLink && plan.paymentLink.startsWith('#test-mode')) {
      e.preventDefault();
      setRegistrationModal({ show: true, plan });
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const plan = registrationModal.plan;
    setRegistrationModal({ show: false, plan: null });
    
    const priceNumeric = parseInt(plan.price.replace(/[^0-9]/g, ''), 10);
    
    try {
      const apiUrl = import.meta.env.VITE_API_URL || '';
      const endpoint = apiUrl ? `${apiUrl}/api/create-order` : '/api/create-order';
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          amount: priceNumeric, 
          currency: 'INR',
          notes: {
            Name: formData.name,
            Email: formData.email,
            Phone: formData.phone,
            Institution: formData.institution
          }
        })
      });
      
      const order = await res.json();
      if (!order || order.error) throw new Error("Failed to create order");
      
      const options = {
        key: "rzp_test_T64bTqIYNC9jG5",
        amount: order.amount,
        currency: order.currency,
        name: "SmartShala",
        description: `${plan.name} Plan Subscription`,
        order_id: order.id,
        handler: function (response) {
          setPaymentResult({ show: true, success: true, data: response });
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone
        },
        theme: {
          color: "#000000"
        }
      };
      
      const rzp1 = new window.Razorpay(options);
      rzp1.on('payment.failed', function (response){
        setPaymentResult({ show: true, success: false, data: response.error });
      });
      rzp1.open();

    } catch (err) {
      console.error(err);
      setPaymentResult({ show: true, success: false, data: { description: "Failed to initialize payment gateway. Please ensure the backend is running." } });
    }
  };
  
  // Render all plans dynamically
  const regularPlans = allPlans;

  return (
    <section id="pricing" style={{ background: '#fff', padding: '70px 0' }}>
      <div className="container-main">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {regularPlans.map((plan, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, delay: i * 0.15 }} whileHover={{ scale: 1.02, boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }} style={{ 
              background: '#F9FAFB', 
              borderRadius: 24, 
              padding: 48,
              height: '100%'
            }}>
              <h3 style={{ fontSize: 24, fontWeight: 700, color: '#1A1A1A', marginBottom: 12 }}>{plan.name}</h3>
              <p style={{ fontSize: 16, color: '#6B6B6B', marginBottom: 32, lineHeight: 1.6 }}>{plan.desc}</p>
              <div style={{ marginBottom: 32, display: 'flex', alignItems: 'baseline' }}>
                <span style={{ fontSize: 48, fontWeight: 800, color: '#1A1A1A', fontFamily: "'Bricolage Grotesque'", letterSpacing: '-0.03em' }}>{plan.price}</span>
                <span style={{ fontSize: 16, color: '#6B6B6B' }}>/Months</span>
              </div>
              <a href={plan.paymentLink || "/#contact"} onClick={(e) => handlePlanClick(e, plan)} target={plan.paymentLink?.startsWith('http') ? "_blank" : "_self"} rel="noreferrer" style={{
                display: 'block', textAlign: 'center', padding: '18px 0',
                background: '#000', color: '#fff', borderRadius: 100,
                fontWeight: 600, fontSize: 16, textDecoration: 'none',
                transition: 'transform 0.15s', marginBottom: 40,
              }}
                onMouseEnter={e => e.target.style.transform = 'scale(1.02)'}
                onMouseLeave={e => e.target.style.transform = 'scale(1)'}
              >
                <span className="btn-text-wrapper">
                  <span className="btn-text-visible">{content?.extraData?.pr_btn1 || 'Get Started'}</span>
                  <span className="btn-text-hidden">{content?.extraData?.pr_btn1 || 'Get Started'}</span>
                </span>
              </a>
              <p style={{ fontSize: 16, fontWeight: 600, color: '#1A1A1A', marginBottom: 24 }}>Included features:</p>
              {plan.features.map((f, j) => (
                <div key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 20, fontSize: 15, color: '#6B6B6B' }}>
                  <span style={{ color: '#3B82F6', fontWeight: 700, fontSize: 16, marginTop: -2 }}>#</span>
                  {f}
                </div>
              ))}
            </motion.div>
          ))}
        </div>

        {/* Enterprise / Custom Plan CTA */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, delay: 0.2 }} className="bg-black rounded-3xl p-8 md:p-12 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          <div>
            <h3 style={{ fontSize: 24, fontWeight: 700, color: '#fff', marginBottom: 12 }}>{content?.extraData?.pr_cta_t || 'Custom Solution'}</h3>
            <p style={{ fontSize: 16, color: '#999', maxWidth: 600, lineHeight: 1.6 }}>{content?.extraData?.pr_cta_s || 'Looking for a highly customizable CRM solution for a large organization? Contact us for a tailored package.'}</p>
          </div>
          <a href="/#contact" style={{
            display: 'inline-block', padding: '16px 40px',
            background: '#fff', color: '#000', borderRadius: 100,
            fontWeight: 600, fontSize: 16, textDecoration: 'none',
          }}>
            <span className="btn-text-wrapper">
              <span className="btn-text-visible">{content?.extraData?.pr_btn2 || 'Contact Us'}</span>
              <span className="btn-text-hidden">{content?.extraData?.pr_btn2 || 'Contact Us'}</span>
            </span>
          </a>
        </motion.div>
      </div>

      {/* Pre-Checkout Registration Modal */}
      {registrationModal.show && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ background: '#fff', borderRadius: 24, padding: 40, maxWidth: 450, width: '90%', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h3 style={{ fontSize: 24, fontWeight: 700, color: '#1A1A1A', margin: 0 }}>Almost there!</h3>
              <button onClick={() => setRegistrationModal({ show: false, plan: null })} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#999' }}>
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <p style={{ color: '#6B6B6B', marginBottom: 24, fontSize: 15 }}>Please provide your institution details to continue to the secure checkout for the <strong>{registrationModal.plan.name} Plan</strong>.</p>
            
            <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <input type="text" required placeholder="Full Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} style={{ width: '100%', padding: '12px 16px', borderRadius: 8, border: '1px solid #E5E7EB', fontSize: 15 }} />
              <input type="email" required placeholder="Email Address" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} style={{ width: '100%', padding: '12px 16px', borderRadius: 8, border: '1px solid #E5E7EB', fontSize: 15 }} />
              <input type="tel" required placeholder="Phone Number" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} style={{ width: '100%', padding: '12px 16px', borderRadius: 8, border: '1px solid #E5E7EB', fontSize: 15 }} />
              <input type="text" required placeholder="Institution Name" value={formData.institution} onChange={e => setFormData({...formData, institution: e.target.value})} style={{ width: '100%', padding: '12px 16px', borderRadius: 8, border: '1px solid #E5E7EB', fontSize: 15 }} />
              
              <button type="submit" style={{ background: '#1A1A1A', color: '#fff', padding: '14px', borderRadius: 100, fontWeight: 600, width: '100%', cursor: 'pointer', border: 'none', marginTop: 8 }}>
                Proceed to Payment
              </button>
            </form>
          </motion.div>
        </div>
      )}

      {/* Payment Result Modal */}
      {paymentResult.show && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ background: '#fff', borderRadius: 24, padding: 40, maxWidth: 400, width: '90%', textAlign: 'center', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}>
            
            <div style={{ 
              width: 64, height: 64, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px',
              background: paymentResult.success ? '#ECFDF5' : '#FEF2F2', 
              color: paymentResult.success ? '#10B981' : '#EF4444' 
            }}>
              {paymentResult.success ? (
                <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              ) : (
                <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              )}
            </div>

            <h3 style={{ fontSize: 24, fontWeight: 700, marginBottom: 12, color: '#1A1A1A' }}>
              {paymentResult.success ? 'Payment Successful!' : 'Payment Failed'}
            </h3>
            
            <p style={{ color: '#6B6B6B', marginBottom: 24, lineHeight: 1.5, fontSize: 15 }}>
              {paymentResult.success ? (
                <>
                  Thank you for your purchase. Your subscription is now active.<br/><br/>
                  <span style={{ fontSize: 13, color: '#999' }}>Transaction ID: {paymentResult.data.razorpay_payment_id}</span>
                </>
              ) : (
                paymentResult.data?.description || "An unexpected error occurred."
              )}
            </p>

            <button onClick={() => setPaymentResult({ show: false, success: false, data: null })} style={{ background: '#1A1A1A', color: '#fff', padding: '12px 24px', borderRadius: 100, fontWeight: 600, width: '100%', cursor: 'pointer', border: 'none' }}>
              {paymentResult.success ? 'Continue to Dashboard' : 'Try Again'}
            </button>
          </motion.div>
        </div>
      )}

    </section>
  );
}
