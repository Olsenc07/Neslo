import { Router, Request, Response } from 'express';
import puppeteer from 'puppeteer';
import cheerio from 'cheerio';
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'fs';
import { Form } from 'src/app/interfaces/form';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const router = Router();

router.post('/generator', async (req: Request, res: Response) => {
  try {
    const port = process.env['PORT'] || 4200;
   
    const quoteForm: Form = req.body.quoteForm;
    // grid data send to parent!!
    const gridFormArray: Form = req.body.grid;

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setViewport({ width: 2480, height: 3000 });
    await page.goto(`http://localhost:${port}/quotes` , { waitUntil: 'networkidle0' });
    await page.addStyleTag({ path: 'src/app/quote-generator/pdf-creation.scss' });
    await page.waitForFunction('window.getAllAngularTestabilities().findIndex(x => !x.isStable()) === -1');
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

    // Fill in the form fields using evaluate to inject the values directly
    for (const [key, value] of Object.entries(quoteForm)) {
      console.log('key', key);
      console.log('value', value);

      if (key === 'additionalNotes') {
        await page.evaluate((val) => {
          const textArea = document.querySelector('textarea[name="additionalNotes"]');
          if (textArea instanceof HTMLTextAreaElement) {
            textArea.value = val;
            textArea.dispatchEvent(new Event('input', { bubbles: true })); 
          }
        }, value);
        
      } else {
        await page.evaluate((val, name) => {
          const inputElement = document.querySelector(`input[name="${name}"]`);
          if (inputElement instanceof HTMLInputElement) {
            inputElement.value = val;
            inputElement.dispatchEvent(new Event('input', { bubbles: true })); 
          }
        }, value, key);
      }
    }

    const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true });
    await browser.close();
    // Generate PDF using Puppeteer
      res.contentType('application/pdf');
      res.send(pdfBuffer);
    } catch (error) {
      console.error('Error generating PDF:', error);
      res.status(500).send('Failed to generate PDF');
    }
});

export default router;
  