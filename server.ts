import 'zone.js';
import express, { Request, Response } from 'express';
import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import { join } from 'path';
import { fileURLToPath } from 'url';
import bootstrap from './src/main.server';
// Routes
import emailRoute from './backend/routes/email';
import pdfRoute from './backend/routes/pdf';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import * as path from 'path';
import compression from 'compression';

// Rate limiting middleware
const apiLimiter = rateLimit({
    windowMs: 30 * 60 * 1000, // 30 minutes
    max: 3, // limit each IP to 3 requests per windowMs
    handler: (req: Request, res: Response, next) => {
      res.status(429).json({
          error: 'Please don"t spam emails, try again after 30 minutes'
      });
  }
  });
//  // The Express app is exported so that it can be used by serverless Functions.
  async function createExpressApp(): Promise<express.Express> {
    const app = express();
     // Middleware
     app.use(cors());
     app.use(compression());
     app.use(express.json());
     app.use(express.urlencoded({ extended: false }));
     
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const browserDistFolder = join(__dirname, '..', 'browser'); 
    const indexHtml = join(browserDistFolder, 'index.html'); 
    
    app.use("/api/email", apiLimiter, emailRoute);
    app.use("/api/pdf", pdfRoute);

    // Serve static files
    app.get('*.*', express.static(browserDistFolder, {
        maxAge: '1y'
    }));
  
    // All regular routes use the Angular engine
    app.get('*', (req: Request, res: Response) => {
        const { protocol, originalUrl, baseUrl, headers } = req;
        const commonEngine = new CommonEngine();
        commonEngine.render({
            bootstrap,
            documentFilePath: indexHtml,
            url: `${protocol}://${headers.host}${originalUrl}`,
            publicPath: browserDistFolder,
            providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
        })
        .then(html => res.send(html))
        .catch(err => {
            console.error('Error occurred in server side rendering:', err);
            res.status(500).send('Server error');
        });
    });
return app;
  }
async function startServer() {
    const app = await createExpressApp();
    const port = process.env['PORT'] || 4200;
    app.listen(port, () => {
        console.log(`Node Express server listening on http://localhost:${port}`);
    });
}

startServer();
