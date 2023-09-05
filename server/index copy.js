const express = require("express");
const puppeteer = require("puppeteer");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
// Serve static files from the 'images' directory
app.use(express.static('images'));

app.post("/screenshot", async (req, res) => {
  const url = req.body.url;

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Navigate to the URL and wait for 4 minutes (240,000 milliseconds)
  await page.goto(url, { waitUntil: "load"});
  await page.waitForTimeout(2 * 60 * 1000); // 5 minutes
  // Set the viewport height to a very large value
  await page.setViewport({ width: 1200, height: 10000 });
  // Capture a screenshot of the entire page
  const screenshotPath = `screenshot.png`; // You can customize the file path and name
  await page.screenshot({ path: screenshotPath, fullPage: true });
  const pdfPath = `page.pdf`;
  await page.pdf({ path: pdfPath, format: 'A4' });
  await browser.close();
  console.log("browser closed")
  res.json({ img_path: screenshotPath,pdf_path:pdfPath });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
