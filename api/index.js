const app = require("express")();
const axios = require("axios").default;
const cors = require("cors");

app.use(cors());

app.get("/api/:query", async (req, res) => {
    res.setHeader("Content-Type", "text/html");
    res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
    const googleReq = await axios.get(
        `https://suggestqueries.google.com/complete/search?client=chrome&q=${req.params.query}`
    );
    res.json(googleReq.data);
});

module.exports = app;
