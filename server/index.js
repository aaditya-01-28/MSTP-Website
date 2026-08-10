require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' })); // Increased limit for Base64 images
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Debug
console.log("MONGO_URI VALUE ", process.env.MONGO_URI);

const seedDatabase = require('./seedData');

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    seedDatabase();
  })
  .catch(err => console.log("DB Error:", err));

// Schema
const Contact = require('./models/Contact');

// Nodemailer Transporter Configuration
const cleanEmailPass = (process.env.EMAIL_PASS || '').replace(/^["']|["']$/g, '').trim();
const cleanEmailUser = (process.env.EMAIL_USER || '').trim();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: cleanEmailUser,
    pass: cleanEmailPass
  }
});

const HR_EMAIL = process.env.EMAIL_USER;

// Helper function to send email notification to HR and confirmation to User
const sendEmails = async (res, userEmail, userName, hrSubject, hrBody, userSubject, userBody, successMessage) => {
  try {
    // 1. Send notification to HR
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: HR_EMAIL,
      subject: hrSubject,
      text: hrBody
    });

    // 2. Send confirmation to User
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: userSubject,
      text: userBody
    });

    res.status(200).json({ message: successMessage });
  } catch (error) {
    console.error('Email sending error:', error);
    res.status(500).json({ error: 'Failed to send email. Please try again later.' });
  }
};

// Admin Authentication Setup
const Admin = require('./models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 1. Contact Form Endpoint
app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }

  try {
    const newContact = new Contact({ name, email, subject, message });
    await newContact.save();
    console.log("Saved to DB");

    const hrSubject = `New Contact Query: ${subject || 'General Inquiry'}`;
    const hrBody = `You have received a new contact submission.\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`;
    
    const userSubject = 'We have received your message - WhiteCircle Group';
    const userBody = `Hi ${name},\n\nThank you for reaching out to us. We have received your message and our team will get back to you shortly.\n\nBest regards,\nWhiteCircle Group`;

    await sendEmails(res, email, name, hrSubject, hrBody, userSubject, userBody, 'Saved to MongoDB and emails sent. Thank you for reaching out!');
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Database or Email error ❌' });
  }
});

// Consultation Schema
const Consultation = require('./models/Consultation');

// 2. Book Consultation Endpoint
app.post('/api/book', async (req, res) => {
  const { name, email, phone, company, date, service, subject, requirements } = req.body;
  const selectedService = service || subject || 'General Consultation';

  if (!name || !email || !phone) {
    return res.status(400).json({ error: 'Name, email, and phone number are required.' });
  }

  try {
    const newConsultation = new Consultation({
      name,
      email,
      phone,
      company: company || '',
      service: selectedService,
      date: date || new Date().toISOString().split('T')[0],
      requirements: requirements || ''
    });
    await newConsultation.save();
    console.log("Consultation saved to DB");

    const hrSubject = `New Consultation Booking: ${selectedService} from ${name}`;
    const hrBody = `New consultancy booking received.\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nCompany: ${company || 'N/A'}\nService: ${selectedService}\nPreferred Date: ${date || 'Flexible'}\nRequirements: ${requirements || 'None'}`;
    
    const userSubject = 'Consultation Booking Confirmation - WhiteCircle Group';
    const userBody = `Hi ${name},\n\nYour consultation booking for "${selectedService}" has been received. Our team will review your request and contact you shortly to confirm the time.\n\nBest regards,\nWhiteCircle Group`;

    await sendEmails(res, email, name, hrSubject, hrBody, userSubject, userBody, 'Your consultation has been booked successfully! We will contact you soon.');
  } catch (error) {
    console.error('Error saving consultation:', error);
    res.status(500).json({ error: 'Database or Email error ❌' });
  }
});

// Application Schema
const Application = require('./models/Application');

// 3. Careers Apply Endpoint
app.post('/api/apply', async (req, res) => {
  const { 
    jobTitle, jobId, firstName, lastName, email, 
    countryCode, phone, country, city, 
    resumeName, coverLetter, githubUrl, linkedinUrl 
  } = req.body;

  if (!firstName || !lastName || !email || !phone || !country || !city || !jobTitle) {
    return res.status(400).json({ error: 'First Name, Last Name, Email, Phone, Country, City, and Job Title are required.' });
  }

  try {
    // 1. Save to Database
    const newApp = new Application({
      jobTitle,
      jobId,
      firstName,
      lastName,
      email,
      countryCode: countryCode || '+91',
      phone,
      country,
      city,
      resumeName: resumeName || 'Resume.pdf',
      coverLetter,
      githubUrl,
      linkedinUrl
    });

    await newApp.save();
    console.log("Job Application saved to DB:", firstName, lastName, jobTitle);

    // 2. Prepare Emails
    const candidateName = `${firstName} ${lastName}`;
    const fullPhone = `${countryCode || '+91'} ${phone}`;

    const hrSubject = `New Job Application: ${jobTitle} from ${candidateName}`;
    const hrBody = `You have received a new job application.\n\n` +
      `Position: ${jobTitle} (ID: ${jobId || 'N/A'})\n` +
      `Candidate Name: ${candidateName}\n` +
      `Email: ${email}\n` +
      `Phone: ${fullPhone}\n` +
      `Location: ${city}, ${country}\n` +
      `Resume File: ${resumeName || 'Attached/Uploaded'}\n` +
      `GitHub: ${githubUrl || 'N/A'}\n` +
      `LinkedIn: ${linkedinUrl || 'N/A'}\n` +
      `Cover Letter: ${coverLetter || 'N/A'}\n\n` +
      `Applied Date: ${new Date().toLocaleString()}`;

    const userSubject = `Application Received: ${jobTitle} - MAATRSHRI Group`;
    const userBody = `Dear ${candidateName},\n\n` +
      `Thank you for applying for the ${jobTitle} position at MAATRSHRI Group.\n\n` +
      `We have successfully received your application. Our talent acquisition team will carefully review your qualifications and contact you if your profile matches our requirements.\n\n` +
      `Application Summary:\n` +
      `- Position: ${jobTitle}\n` +
      `- Name: ${candidateName}\n` +
      `- Email: ${email}\n` +
      `- Contact: ${fullPhone}\n` +
      `- Location: ${city}, ${country}\n\n` +
      `Best regards,\n` +
      `HR & Recruitment Team\n` +
      `MAATRSHRI Group`;

    await sendEmails(res, email, candidateName, hrSubject, hrBody, userSubject, userBody, 'Application submitted successfully! A confirmation email has been sent.');
  } catch (error) {
    console.error("Application error:", error);
    res.status(500).json({ error: 'Failed to process application. Please try again later.' });
  }
});

// ==========================================
// ADMIN AUTHENTICATION ROUTES
// ==========================================

// Initial setup to create the first admin (Disable or secure after first use!)
app.post('/api/admin/setup', async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ error: 'Admin already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newAdmin = new Admin({ email, password: hashedPassword });
    await newAdmin.save();

    res.status(201).json({ message: 'Admin created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error during setup' });
  }
});

// Admin Login
app.post('/api/admin/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const payload = {
      admin: {
        id: admin.id
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET || 'fallback_secret_for_dev',
      { expiresIn: '24h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token, email: admin.email });
      }
    );
  } catch (error) {
    res.status(500).json({ error: 'Server error during login' });
  }
});

// Admin Forgot Password
app.post('/api/admin/forgot-password', async (req, res) => {
  const { email } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ error: 'No admin account found with this email' });
    }

    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    admin.resetCode = resetCode;
    admin.resetCodeExpires = Date.now() + 15 * 60 * 1000;
    await admin.save();

    try {
      if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: email,
          subject: 'Admin Password Reset Code - MAATRSHRI Group',
          text: `Your password reset code is: ${resetCode}\n\nThis code is valid for 15 minutes.`
        });
      }
    } catch (e) {
      console.log('Email send skipped/failed:', e.message);
    }

    res.json({ 
      message: 'Verification code generated.',
      devCode: resetCode
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error during forgot password' });
  }
});

// Admin Reset Password
app.post('/api/admin/reset-password', async (req, res) => {
  const { email, resetCode, newPassword } = req.body;
  try {
    const admin = await Admin.findOne({ 
      email, 
      resetCode, 
      resetCodeExpires: { $gt: Date.now() } 
    });

    if (!admin) {
      return res.status(400).json({ error: 'Invalid or expired verification code' });
    }

    const salt = await bcrypt.genSalt(10);
    admin.password = await bcrypt.hash(newPassword, salt);
    admin.resetCode = undefined;
    admin.resetCodeExpires = undefined;
    await admin.save();

    res.json({ message: 'Password reset successfully! You can now log in.' });
  } catch (error) {
    res.status(500).json({ error: 'Server error during password reset' });
  }
});

// Admin Custom Email Reply
const authMiddleware = require('./middleware/auth');
app.post('/api/admin/reply', authMiddleware, async (req, res) => {
  const { email, subject, message } = req.body;
  if (!email || !subject || !message) {
    return res.status(400).json({ error: 'Email, subject, and message are required.' });
  }

  try {
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: subject,
        text: message
      });
      res.json({ message: 'Email sent successfully!' });
    } else {
      res.status(500).json({ error: 'Email configuration missing on server.' });
    }
  } catch (error) {
    console.error('Failed to send reply email:', error);
    res.status(500).json({ error: 'Failed to send email.' });
  }
});

// Admin Bulk Custom Email Reply
app.post('/api/admin/bulk-reply', authMiddleware, async (req, res) => {
  const { recipients, subject, message } = req.body;
  if (!Array.isArray(recipients) || recipients.length === 0 || !subject || !message) {
    return res.status(400).json({ error: 'Recipients list, subject, and message are required.' });
  }

  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    return res.status(500).json({ error: 'Email configuration (EMAIL_USER / EMAIL_PASS) is missing on server.' });
  }

  let sentCount = 0;
  const failedEmails = [];
  let lastErrorMessage = '';
  const currentDateStr = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  for (const item of recipients) {
    const targetEmail = item.email;
    if (!targetEmail) continue;

    const targetName = item.name || item.firstName || 'User';
    const firstName = targetName.split(' ')[0] || targetName;

    // Replace dynamic tags in subject and message
    const personalizedSubject = subject
      .replace(/\{name\}/g, targetName)
      .replace(/\{firstName\}/g, firstName)
      .replace(/\{date\}/g, currentDateStr);

    const personalizedMessage = message
      .replace(/\{name\}/g, targetName)
      .replace(/\{firstName\}/g, firstName)
      .replace(/\{date\}/g, currentDateStr);

    try {
      await transporter.sendMail({
        from: cleanEmailUser,
        to: targetEmail,
        subject: personalizedSubject,
        text: personalizedMessage
      });
      sentCount++;
    } catch (err) {
      console.error(`Failed to send bulk email to ${targetEmail}:`, err);
      lastErrorMessage = err.message || err.toString();
      failedEmails.push(targetEmail);
    }
  }

  if (sentCount === 0) {
    return res.status(500).json({ 
      error: `Failed to send email to any recipient. SMTP Error: ${lastErrorMessage || 'Please check email configuration (EMAIL_USER / EMAIL_PASS).'}` 
    });
  }

  res.json({
    message: `Bulk reply completed. Sent ${sentCount} of ${recipients.length} emails successfully.${failedEmails.length > 0 ? ` Failed: ${failedEmails.join(', ')}` : ''}`,
    sentCount,
    totalCount: recipients.length,
    failedEmails
  });
});

// ==========================================
// CONTENT & DATA ROUTES (CRUD)
// ==========================================
app.use('/api', require('./routes/contentRoutes'));

// ✅ SERVE FRONTEND (IMPORTANT)
const __dirnamePath = path.resolve();

app.use(express.static(path.join(__dirnamePath, "../client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirnamePath, "../client/dist/index.html"));
});

// ✅ START SERVER (MUST BE LAST)
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  // Restart triggered
});