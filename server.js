const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 7000;

app.use(cors({
    origin: ['https://divinestridesinc.org', 'https://divinestrides.onrender.com'],
    methods: ['POST', 'GET'],
    allowedHeaders: ['Content-Type']
}));

// IMPORTANT: Parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname));

// DEBUG route
app.get('/send-email', (req, res) => {
    res.send('Use POST method only');
});

app.post('/send-email', async (req, res) => {
    console.log("📨 Method:", req.method);
    console.log("📨 Body:", req.body);
    
    const { name, email, amount, bank, 'account-name': accountName, date, message } = req.body;

    if (!name || !email) {
        console.log("❌ Missing name or email");
        return res.status(400).json({ error: 'Missing name or email' });
    }

    let output = '';
    let subject = message ? 'New Contact Message' : 'New Donation Entry';

    if (message) {
        output = `<h3>New Contact Message</h3>
                 <p><strong>Name:</strong> ${name}</p>
                 <p><strong>Email:</strong> ${email}</p>
                 <p><strong>Message:</strong></p><p>${message}</p>`;
    } else {
        output = `<h3>New Donation</h3>
                 <p><strong>Name:</strong> ${name}</p>
                 <p><strong>Email:</strong> ${email}</p>
                 <p><strong>Amount:</strong> $${amount}</p>
                 <p><strong>Bank:</strong> ${bank}</p>
                 <p><strong>Account Name:</strong> ${accountName}</p>
                 <p><strong>Date:</strong> ${date}</p>`;
    }

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'meshackchristian0@gmail.com',
            pass: 'jzkjtwcbrytrejma' // ⚠️ CHANGE THIS!
        },
        timeout: 15000
    });

    try {
        console.log("📤 Sending email...");
        await transporter.sendMail({
            from: '"Website" <meshackchristian0@gmail.com>',
            replyTo: email,
            to: 'meshackchristian0@gmail.com',
            subject: subject,
            html: output
        });
        console.log("✅ Email sent!");
        res.json({ success: true, message: 'Email sent!' });
    } catch (error) {
        console.error("❌ Error:", error.message);
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Running on port ${PORT}`);
});