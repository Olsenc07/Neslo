import { Router, Request, Response } from 'express';

import dotenv from 'dotenv';
import NodeCache from 'node-cache';
import {v2 as cloudinary} from 'cloudinary';

dotenv.config();

const router = Router();

interface CloudinaryInterface {
asset_id: string;
public_id: string;
format: string;
version: number;
resource_type: string;
type: string;
created_at: string;
bytes: number;
width: number;
height: number;
backup: boolean;
access_mode: string;
url: string;
secure_url: string;
}


const cacheDuration = 1209600; // (fortnight) in seconds
const checkPeriod = 86400; // 24 hr in seconds
const myCache = new NodeCache({ stdTTL: cacheDuration, checkperiod: checkPeriod });

const cloudinaryName = process.env['cloudinaryName'];
const cloudinaryApiKey = process.env['cloudinaryApiKey'];
const cloudinaryApiSecret = process.env['cloudinaryApiSecret'];

cloudinary.config({
  cloud_name: cloudinaryName,
  api_key: cloudinaryApiKey,
  api_secret: cloudinaryApiSecret,
});

router.get('/cloudinary', async (req: Request, res: Response) => {
  const folder = req.query['folder'] as string;
  const validFolders = ['Residential', 'Showcase'];
  const limit = 10;
  
  // Fetch images from the folder
  cloudinary.search
    .expression(`folder:${folder}`)
    .max_results(limit)
    .execute()
    .then((result) => {
      const images = result.resources.map((resource: CloudinaryInterface) => resource.secure_url);
      console.log('images', images);
    })
    .catch((error) => {
      console.error('Error fetching images:', error);
    });


  if (!validFolders.includes(folder)) {
    res.status(400).send('Invalid folder name');
    return;
  }

  const cacheKey = `images_${folder}`;
  const cachedImages = myCache.get<string[]>(cacheKey);


  if (cachedImages) {
    res.json(cachedImages);
    return;
  }

  
});

export default router;