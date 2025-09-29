// main.js
const { getAccessToken, getChapters } = require('./quranApi');

(async () => {
    try {
        const tokenData = await getAccessToken();
        console.log('Token response (full):', tokenData);
        // tokenData.access_token
        const chapters = await getChapters(tokenData.access_token);
        console.log('Chapters response:', chapters);
    } catch (err) {
        console.error('Fatal error:', err.message);
    }
})();
