const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 4000;

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files from current directory
app.use(express.static(__dirname));

// Serve homepage
app.post('/send-email', async (req, res) => {
  const { name, email, amount, bank, 'account-name': accountName, date, message } = req.body;

  let output = '';

  if (message) {
    // It's a contact form
    output = `
      <h3>New Contact Message</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `;
  } else {
    // It's a donation form
    output = `
      <h3>New Donation Entry</h3>
      <p><strong>Full Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Amount:</strong> ${amount}</p>
      <p><strong>Bank Name:</strong> ${bank}</p>
      <p><strong>Account Name:</strong> ${accountName}</p>
      <p><strong>Date:</strong> ${date}</p>
    `;
  }

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'divinestrideincinfo@gmail.com',
      pass: 'hpupcdvcnfmvwqkz'
    }
  });

  let mailOptions = {
    from: `"Website Contact" <${email || 'no-reply@example.com'}>`,
    to: 'divinestrideincinfo@gmail.com',
    subject: message ? 'New Contact Message' : 'New Donation Entry',
    html: output
  };

  try {
    await transporter.sendMail(mailOptions);
    res.sendFile(path.join(__dirname, 'success.html'));
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Failed to send email');
  }
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
