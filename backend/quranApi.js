// quranApi.js to Call API
const axios = require('axios');
require('dotenv').config();

const clientId = process.env.QURAN_CLIENT_ID;
const clientSecret = process.env.QURAN_CLIENT_SECRET;

// This function to get access token
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

// This function to Chapters
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

// This function to Chapter details
async function getChapter(accessToken, chapterId, language = 'en') {
    try {
        const response = await axios.get(
        `https://apis-prelive.quran.foundation/content/api/v4/chapters/${chapterId}`,
        {
            headers: {
            'x-auth-token': accessToken,
            'x-client-id': clientId
            },
            params: { language }
        }
        );
        return response.data;
    } catch (err) {
        console.error('Error fetching chapter:', err.response?.data || err.message);
        throw err;
    }
}


async function searchQuran(query, accessToken, clientIdOverride) {
    try {
        const id = clientIdOverride || clientId;

        const response = await axios.get(
        "https://apis-prelive.quran.foundation/content/api/v4/search",
        {
            headers: {
            "x-auth-token": accessToken,
            "x-client-id": id,
            },
            params: {
                q: query,
                size: 10,
                page: 1,
                language: "en"
            },
        }
        );

        return response.data;
    } catch (error) {
        console.error("Error searching:", error.response?.data || error.message);
        throw error;
    }
}

async function getVersesByChapter(chapterNumber, accessToken) {
    try {
        const response = await axios.get(
        `https://apis-prelive.quran.foundation/content/api/v4/verses/by_chapter/${chapterNumber}`,
        {
            headers: {
                Accept: "application/json",
                "x-auth-token": accessToken,
                "x-client-id": clientId,
            },
            params: {
            language: 'en',
            words: true,
            per_page: 10
            }
        }
        );
        return response.data;
    } catch (err) {
        console.error('Error fetching verses by chapter:', err.message);
        throw err;
    }
}

module.exports = { getAccessToken, getChapters, searchQuran, getChapter, getVersesByChapter };
