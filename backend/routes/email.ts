import { Router, Request, Response } from 'express';
import multer from 'multer';
import sgMail from '@sendgrid/mail';
const router = Router();

const sendGridApiKey = process.env['SENDGRID_API_KEY'];
if (!sendGridApiKey) {
  throw new Error('SENDGRID_API_KEY is not defined');
}

sgMail.setApiKey(sendGridApiKey);

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Define a type that includes attachments
interface EmailWithAttachments {
  to: string | undefined;
  from: string;
  subject: string;
  text: string;
  html: string;
  attachments?: Attachment[];
}

interface Attachment {
  content: string;
  filename: string;
  type: string;
  disposition: string;
  content_id?: string;
}

router.post('/emit', upload.single('file'), async (req: Request, res: Response) => {
  const { text, fromName, fromEmail } = req.body;
  const htmlText = text.replace(/\n/g, '<br>');

  // Declare msg as EmailWithAttachments to include attachments
  const msg: EmailWithAttachments = {
    to: process.env['RECEIVER_EMAIL'],
    from: `"${fromName}" <${fromEmail}>`,
    subject: `Neslo Quote Request - ${fromName}`,
    text: text,
    html: htmlText,
    attachments: [] // Initialize as an empty array
  };

  if (req.file) {
    const attachment: Attachment = {
      content: req.file.buffer.toString('base64'),
      filename: req.file.originalname,
      type: req.file.mimetype,
      disposition: 'attachment'
    };
    // Push the attachment to the array
    msg.attachments?.push(attachment);
  }

  try {
    await sgMail.send(msg);
    res.send('Email sent successfully');
  } catch (error: unknown) {
    console.error('Failed to send email', error);
    if (error instanceof Error) { // Type guard
        console.error('Error message:', error.message);
      } else {
        console.error('An unknown error occurred:', error);
      }
    res.status(500).send('Failed to send email');
  }
});

export default router;