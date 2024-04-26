import { Router, Request, Response } from 'express';
import puppeteer from 'puppeteer';
import  { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Grid } from 'src/app/interfaces/grid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const router = Router();

router.post('/generator', async (req: Request, res: Response) => {
  try {
    const { quoteForm, gridFormArray } = req.body;  
    console.log('q', quoteForm);
    console.log('b', gridFormArray);

    const { protocol, headers } = req;
    
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const viewport = { width: 1400, height: 1600 };
    await page.setViewport(viewport);;
    const endpoint = `${protocol}://${headers.host}/quotes`;
    console.log('Endpoint:', endpoint);

    // Navigate to the endpoint
    await page.goto(endpoint, { waitUntil: 'networkidle0' });
    await page.waitForFunction('window.getAllAngularTestabilities().findIndex(x => !x.isStable()) === -1');
    const styles = join(__dirname, '../../browser/pdf-creation.css')
    await page.addStyleTag({ path: styles });

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

  // Wait for the fields to be available and fill them out
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
      console.log(`Error with field ${field}: An unknown error occurred`);
    }
  }
}

  // Generate the rows for the grid based on gridFormArray data
  let gridRowsHtml = '';
  gridFormArray.forEach((row: Grid, index: number) => {
    gridRowsHtml += `
      <tr>
        <td class="bg-transparent">${index + 1}</td>
        <td>${row.roomLabel}</td>
        <td>${row.width}</td>
        <td>${row.height}</td>
        <td>${row.configuration0}</td>
        <td>+</td>
        <td>${row.configuration1}</td>
        <td>${row.left}</td>
        <td>${row.right}</td>
        <td>${row.activePanel}</td>
      </tr>
    `;
  });
  // Insert the generated grid rows into the table's tbody before generating the PDF
  await page.evaluate((gridRowsHtml) => {
    const tbody = document.querySelector('table tbody');
    if (tbody) {
      tbody.innerHTML = gridRowsHtml;
    }
  }, gridRowsHtml);
    const idsToIgnore = ['ignore0', 'ignore1'];
    await page.evaluate((ids) => {
      ids.forEach(id => {
        const elem = document.querySelector(`#${id}`);
        if (elem) {
          elem.remove();
        }
      });
    }, idsToIgnore);

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
  