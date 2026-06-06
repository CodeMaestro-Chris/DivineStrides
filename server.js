const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 7000;

// CORS - Allow multiple origins for testing
app.use(cors({
    origin: ['https://divinestridesinc.org', 'https://divinestrides.onrender.com'],
    methods: ['POST', 'GET'],
    allowedHeaders: ['Content-Type']
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname));

// Log all requests
app.use((req, res, next) => {
    console.log(`📩 ${req.method} request from ${req.headers.origin}`);
    console.log("📋 Body:", req.body);
    next();
});

// GET route - just for testing
app.get('/send-email', (req, res) => {
    console.log("⚠️ Received GET request");
    res.send('Use POST method only');
});

// POST route - main handler
app.post('/send-email', async (req, res) => {
    console.log("📨 Processing POST request...");
    
    const { name, email, amount, bank, 'account-name': accountName, date, message } = req.body;
    
    console.log("👤 Name:", name);
    console.log("📧 Email:", email);

    let output = '';
    let subject = '';

    if (message) {
        subject = 'New Contact Message';
        output = `<h3>New Contact Message</h3>
                 <p><strong>Name:</strong> ${name}</p>
                 <p><strong>Email:</strong> ${email}</p>
                 <p><strong>Message:</strong></p>
                 <p>${message}</p>`;
    } else {
        subject = 'New Donation Entry';
        output = `<h3>New Donation Entry</h3>
                  <p><strong>Full Name:</strong> ${name}</p>
                  <p><strong>Email:</strong> ${email}</p>
                  <p><strong>Amount:</strong> ${amount}</p>
                  <p><strong>Bank Name:</strong> ${bank}</p>
                  <p><strong>Account Name:</strong> ${accountName}</p>
                  <p><strong>Date:</strong> ${date}</p>`;
    }

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'divinestrideincinfo@gmail.com',
            pass: 'hpupcdvcnfmvwqkz' // ⚠️ CHANGE THIS IMMEDIATELY!
        }
    });

    let mailOptions = {
        from: '"Website Form" <divinestrideincinfo@gmail.com>',
        replyTo: email,
        to: 'divinestrideincinfo@gmail.com',
        subject: subject,
        html: output
    };

    try {
        console.log("📤 Sending email...");
        await transporter.sendMail(mailOptions);
        console.log("✅ Email sent successfully!");
        
        // Send success response
        res.send('SUCCESS');
    } catch (error) {
        console.error("❌ Email error:", error);
        res.status(500).send('FAILED: ' + error.message);
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});