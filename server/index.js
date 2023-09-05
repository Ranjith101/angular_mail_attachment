const express = require("express");
const puppeteer = require("puppeteer");
const cors = require("cors");
const pdf = require('html-pdf');

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
  // await page.waitForTimeout(4 * 60 * 1000); // 5 minutes
  // Set the viewport height to a very large value
  await page.setViewport({ width: 1200, height: 12000 });
  await autoScroll(page);
  // Capture a screenshot of the entire page
  const screenshotPath = `screenshot.png`; // You can customize the file path and name
  const getInnerHTMLProperty = await page.evaluate(() => document.documentElement.innerHTML);
  await page.screenshot({ path: screenshotPath, fullPage: true });
  // const pdfPath = `page.pdf`;
  // await page.pdf({ pageRanges:'1-8', format: 'A4',margin: { top: '20mm', right: '20mm', bottom: '20mm', left: '20mm' },printBackground: true,scale:1  });
  var options = {
    margin: { top: '100px', right: '50px', bottom: '100px', left: '50px' },
    printBackground: true,
    format: 'A3',
    scale:1
};
  const SCRIPT_REGEX = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
    let cleanHtml = getInnerHTMLProperty;
    while (SCRIPT_REGEX.test(cleanHtml)) {
        cleanHtml = cleanHtml.replace(SCRIPT_REGEX, "");
    }
  
  pdf.create(cleanHtml, options).toFile('./performance-report.pdf', function (err, res) {
    if (err) return console.log(err);
    console.log(res);
    this.response = res;
    
    
});
  await browser.close();
  console.log("browser closed")
  res.setHeader('Content-Type', 'application/pdf');
  res.json({ path: screenshotPath});
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Function to scroll to the bottom of the page
async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve, reject) => {
      let totalHeight = 0;
      const distance = 100; // Adjust as needed
      const interval = 100; // Adjust as needed
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;
        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, interval);
    });
  });
}
