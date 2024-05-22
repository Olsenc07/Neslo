import { Router, Request, Response } from 'express';
const cloudinary = require('cloudinary').v2
import dotenv from 'dotenv';
dotenv.config();

const router = Router();

cloudinary.config({
    cloud_name: 'your_cloud_name',
    api_key: 'your_api_key',
    api_secret: 'your_api_secret'
  });
// homes, apartments, and townhouses
router.get('/residential', async (req: Request, res: Response) => {
  try {
    const resources = await cloudinary.search
      .expression('folder:residential')
      .execute();
    
    res.json(resources.resources);
  }  catch (error ) {
    console.error('Failed to fetch residential image:', error);
    res.status(500).send(`Failed to fetch residential image: ${error}`);
  }
});

// offices, retail stores, and restaurants
router.get('/commercial', async (req: Request, res: Response) => {
  try {
    const resources = await cloudinary.search
      .expression('folder:commercial')
      .execute();
    
    res.json(resources.resources);
  } catch (error ) {
    console.error('Failed to fetch commercial image:', error);
    res.status(500).send(`Failed to fetch commercial image: ${error}`);
  }
});

// Route to fetch images from the third folder
router.get('/roots', async (req: Request, res: Response)  => {
  try {
    const resources = await cloudinary.search
      .expression('folder:roots')
      .execute();
    
    res.json(resources.resources);
  }  catch (error ) {
    console.error('Failed to fetch roots image:', error);
    res.status(500).send(`Failed to fetch roots imagel: ${error}`);
  }
});
export default router;