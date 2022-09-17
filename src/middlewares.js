const express = require("express");
const path = require("path");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.use( express.static(path.join(__dirname, "views")) );

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
});

// middleware
io.use((socket, next) => {
    const token = socket.handshake.auth.token;

    if (token === "hey como ta") {
        next();
    } else {
        const err = new Error("unauthorized");
        err.data = {
            details: "No puedes ser autenticado"
        }
        next(err);
    }
})

io.on("connection", socket => {

    console.log(socket.id);

});

httpServer.listen(3000);