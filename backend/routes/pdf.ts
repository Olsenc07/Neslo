import { Router, Request, Response } from 'express';
import puppeteer from 'puppeteer';
import path, { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'fs';

import { PDFDocument } from 'pdf-lib';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const router = Router();

router.post('/generator', async (req: Request, res: Response) => {
  try {
    const port = process.env['PORT'] || 4200;
    const { quoteForm, gridFormArray } = req.body;
   // Serialize data
    const formDataSecure = new URLSearchParams(quoteForm).toString();
    const gridDataSecure = new URLSearchParams(gridFormArray).toString();

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setViewport({ width: 1930, height: 2100 });
    await page.goto(`http://localhost:${port}/quotes?${formDataSecure}&${gridDataSecure}` , { waitUntil: 'networkidle0' });
    await page.waitForFunction('window.getAllAngularTestabilities().findIndex(x => !x.isStable()) === -1');
    const styles = join(__dirname, '../../browser/pdf-creation.css')
    console.log('styles', styles);
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
    await page.screenshot({path: 'debug_screenshot.png'});

    const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true });
    await browser.close();

 // Load the existing PDF
  const quoteLastPg = join(__dirname, '../../browser/assets/fsd-sizes.pdf');
    // Generate PDF using Puppeteer
    res.contentType('application/pdf');
    res.send(pdfBuffer);

    } catch (error) {
      console.error('Error generating PDF:', error);
      res.status(500).send('Failed to generate PDF');
    }
});

export default router;
  