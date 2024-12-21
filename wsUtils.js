const crypto = require("crypto");
const { roomToSocketMap } = require(".");

function generateRoomId() {
    return crypto.randomBytes(4).toString("hex");
}

function createRoom(socketId) {
    const roomID = generateRoomId();
    if (!roomToSocketMap.has(roomID)) {
        roomToSocketMap.set(roomID, new Set());
    }
    joinRoom(roomID, socketId);
    return roomID;
}

function joinRoom(roomID, socketId) {
    roomToSocketMap.get(roomId).add(socket.id);
    console.log(`Socket ${socket.id} joined room ${roomId}`);
}

function leaveRoom(roomID, socketId) {
    if (roomToSocketMap.has(roomID)) {
        roomToSocketMap.get(roomID).delete(socketId);
        console.log(`Socket ${socketId} left room ${roomID}`);
        // delete room if empty
        if (roomToSocketMap.get(roomID).size === 0) {
            roomToSocketMap.delete(roomID);
        }
    }
}

module.exports = {
    createRoom,
    joinRoom,
    leaveRoom,
};
