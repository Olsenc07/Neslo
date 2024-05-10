import express from 'express';
import axios from 'axios';
const router = express.Router();  // Corrected the Router import

router.get('/auth/instagram/callback', async (req, res) => {
    const { code } = req.query;
    try {
        const tokenResponse = await axios.post('https://api.instagram.com/oauth/access_token', {
            client_id: 'YOUR_CLIENT_ID',  // Replace with your actual client_id
            client_secret: 'YOUR_CLIENT_SECRET',  // Replace with your actual client_secret
            grant_type: 'authorization_code',
            redirect_uri: 'YOUR_REDIRECT_URI',  // Replace with your actual redirect_uri
            code,
        });

        const accessToken = tokenResponse.data.access_token;
        // Fetch the first 10 posts
        const userMediaResponse = await axios.get(`https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,username,timestamp&access_token=${accessToken}&limit=10`);
        
        // Store access token and media in user's session or a database
        res.json(userMediaResponse.data);
    } catch (error) {
        console.error('Failed to fetch Instagram data:', error);
        res.status(500).send('Failed to authenticate or fetch data');
    }
});

module.exports = router;  // Changed from export default for common JS compatibility
