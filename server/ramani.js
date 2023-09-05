const express = require('express');
const puppeteer = require('puppeteer');
const pdf = require('html-pdf');
const app = express();
var cors = require('cors');
var response;
const goToSite = async (url, res) => {
    const browser = await puppeteer.launch();
    // Create a new page
    const page = await browser.newPage();
    const website_url = url
    await page.goto(website_url, { waitUntil: 'networkidle0', timeout: 0 });
    await page.goto(website_url, { waitUntil: 'networkidle0', timeout: 0 });
    await page.emulateMediaType('screen');
    const getInnerHTMLProperty = await page.evaluate(() => document.documentElement.innerHTML);


    var options = {
        margin: { top: '100px', right: '50px', bottom: '100px', left: '50px' },
        printBackground: true,
        format: 'A3'
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
    // Close the browser instance
    await browser.close();

};

app.post('/api/puppeteer', (req, res) => {
    goToSite(req.body.url, res);
});

app.get('/api/getpup', (req, res) => {
    goToSite('http://52.172.33.39:4200/#/PerformanceReportScreenshot?VesselId=105&enginedetailid=131&engineperformanceid=811', 'res');
    res.send(this.response);
});

app.options('*', cors())
const PORT = process.env.PORT || 9900;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});