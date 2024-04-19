import { Router, Request, Response } from 'express';
import puppeteer from 'puppeteer';
import path, { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const router = Router();

router.post('/generator', async (req: Request, res: Response) => {
try {
  const { htmlContent } = req.body;
  console.log('again', __dirname)


  const cssPattern = path.join(__dirname, '../../../dist/browser/assets/pdf.scss');

  const cssStyles = fs.readFileSync(cssPattern, 'utf-8');
  
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  // increase width add photo access and material styles!!
//   await page.setViewport({
//     width: 1025,
//     height: 1080
// });
const fullHTMLContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Quote PDF</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@400&display=swap;" rel="stylesheet">
  <link href="https://fonts.googleapis.com/icon?family=Material+Symbols+Outlined" rel="stylesheet">
  <style>${cssStyles}</style>
</head>
<body>
  <div class="mat-typography">${htmlContent}</div>
</body>
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
  