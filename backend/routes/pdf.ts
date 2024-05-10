import { Router, Request, Response } from 'express';
import puppeteer, { Page } from 'puppeteer';
import  { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const router = Router();

router.post('/generator', async (req: Request, res: Response) => {
  try {
    const { protocol, headers } = req;
    const { quoteForm, gridFormArray } = req.body;  
    console.log('quote form', quoteForm);
    console.log('grid form array', gridFormArray);

    const selectors = {
      dealerName: '#dealerName',
      dealerBranch: '#dealerBranch',
      contactName: '#contactName',
      contactEmail: '#contactEmail',
      contactPhone: '#contactPhone',
      jobName: '#jobName',
      jobSiteAddress: '#jobSiteAddress',
      jobCity: '#jobCity',
      date: '#date',
      doorModel: '#doorModel',
      exteriorFinish: '#exteriorFinish',
      exteriorColor: '#exteriorColor',
      interiorFinish: '#interiorFinish',
      interiorColor: '#interiorColor',
      glass: '#glass',
      handleColor: '#handleColor',
      additionalNotes: '#additionalNotes'
    };

    // start creating pdf
    const browser = await puppeteer.launch({
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--single-process' // running on a limited memory environment like Heroku
    ],
    executablePath: process.env['CHROME_BIN'] || puppeteer.executablePath(),
    headless: true
    });
    const page = await browser.newPage();

    const viewport: {
      width: number;
      height: number;
  } = { width: 1200, height: 1400 };
    await page.setViewport(viewport);;
    const endpoint = `${protocol}://${headers.host}/quotes`;
    // Navigate to the endpoint
    await page.goto(endpoint, { waitUntil: 'networkidle0' });
    await page.waitForFunction('window.getAllAngularTestabilities().findIndex(x => !x.isStable()) === -1');
    const styles = join(__dirname, '../../browser/pdf-creation.css')
    await page.addStyleTag({ path: styles });

// Use function within loop
for (const [field, selector] of Object.entries(selectors)) {
  try {
    const fullSelector = field === 'additionalNotes' ? `${selector} textarea` : `${selector} input`;
    // Wait for the element to be rendered and ready for input
    await page.waitForSelector(fullSelector, { visible: true });
    // Check if the field has a value to be filled
    const fieldValue = quoteForm[field];
    if (fieldValue) {
   // If it's a textarea, handle it separately
   if (field === 'additionalNotes') {
    await page.focus(fullSelector);
    await page.evaluate((selector, value) => {
      const textareaElement = document.querySelector(selector) as HTMLTextAreaElement;
      textareaElement.value = value;
      textareaElement.dispatchEvent(new Event('input', { bubbles: true }));
      textareaElement.dispatchEvent(new Event('change', { bubbles: true }));
    }, fullSelector, fieldValue);
      } else {
        // Otherwise, use the same method as before for inputs
        await page.focus(fullSelector);
        await page.evaluate((selector, value) => {
          const inputElement: HTMLInputElement = document.querySelector(selector) as HTMLInputElement;
          inputElement.value = value;
          const event: Event = new Event('input', { bubbles: true });
          inputElement.dispatchEvent(event);
        }, fullSelector, fieldValue);
        // If the field is one with a dropdown, press Escape to close it
        if (['exteriorFinish', 'interiorFinish', 'doorModel'].includes(field)) {
          await page.keyboard.press('Escape');
        }
      }
    } 
  } catch (error: unknown) {
    // Assuming error is of type Error
    if (error instanceof Error) {
      console.log(`Error with field ${field}: ${error.message}`);
    } else {
      console.log(`Field ${field} has no value provided, skipping.`);
    }
  }
}

async function fillGridForm(page: Page, gridFormArray: string | any[]) {
  // Wait for the form to be fully rendered
  await page.waitForSelector('#gridLayout');
  for (let i = 0; i < gridFormArray.length; i++) {
    const row = gridFormArray[i];
    // Dynamically generate selector IDs based on the index
    const roomLabelSelector: string = `#roomLabel-${i} input`;
    const widthSelector: string = `#width-${i} input`;
    const heightSelector: string = `#height-${i} input`;
    const config0Selector: string = `#configuration0-${i} input`;
    const config1Selector: string = `#configuration1-${i} input`;
    const leftSelector: string = `#left-${i} input`;
    const rightSelector: string = `#right-${i} input`;
    const activePanelSelector: string = `#activePanel-${i}`;
    const activePanelValue: string = row.activePanel; // 'Right' or 'Left'
    const activePanelOptionSelector: string = `mat-option[value="${activePanelValue}"]`;
    // Ensure elements are available before typing
    await page.waitForSelector(roomLabelSelector);
    await page.type(roomLabelSelector, row.roomLabel);
    await page.type(widthSelector, row.width.toString());
    await page.type(heightSelector, row.height.toString());
    await page.type(config0Selector, row.configuration0);
    await page.type(config1Selector, row.configuration1);
    await page.type(leftSelector, row.left);
    await page.type(rightSelector, row.right);
   if (['Right', 'Left'].includes(row.activePanel)) {
    // Open the dropdown
    await page.click(activePanelSelector);
    await page.waitForSelector(`${activePanelOptionSelector}`, { visible: true });
    // Click the specific option
    await page.click(activePanelOptionSelector);
    await page.keyboard.press('Escape');
     // Wait for the dropdown to close after selection
     await page.waitForFunction(
      (value) => !document.querySelector(`mat-option[value="${value}"]`),
      {},
      activePanelValue
    );
  } else {
    console.error(`Active Panel not selected`);
  }
    // Optionally, handle adding rows if your form requires dynamically adding them
    if (i < gridFormArray.length - 1) {
      await page.click('#addRow'); 
  }}
  // Ensure no element is focused by the end
  await page.evaluate(() => {
    const activeElement = document.activeElement as HTMLElement;
    if (activeElement) {
      activeElement.blur();
    }
  });
  await page.keyboard.press('Tab');  
  await page.keyboard.press('Escape')
}
  // Then call your function
   await fillGridForm(page, gridFormArray);
    const idsToIgnore: string[] = ['ignore0', 'ignore1', 'ignore2'];
    await page.evaluate((ids: string[]) => {
      ids.forEach(id => {
        const elem = document.querySelector(`#${id}`);
        if (elem) {
          elem.remove();
        }
      });
    }, idsToIgnore);
    // send the same view as puppetter
    const pdfBuffer: Buffer = await page.pdf({
      width: viewport.width + 'px',
      height: viewport.height + 'px',
      printBackground: true
    });

    // Clean up: close the browser
    await browser.close();

    res.contentType('application/pdf');
    res.send(pdfBuffer);

    } catch (error) {
      console.error('Error generating PDF:', error);
      res.setHeader('Content-Type', 'application/json');
      res.status(500).send('Failed to generate PDF');
    } 
});

export default router;