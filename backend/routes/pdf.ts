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
  function findMatchingStylesheet(directory: any, pattern: any) {
    try {
      const files = fs.readdirSync(directory);
      const regex = new RegExp(pattern); // Regex to match the file name pattern
      const stylesheet = files.find(file => regex.test(file));
  
      return stylesheet ? path.join(directory, stylesheet) : null;
    } catch (error) {
      console.error('Failed to read the directory:', error);
      return null;
    }
  }
  
  // Usage
  const directoryPath = path.join(__dirname, '../../../dist/browser');
  const cssFile = findMatchingStylesheet(directoryPath, '^styles-.*\\.css$'); // Regex for 'styles-**.css'
  
  if (cssFile) {
    console.log('CSS file found:', cssFile);
    // Further actions like reading the file or including it in your HTML content
  } else {
    console.log('No matching CSS file found.');
  }
  const fsdLogoUrl = path.join(__dirname, '../../../dist/browser/assets/folding_sliding_doors_logo.png');
  const fsdLogo = fs.readFileSync(fsdLogoUrl, 'utf-8');

  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

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
<img src="${fsdLogoUrl}" class="img-fluid img" alt="Folding Sliding Doors Canada Ltd. Logo">
  <div class="mat-typography">${htmlContent}</div>
  <script type="module"> import @angular/material from https://cdn.jsdelivr.net/npm/@angular/material@17.3.4/+esm </script>
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
  