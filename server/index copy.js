const express = require('express');
const multer = require('multer');
const nodemailer = require('nodemailer');
const path = require('path');
const cors = require('cors');

const bodyParser = require('body-parser'); // Add this import statement

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'snowj0940@gmail.com',
    pass: 'ytipaworlavvyaxe',
  },
});

app.use(express.static(path.join(__dirname, 'angular-dist')));

// Use body-parser middleware for JSON parsing
app.use(bodyParser.json());

app.post('/send-email', upload.single('screenshot'), async (req, res) => {
  try {
    const { to, subject, message, screenshotData } = req.body;

    // Convert base64 image data to a buffer
    const screenshotBuffer = Buffer.from(screenshotData, 'base64');

    const mailOptions = {
      from: 'snowj0940@gmail.com',
      to,
      subject,
      text: message,
      attachments: [
        {
          filename: 'screenshot.jpg',
          content: screenshotBuffer,
        },
      ],
    };

    const info = await transporter.sendMail(mailOptions);

    console.log('Email sent: ' + info.response);
    res.status(200).send('Email sent successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error sending email');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
