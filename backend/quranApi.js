// quranApi.js to Call API
const axios = require('axios');
require('dotenv').config();

const clientId = process.env.QURAN_CLIENT_ID;
const clientSecret = process.env.QURAN_CLIENT_SECRET;

async function getAccessToken() {
    if (!clientId || !clientSecret) throw new Error('Missing QURAN_CLIENT_ID or QURAN_CLIENT_SECRET in .env');

    const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

    try {
        // Use URLSearchParams to correctly encode the form body
        const params = new URLSearchParams();
        params.append('grant_type', 'client_credentials');
        params.append('scope', 'content');

        const response = await axios.post(
        'https://prelive-oauth2.quran.foundation/oauth2/token',
        params.toString(),
        {
            headers: {
            'Authorization': `Basic ${auth}`,
            'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
        );

        // response.data should be:
        // { access_token: "...", token_type: "bearer", expires_in: 3600, scope: "content" }
        return response.data;
    } catch (error) {
        console.error('Error getting access token:', error.response?.data || error.message);
        throw error;
    }
}

async function getChapters(accessToken, clientIdOverride) {
    try {
        const id = clientIdOverride || clientId;
        const response = await axios.get(
        'https://apis-prelive.quran.foundation/content/api/v4/chapters',
        {
            headers: {
            'x-auth-token': accessToken,
            'x-client-id': id
            }
        }
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching chapters:', error.response?.data || error.message);
        throw error;
    }
}

module.exports = { getAccessToken, getChapters };
