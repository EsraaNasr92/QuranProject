const { getAccessToken, getChapters, getChapter, searchQuran } = require('./quranApi');

(async () => {
    try {
        const tokenData = await getAccessToken();
        console.log('Token response (full):', tokenData);

        const token = tokenData.access_token;   // 👈 FIX: define token here

        // Test all chapters
        const chapters = await getChapters(token);
        console.log('Chapters response:', chapters);


        // Another test in English
        const chapterEn = await getChapter(token, 2, 'en');
        console.log('Single chapter response (EN):', chapterEn);

    } catch (err) {
        console.error('Fatal error:', err.message);
    }
})();
