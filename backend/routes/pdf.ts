import { Router, Request, Response } from 'express';
import puppeteer from 'puppeteer';
const router = Router();
router.post('/generator', async (req: Request, res: Response) => {
try {
  const { htmlContent } = req.body;
    console.log('pdf info 1');  
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(`<html><body>${htmlContent}</body></html>`); // Set the HTML content
  const pdfBuffer = await page.pdf(); // Generate PDF
  await browser.close();

  res.contentType('application/pdf');
  res.send(pdfBuffer); // Send PDF buffer directly to client
} catch (error) {
  console.error('Error generating PDF:', error);
  res.status(500).send('Failed to generate PDF');
}
});

export default router;