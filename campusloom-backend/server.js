const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const Razorpay = require('razorpay');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Set up the Nodemailer transporter using environment variables
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_SECURE === 'true', // true for 465, false for 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Verify SMTP connection on startup
transporter.verify((error, success) => {
  if (error) {
    console.error('SMTP Connection Error:', error);
  } else {
    console.log('Server is ready to take our messages (SMTP connected).');
  }
});

app.post('/api/contact', async (req, res) => {
  const { name, email, institution, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Name, email, and message are required.' });
  }

  try {
    const mailOptions = {
      from: `"${name}" <${process.env.SMTP_USER}>`, // Must send from authenticated email to avoid spam blocks
      replyTo: email,
      to: process.env.RECEIVER_EMAIL || process.env.SMTP_USER,
      subject: `New Lead: ${institution || 'SmartShala Website'}`,
      text: `
You have received a new lead from the SmartShala website!

Name: ${name}
Email: ${email}
Institution: ${institution || 'N/A'}

Message:
${message}
      `,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send message. Please check server logs.' });
  }
});

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Razorpay Order Creation Endpoint
app.post('/api/create-order', async (req, res) => {
  try {
    const { amount, currency = "USD", notes = {} } = req.body;
    
    // Create an order in Razorpay
    const options = {
      amount: amount * 100, // Razorpay expects amount in smallest currency subunit (e.g. cents)
      currency,
      receipt: `rcpt_${Date.now()}`,
      notes
    };

    const order = await razorpay.orders.create(options);
    
    if (!order) {
      return res.status(500).send("Some error occured while creating Razorpay order");
    }

    res.json(order);
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    res.status(500).json({ error: "Failed to create order" });
  }
});

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`SmartShala Backend server running on http://localhost:${PORT}`);
  });
}

// Export the Express API for Vercel Serverless Functions
module.exports = app;
