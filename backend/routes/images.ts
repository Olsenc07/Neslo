import { Router, Request, Response } from 'express';
import cloudinary from 'cloudinary';
import dotenv from 'dotenv';
import NodeCache from 'node-cache';
dotenv.config();

const router = Router();
const cacheDuration = 86400; // 24 hr
const checkPeriod = 3600; // 1 hr
const myCache = new NodeCache({ stdTTL: cacheDuration, checkperiod: checkPeriod });

cloudinary.v2.config({
  cloud_name: process.env['cloudinaryName'],
  api_key: process.env['cloudinaryApiKey'],
  api_secret: process.env['cloudinaryApiSecret']
});

router.get('/cloudinary', async (req: Request, res: Response) => {
  const folder = req.query['folder'] as string;
  const validFolders = ['Residential', 'Showcase'];
  const limit = parseInt(req.query['limit'] as string) || 10;

  if (!validFolders.includes(folder)) {
    res.status(400).send('Invalid folder name');
    return;
  }

  const cacheKey = `images_${folder}`;
  const cachedImages = myCache.get(cacheKey);

  if (cachedImages) {
    res.json(cachedImages);
    return;
  }

  try {
    const searchParams: any = {
      expression: `folder:${folder}`,
      max_results: limit
    };

    const resources = await cloudinary.v2.search
      .expression(searchParams.expression)
      .max_results(searchParams.max_results)
      .execute();
    
    myCache.set(cacheKey, resources);
    res.json(resources);
  } catch (error) {
    console.error(`Failed to fetch images from folder ${folder}:`, error);
    res.status(500).send(`Failed to fetch images from folder ${folder}: ${error}`);
  }
});


export default router;