const functions = require('@google-cloud/functions-framework');
const puppeteer = require('puppeteer');

functions.http('puppeteer-sample-function', async (req, res) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent('<h1>Hello, World!</h1>');
    await page.emulateMediaType('screen');
    const pdf = await page.pdf({format: 'a4'});
    await browser.close();
    res.set({ 'Content-Type': 'application/pdf', 'Content-Length': pdf.length })
	res.send(pdf);
})
