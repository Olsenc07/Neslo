import { Router, Request, Response } from 'express';
import { request } from 'http';
import dotenv from 'dotenv';
dotenv.config();

const router = Router();

router.post('/verify-recaptcha', (req: Request, res: Response) => {
  const { token } = req.body;
  const secretKey = process.env['recaptchaSecretKey'];

  const data = `secret=${secretKey}&response=${token}`;
  const options = {
    hostname: 'www.google.com',
    path: '/recaptcha/api/siteverify',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': data.length
    }
  };

const reqGoogle = request(options, (resGoogle) => {
    let body = '';
    resGoogle.on('data', (chunk) => {
      body += chunk;
    });
    resGoogle.on('end', () => {
      console.log('Google reCAPTCHA API response:', body); // Add this line
      try {
        const response = JSON.parse(body);
        res.json({
          success: response.success,
          challenge_ts: response.challenge_ts,
          hostname: response.hostname,
          'error-codes': response['error-codes']
        });
      } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to parse response from Google reCAPTCHA API' });
      }
    });
  });
  


  reqGoogle.on('error', (error) => {
    console.error('Error verifying reCAPTCHA token:', error);
    res.status(500).json({ success: false, error: 'reCAPTCHA verification failed' });
  });

  reqGoogle.write(data);
  reqGoogle.end();
});

export default router;
