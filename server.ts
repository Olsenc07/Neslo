import 'zone.js';
import express, { Request, Response } from 'express';
import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import { join, resolve } from 'path';
import { fileURLToPath } from 'url';
import bootstrap from './src/main.server';
// Routes
import emailRoute from './backend/routes/email';
import pdfRoute from './backend/routes/pdf';
import rateLimit from 'express-rate-limit';

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
 // The Express app is exported so that it can be used by serverless Functions.
  async function createExpressApp(): Promise<express.Express> {
    const app = express();
    const __filename = fileURLToPath(import.meta.url);
    const serverDistFolder = __filename;
    const browserDistFolder = resolve(serverDistFolder, '../browser');
    const indexHtml = join(browserDistFolder, 'index.server.html');
  
    const compression = (await import('compression')).default;
    app.use(compression());
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    
  
    // API Routes

// API Routes
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
  

// Run server
async function run() {
  const port = process.env['PORT'] || 4200;
  const app = createExpressApp();

  (await app).listen(port, () => {
      console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();