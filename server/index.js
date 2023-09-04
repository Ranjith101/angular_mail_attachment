const express = require('express');
const nodemailer = require('nodemailer');
const puppeteer = require('puppeteer');
const Cors = require('cors')
const app = express();

const port = process.env.PORT || 3000;

app.use(Cors())
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'snowj0940@gmail.com',
    pass: 'ytipaworlavvyaxe',
  },
});

app.post('/send-email', async (req, res) => {
  try {
    const { to, subject, message } = req.body;

    // Launch a headless browser and capture a screenshot
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://localhost:4200'); // Replace with your Angular app URL
    const screenshot = await page.screenshot();

    // Send the email with the screenshot as an attachment
    const mailOptions = {
      from: 'snowj0940@gmail.com',
      to,
      subject,
      text: message,
      attachments: [
        {
          filename: 'screenshot.png',
          content: screenshot,
        },
      ],
    };

    await transporter.sendMail(mailOptions);

    await browser.close();

    res.status(200).send('Email sent successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error sending email');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
