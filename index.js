const express = require("express");
const { Pong } = require("./game/pong");
const { Server } = require("socket.io");
const { generateRoomId, createRoom, joinRoom } = require("./wsUtils");

const roomToSocketMap = new Map();

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

const io = new Server(server);

io.on("connection", (socket) => {
    console.log("a user connected");
    console.log(socket.id);

    socket.on("createRoom", (socket) => {
        const roomID = createRoom(socket.id);
        socket.emmit("roomID", roomID);
    });

    socket.on("join", (socket) => {
        joinRoom(socket.msg.roomID, socket.id);
    });
});

module.exports = { roomToSocketMap };
