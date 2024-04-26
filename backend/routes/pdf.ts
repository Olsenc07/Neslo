import { Router, Request, Response } from 'express';
import puppeteer, { Page } from 'puppeteer';
import  { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Grid } from 'src/app/interfaces/grid';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const router = Router();

router.post('/generator', async (req: Request, res: Response) => {
  try {
    const { protocol, headers } = req;
    const { quoteForm, gridFormArray } = req.body;  
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
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const viewport = { width: 1400, height: 1600 };
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
          const inputElement = document.querySelector(selector) as HTMLInputElement;
          inputElement.value = value;
          const event = new Event('input', { bubbles: true });
          inputElement.dispatchEvent(event);
        }, fullSelector, fieldValue);
        // If the field is one with a dropdown, press Escape to close it
        if (['exteriorFinish', 'interiorFinish', 'doorModel'].includes(field)) {
          await page.keyboard.press('Escape');
        }
      }
       // Send Escape key to close the dropdown
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
// Assuming 'page' is your Puppeteer page instance and 'gridFormArray' is already defined
  async function fillGridForm(page: Page, gridFormArray: string | any[]) {
    // Wait for the grid form to be ready
    await page.waitForSelector('table thead'); // Selector for your table header to make sure the table is rendered
  
    for (let i = 0; i < gridFormArray.length; i++) {
      const row = gridFormArray[i];
      
      // Add a new row if needed
      if (i > 0) { // Assuming the first row is already present
        await page.click('button[color="warn"]'); // Adjust selector as needed
      }
      // Fill in the form fields for the current row
      await page.type(`input[formcontrolname="roomLabel"][name="rows.${i}.roomLabel"]`, row.roomLabel);
      await page.type(`input[formcontrolname="width"][name="rows.${i}.width"]`, row.width.toString());
      await page.type(`input[formcontrolname="height"][name="rows.${i}.height"]`, row.height.toString());
      await page.type(`input[formcontrolname="configuration0"][name="rows.${i}.configuration0"]`, row.configuration0);
      await page.type(`input[formcontrolname="configuration1"][name="rows.${i}.configuration1"]`, row.configuration1);
      await page.type(`input[formcontrolname="left"][name="rows.${i}.left"]`, row.left);
      await page.type(`input[formcontrolname="right"][name="rows.${i}.right"]`, row.right);

      // For mat-select, you might need to click to open the dropdown and then click the option
      await page.click(`mat-form-field[purple] mat-select[formcontrolname="activePanel"][name="rows.${i}.activePanel"]`);
      await page.click(`mat-option[value="${row.activePanel}"]`);
    }
  }
  
  // Then call your function
   await fillGridForm(page, gridFormArray);

    const idsToIgnore = ['ignore0', 'ignore1'];
    await page.evaluate((ids) => {
      ids.forEach(id => {
        const elem = document.querySelector(`#${id}`);
        if (elem) {
          elem.remove();
        }
      });
    }, idsToIgnore);

    // send the same view as puppetter
    const pdfBuffer = await page.pdf({
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
      res.status(500).send('Failed to generate PDF');
    } 
});

export default router;
    // const quoteLastPg = join(__dirname, '../../browser/assets/fsd-sizes.pdf');
  