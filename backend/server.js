const express = require("express");
const cors = require("cors");
const { getAccessToken, getChapters, searchQuran, getChapter } = require("./quranApi");

const app = express();
app.use(cors());

app.get("/chapters", async (req, res) => {
    try {
        const tokenData = await getAccessToken();
        const chapters = await getChapters(tokenData.access_token);
        res.json(chapters);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a single chapter by id
app.get("/chapters/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { language = "en" } = req.query;

        const tokenData = await getAccessToken();
        const chapter = await getChapter(tokenData.access_token, id, language);

        res.json(chapter);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get("/search", async (req, res) => {
    try {
        const query = req.query.q || req.query.query;
        if (!query) return res.status(400).json({ error: "Missing query param ?q=" });

        const tokenData = await getAccessToken();
        const results = await searchQuran(query, tokenData.access_token);
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on http://localhost:5000"));
