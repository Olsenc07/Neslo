import { Router, Request, Response } from 'express';
import PDFDocument from 'pdfkit';
const router = Router();

router.post('/pdf', (req: Request, res: Response) => {
  console.log('end',req.body);
  // Instantiate a new PDF document
//   const doc = new PDFDocument();
//   const pageWidth = doc.page.width;
//   const quarterWidth = pageWidth / 4;
//   const rowHeight = 20;

//   res.setHeader('Content-Type', 'application/pdf');
//   res.setHeader('Content-Disposition', 'attachment; filename=FSD_Neslo_quote.pdf');

//   // Pipe the PDF into the HTTP response
//   doc.pipe(res);

//   // Use the form data to add content to the PDF here
//   // For example, add text based on form data
//   const formData = req.body; // Ensure client sends the form data in the request body
//   console.log('pdf info', formData);
//   // Top Left Column - Dealer Information
//   doc.fontSize(12).text(`Dealer Name: ${formData.dealerName}`, quarterWidth * 0, 80, { width: quarterWidth, align: 'left' });
//   doc.fontSize(12).text(`Branch Name: ${formData.dealerBranch}`, quarterWidth * 0, 100, { width: quarterWidth, align: 'left' });
//   doc.fontSize(12).text(`Contact Name: ${formData.contactName}`, quarterWidth * 0, 120, { width: quarterWidth, align: 'left' });
//   doc.fontSize(12).text(`Contact Email: ${formData.contactEmail}`, quarterWidth * 0, 140, { width: quarterWidth, align: 'left' });
//   doc.fontSize(12).text(`Contact Phone: ${formData.contactPhone}`, quarterWidth * 0, 160, { width: quarterWidth, align: 'left' });

//   // Top Right Column - Job Information
//   doc.fontSize(12).text(`Job Name: ${formData.jobName}`, quarterWidth * 2, 80, { width: quarterWidth, align: 'left' });
//   doc.fontSize(12).text(`Site Address: ${formData.jobSiteAddress}`, quarterWidth * 2, 100, { width: quarterWidth, align: 'left' });
//   doc.fontSize(12).text(`City: ${formData.jobCity}`, quarterWidth * 2, 120, { width: quarterWidth, align: 'left' });
//   doc.fontSize(12).text(`Date: ${formData.date}`, quarterWidth * 2, 140, { width: quarterWidth, align: 'left' });
  
// // Bottom Centered Column - Specify Your Selection
// const startY = 200; // Adjust this based on where your top columns end
// const selectionSectionX = quarterWidth * 0.5;
// doc.fontSize(12).text(`Door Model: ${formData.doorModel}`, selectionSectionX, startY, { width: quarterWidth * 3, align: 'center' });
// doc.fontSize(12).text(`Exterior Finish: ${formData.exteriorFinish}`, selectionSectionX, startY + 20, { width: quarterWidth * 3, align: 'center' });
// doc.fontSize(12).text(`Exterior Color: ${formData.exteriorColor}`, selectionSectionX, startY + 40, { width: quarterWidth * 3, align: 'center' });
// doc.fontSize(12).text(`Interior Finish: ${formData.interiorFinish}`, selectionSectionX, startY + 60, { width: quarterWidth * 3, align: 'center' });
// doc.fontSize(12).text(`Interior Color: ${formData.interiorColor}`, selectionSectionX, startY + 80, { width: quarterWidth * 3, align: 'center' });
// doc.fontSize(12).text(`Glass: ${formData.glass}`, selectionSectionX, startY + 100, { width: quarterWidth * 3, align: 'center' });
// doc.fontSize(12).text(`Handle Color: ${formData.handleColor}`, selectionSectionX, startY + 120, { width: quarterWidth * 3, align: 'center' });
// doc.fontSize(12).text(`Additional Notes: ${formData.additionalNotes}`, selectionSectionX, startY + 140, { width: quarterWidth * 3, align: 'center' });

// // Add the dynamic grid below
// let currentY = startY + 160; // Start position for the grid section

// if (Array.isArray(formData.grid) && formData.grid.length) {
// // Assuming you have more optional columns in the row like 'configuration' and 'notes'
// formData.grid.forEach((row: { roomLabel: string; width: string; height: string; configuration: string; left: string; right: string; activePanel: string; }, index: number) => {
//     let currentX = selectionSectionX; // Reset currentX position for new row

//     // Add the 'Set #' column with automatic increment
//     doc.fontSize(10).text(`Set #: ${index + 1}`, currentX, currentY, { width: quarterWidth, align: 'left' });
//     currentX += quarterWidth;

//     // Add the 'Room Label' column
//     doc.fontSize(10).text(`Room Label: ${row.roomLabel || ''}`, currentX, currentY, { width: quarterWidth, align: 'left' });
//     currentX += quarterWidth;

//     // Add the 'Width' and 'Height' columns under 'ROUGH OPENING'
//     doc.fontSize(10).text(`Width (ins): ${row.width || ''}`, currentX, currentY, { width: quarterWidth, align: 'left' });
//     currentX += quarterWidth;
//     doc.fontSize(10).text(`Height (ins): ${row.height || ''}`, currentX, currentY, { width: quarterWidth, align: 'left' });
//     currentX += quarterWidth;

//     // Add the 'Configuration' column
//     if (row.configuration) {
//       doc.fontSize(10).text(`Configuration: ${row.configuration}`, currentX, currentY, { width: quarterWidth, align: 'left' });
//       currentX += quarterWidth;
//     }

//     // Add the 'Left', 'Right', and 'Active Panel' columns
//     doc.fontSize(10).text(`Left: ${row.left || '0'}`, currentX, currentY, { width: quarterWidth, align: 'left' });
//     currentX += quarterWidth;
//     doc.fontSize(10).text(`Right: ${row.right || '0'}`, currentX, currentY, { width: quarterWidth, align: 'left' });
//     currentX += quarterWidth;
//     doc.fontSize(10).text(`Active Panel: ${row.activePanel || ''}`, currentX, currentY, { width: quarterWidth, align: 'left' });
    
//     // Move to the next row
//     currentY += rowHeight;
//   doc.save()
// })
// };
});
export default router;