import 'zone.js';
import express, { Request, Response } from 'express';
import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import bootstrap from './src/main.server';
// Routes
import emailRoute from './backend/routes/email';
import pdfRoute from './backend/routes/pdf';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import compression from 'compression';

console.log('grilled cheese')

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
   function app(): express.Express {
    const server = express();
     // Middleware
     server.use(cors());
     server.use(compression());
     server.use(express.json());
     server.use(express.urlencoded({ extended: false }));

     const distFolder = dirname(fileURLToPath(import.meta.url));
     const browserDistFolder = resolve(distFolder, '../browser');
     server.set('view engine', 'html');
     server.set('views', browserDistFolder);
     
    // routes
    server.use("/api/email", apiLimiter, emailRoute);
    server.use("/api/pdf", pdfRoute);

    // Serve static files
    server.get('*.*', express.static(browserDistFolder, { maxAge: '1y'}));
 
    // All regular routes use the Angular engine
    server.get('*', (req: Request, res: Response) => {
        console.log('its in')
        const { protocol, originalUrl, baseUrl, headers } = req;
        const commonEngine = new CommonEngine();
        const indexHtml = join(distFolder, 'index.server.html');

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
return server;
  }

async function startServer() {
    const port = process.env['PORT'] || 4200;

    const server = app();
    server.listen(port, () => {
        console.log(`Node Express server listening on http://localhost:${port}`);
    });
}
startServer().catch(err => {
    console.error('Failed to start the server:', err);
});
