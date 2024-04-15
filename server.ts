import 'zone.js';
import express, { Request, Response } from 'express';
import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import bootstrap from './src/main.server';
// Routes
import emailRoute from './backend/routes/email';
import pdfRoute from './backend/routes/pdf';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
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
  // Define __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
// Define directories relative to current file
const browserDistFolder = join(__filename, '../browser');
console.log('b', browserDistFolder);
const serverDistFolder = join(__filename, '../server');
console.log('c', serverDistFolder);

const indexHtml = join(serverDistFolder, 'index.server.html');
console.log('hmm', indexHtml);
  // The Express app is exported so that it can be used by serverless Functions.
   function createServer(): express.Express {
    const server = express();
     // Middleware
     server.use(cors());
     server.use(compression());
     server.use(express.json());
     server.use(express.urlencoded({ extended: false }));

    server.set('view engine', 'html');
    server.set('views', browserDistFolder);
    // routes
    server.use("/api/email", apiLimiter, emailRoute);
    server.use("/api/pdf", pdfRoute);
    // Serve static files
    server.get('*.*', express.static(browserDistFolder, { maxAge: '1y'}));
 
    // All regular routes use the Angular engine
    server.get('*', (req: Request, res: Response) => {
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
return server;
  }

async function startServer() {
    const port = process.env['PORT'] || 4200;

    const server = createServer();
    server.listen(port, () => {
        console.log(`Node Express server listening on http://localhost:${port}`);
    });
}

startServer().catch(err => {
    console.error('Uncaught error in startServer:', err);
});