const express = require("express");
const cors = require("cors");
const { getAccessToken, getChapters } = require("./quranApi");

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

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
