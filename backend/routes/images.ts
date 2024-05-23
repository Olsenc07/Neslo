import { Router, Request, Response } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import NodeCache from 'node-cache';

dotenv.config();

const router = Router();

const cacheDuration = 1209600; // (fortnight) in seconds
const checkPeriod = 86400; // 24 hr in seconds
const myCache = new NodeCache({ stdTTL: cacheDuration, checkperiod: checkPeriod });

const cloudinaryName = process.env['cloudinaryName'];
const cloudinaryApiKey = process.env['cloudinaryApiKey'];
const cloudinaryApiSecret = process.env['cloudinaryApiSecret'];
// Console log these values
console.log("Cloudinary Name:", cloudinaryName);

router.get('/cloudinary', async (req: Request, res: Response) => {
  const folder = req.query['folder'] as string;
  const validFolders = ['Residential', 'Showcase'];
  const limit = parseInt(req.query['limit'] as string, 10) || 10;

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
    const url = `https://api.cloudinary.com/v1_1/${cloudinaryName}/resources/search?expression=folder:${folder}&max_results=${limit}`;
    const options = {
      headers: {
        Authorization: `Basic ${Buffer.from(`${cloudinaryApiKey}:${cloudinaryApiSecret}`).toString('base64')}`
      }
    };

    const response = await axios.get(url, options);
    const resources = response.data.resources;

    myCache.set(cacheKey, resources);
    res.json(resources);
  } catch (error) {
    console.error(`Failed to fetch images from folder ${folder}:`, error);
    res.status(500).send(`Failed to fetch images from folder ${folder}: ${error}`);
  }
});

export default router;
