import { Router, Request, Response } from 'express';
import puppeteer from 'puppeteer';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'fs';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const router = Router();

router.post('/generator', async (req: Request, res: Response) => {
try {
  const { htmlContent } = req.body;
  console.log('again', __dirname)
  // adjusy routes

  const quoteStyles = join(__dirname, '../../../browser/assets/pdf/styles'); 
  const allStyles = join(__dirname, '../../../browser/styles.css'); 
  console.log('allStyles', allStyles)
  const cssStyles = fs.readFileSync(allStyles, 'utf-8');
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
//   await page.setViewport({
//     width: 1025,
//     height: 1080
// });
  const fullHTMLContent = `
  <html>
    <head>
      <style>${cssStyles}</style>
    </head>
    <body>${htmlContent}</body>
  </html>
`;
await page.setContent(fullHTMLContent, {
  waitUntil: 'networkidle0' // Wait for all network connections to be idle before rendering
});

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
  