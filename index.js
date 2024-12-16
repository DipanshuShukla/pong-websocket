const express = require("express");
const { Pong } = require("./game/pong");

const app = express();

app.use(express.static("views"));
app.use(express.static("game"));

const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
    res.sendFile("views/templates/index.html", { root: __dirname });
});

const server = app.listen(PORT, () => {
    console.log(`\nPong websocket running on http://localhost:${PORT}\n`);
});
