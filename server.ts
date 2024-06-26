import 'zone.js';
import '@angular/compiler';

import express, { Request, Response } from 'express';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import compression from 'compression';
import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import helmet, { HelmetOptions } from 'helmet';

// Check if these routes still work????
const isProduction = process.env['NODE_ENV'] === 'production';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// static files
const browserDistFolder = join(__dirname, '../browser');

// SSR entry
const bootstrapPath = join(__dirname, '../server/main.server.mjs');
const indexHtml = join(__dirname, 'index.server.html');

// Backend Paths
const emailRoutePath = join(__dirname, '../backend/routes/email.js');
const pdfRoutePath = join(__dirname, '../backend/routes/pdf.js');
const securityRoutePath = join(__dirname, '../backend/routes/security.js');
const imagesRoutePath = join(__dirname, '../backend/routes/images.js');

// Rate limiting middleware
const apiLimiter = rateLimit({
    windowMs: 30 * 60 * 1000, // 30 minutes
    max: isProduction ? 2 : 1000, // limit each IP to 2 requests per windowMs
    handler: (req: Request, res: Response, next) => {
      res.status(429).json({
          error: `Please don't spam emails, try again after 30 minutes.`
      });
  }
  });
   //  Create Express Server
async function createServer(): Promise<express.Express> {
const helmetOptions: HelmetOptions = isProduction ? {
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"], 
            scriptSrc: ["'self'", "https://cdn.jsdelivr.net", "https://www.google.com", "https://www.gstatic.com"],
            styleSrc: ["'self'", "https://cdn.jsdelivr.net", "https://fonts.googleapis.com"],
            imgSrc: ["'self'", "data:", "https://www.neslo.ca", "https://cdn.jsdelivr.net", "https://www.gstatic.com", 'blob:'], 
            connectSrc: ["'self'", "https://www.google.com"], 
            fontSrc: ["'self'", "https:", "data:", "https://fonts.gstatic.com"], 
            objectSrc: ["'none'"], 
            scriptSrcAttr: ["'none'"]
          }   
    },
    frameguard: {
        action: 'sameorigin'
    },
    hidePoweredBy: true,
    dnsPrefetchControl: {
        allow: false
    },
    noSniff: true
} : {
    contentSecurityPolicy: false, // Disable CSP in development to allow all headers
    frameguard: {
        action: 'sameorigin'
    },
    hidePoweredBy: true,
    dnsPrefetchControl: {
        allow: true
    },
    noSniff: false
};
    const server = express();
    server.enable('trust proxy');
    
    server.use(helmet(helmetOptions));
    // Middleware to force HTTPS
    server.use((req, res, next) => {
    if (req.secure || req.headers['x-forwarded-proto'] === 'https') {
        return next();
    }
    res.redirect(`https://${req.headers.host}${req.url}`);
        });
    
    const corsOptions = isProduction ? {
        origin: 'https://www.neslo.ca',
        optionsSuccessStatus: 200
    } : {
        origin: '*',
        optionsSuccessStatus: 200
    };
    server.use(cors(corsOptions));

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
     const securityRoute = (await import(securityRoutePath)).default;
     const imagesRoute = (await import(imagesRoutePath)).default;


    // API Routes
     server.use("/api/email", emailRoute);
     server.use("/api/pdf", pdfRoute);
     server.use("/api/security", securityRoute);
     server.use("/api/images", imagesRoute);


     server.get('*', async (req: Request, res: Response) => {
        try {
          const { protocol, originalUrl, baseUrl, headers } = req;
          const { default: bootstrap } = await import(bootstrapPath);
          const commonEngine = new CommonEngine();
          const html = await commonEngine.render({
            bootstrap,
            documentFilePath: indexHtml,
            url: `${protocol}://${headers.host}${originalUrl}`,
            publicPath: browserDistFolder,
            providers: [{provide: APP_BASE_HREF, useValue: baseUrl}],
          });
      
          res.send(html);
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
