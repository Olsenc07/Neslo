import 'zone.js';
import express, { Request, Response } from 'express';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import compression from 'compression';
import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import helmet from 'helmet';

const isProduction = process.env['NODE_ENV'] === 'production';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// static files
const browserDistFolder = join(__dirname, '../browser');
// SSR entry
const bootstrapPath = join(__dirname, '../server/main.server.mjs');
const indexHtml = join(__dirname, 'index.server.html');


//  test these paths!!!
// Backend routes 
const emailRoutePath = join(__filename, '../../backend/routes/email.js');
const pdfRoutePath = join(__filename, '../../backend/routes/pdf.js');
console.log("Email Route Path:", emailRoutePath);
console.log("PDF Route Path:", pdfRoutePath);

// Rate limiting middleware
// const apiLimiter = rateLimit({
//     windowMs: 30 * 60 * 1000, // 30 minutes
//     max: isProduction ? 3 : 1000, // limit each IP to 3 requests per windowMs
//     handler: (req: Request, res: Response, next) => {
//       res.status(429).json({
//           error: `Please don't spam emails, try again after 30 minutes.`
//       });
//   }
//   });
   //  Create Express Servrt
   async function createServer(): Promise<express.Express> {

    // Security settings
  // Security settings
const helmetOptions = isProduction ? {
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"], 
            scriptSrc: ["'self'", "https://cdn.jsdelivr.net", "'unsafe-inline'"], 
            styleSrc: ["'self'", "https://cdn.jsdelivr.net", "'unsafe-inline'"], 
            imgSrc: ["'self'", "data:", "https://www.neslo.ca", "https://cdn.jsdelivr.net",'blob:'], 
            connectSrc: ["'self'"], 
            fontSrc: ["'self'", "https:", "data:"], 
            objectSrc: ["'none'"], 
            upgradeInsecureRequests: [],
            scriptSrcAttr: ["'unsafe-inline'"],
            'script-src-attr': ["'unsafe-inline'", "'unsafe-hashes'"]
        }
    }
} : {
    // Development-specific CSP or other security settings
};
    const server = express();
    
    // server.use(helmet(helmetOptions));
    
    // const corsOptions = isProduction ? {
    //     origin: 'https://www.neslo.ca',
    //     optionsSuccessStatus: 200
    // } : {
    //     origin: '*',
    //     optionsSuccessStatus: 200
    // };
    // server.use(cors(corsOptions));
    server.use(cors())

     // Middleware
     server.use(compression());

     server.use(express.json());
     server.use(express.urlencoded({ extended: true }));
      
    server.set('view engine', 'html');
    server.set('views', browserDistFolder);
    
    // Serve static files
    server.get('*.*', express.static(browserDistFolder, {
        maxAge: isProduction ? '1y' : '0', 
        etag: isProduction, 
        setHeaders: (res, path) => {
            if (isProduction) {
                if (path.endsWith('index.html')) {
                    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
                }
            }
        }
    }));

     // Backend routes
     const emailRoute = (await import(emailRoutePath)).default;
     const pdfRoute = (await import(pdfRoutePath)).default;
    server.use("/api/email", emailRoute);
    server.use("/api/pdf", pdfRoute);
      
    // All regular routes use the Angular engine
    server.get('*', async (req: Request, res: Response) => {
        try {
        const { protocol, originalUrl, baseUrl, headers } = req;
        const commonEngine = new CommonEngine();
        const { default: bootstrap } = await import(bootstrapPath);
        commonEngine.render({
            bootstrap,
            documentFilePath: indexHtml,
            url: `${protocol}://${headers.host}${originalUrl}`,
            publicPath: browserDistFolder,
            providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
        })
        .then(html => res.send(html))
        .catch(err => {
            console.error('Error occurred in server side engine:', err);
            res.status(500).send('Server error');
        });
    } catch (error) {
        console.error('Error occurred in server side rendering:', error);
        res.status(500).send('Server error');
    }
    });
return server;
  }

async function startServer() {
    const port = process.env['PORT'] || 4200;
    const server = createServer();
    (await server).listen(port, () => {
        console.log(`Node Express server listening`);
    });
}

startServer().catch(err => {
    console.error('Uncaught error in startServer:', err);
});