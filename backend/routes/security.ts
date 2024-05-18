import { Router, Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();

const router = Router();

router.get('/recaptcha-key', (req: Request, res: Response) => {
  const secretKey = process.env['recaptchaSecretKey'];

  if (secretKey) {
    res.json({ secretKey });
  } else {
    res.status(500).json({ error: 'reCAPTCHA secret key not found' });
  }
});

export default router;
