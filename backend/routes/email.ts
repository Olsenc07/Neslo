import { Router, Request, Response } from 'express';
import multer from 'multer';
import sgMail from '@sendgrid/mail';
const router = Router();

const sendGridApiKey = process.env['SENDGRID_API_KEY'];
if (!sendGridApiKey) {
  throw new Error('SENDGRID is not defined');
}

sgMail.setApiKey(sendGridApiKey);
const storage  = multer.diskStorage({   
    filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase();
    // const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name );
        // + '-' + Date.now() + '.' + ext);
    }
});
const upload = multer({storage: storage})

router.post('/email', upload.single('file'), async (req: Request, res: Response) => {
    const { text, fromName, fromEmail } = req.body;
    // preserve white spaces
    const htmlText = text.replace(/\n/g, '<br>');
    const msg = {
        to: process.env['email'], 
        from: `"${fromName}" <${fromEmail}>`, 
        subject: `Neslo Request - ${fromName}`, 
        text: text, 
        html: htmlText,
        ...(req.file && {
            attachments: [{
                filename: req.file.originalname,
                content: req.file.path.split("public")[1],
                type: req.file.mimetype,
                disposition: "attachment",
            }]
        })
    };
  
    // Send mail
    try {
      const info = await sgMail.send(msg);
      console.log('Message sents', info);
      res.send('Email sent successfully');
    } catch (error) {
      console.error('Failed to send email', error);
      res.status(500).send('Failed to send email');
    }
  });

export default router;