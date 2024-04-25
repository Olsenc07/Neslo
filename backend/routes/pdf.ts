import { Router, Request, Response } from 'express';
import puppeteer from 'puppeteer';
import  { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const router = Router();

router.post('/generator', async (req: Request, res: Response) => {
  try {
    const { quoteForm, gridFormArray } = req.body;  
    const { protocol, headers } = req;
    
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({ width: 1930, height: 2100 });
    const endpoint = `${protocol}://${headers.host}/quotes`;
    console.log('Endpoint:', endpoint);

    // Navigate to the endpoint
    await page.goto(endpoint, { waitUntil: 'networkidle0' });

    const styles = join(__dirname, '../../browser/pdf-creation.css')
    await page.addStyleTag({ path: styles });

    // IDs to ignore
    const idsToIgnore = ['ignore0', 'ignore1'];
    await page.evaluate((ids) => {
      ids.forEach(id => {
        const elem = document.querySelector(`#${id}`);
        if (elem) {
          elem.remove();
        }
      });
    }, idsToIgnore);

    const postData = JSON.stringify({ quoteForm, gridFormArray });
    const html = await page.evaluate(async (endpoint, postDataStr) => {
    const postData = JSON.parse(postDataStr);
    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(postData) // secure
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.text();
    }, endpoint, postData);


    await page.setContent(html);
    await page.waitForFunction('window.getAllAngularTestabilities().findIndex(x => !x.isStable()) === -1');
    const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true });
    await page.screenshot({path: 'debug_screenshot.png'});

    // Clean up: close the browser
    await browser.close();

    res.contentType('application/pdf');
    res.send(pdfBuffer);

    } catch (error) {
      console.error('Error generating PDF:', error);
      res.status(500).send('Failed to generate PDF');
    } 
});

export default router;
    // const quoteLastPg = join(__dirname, '../../browser/assets/fsd-sizes.pdf');
  