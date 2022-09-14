const express = require('express');
const { createServer } = require('http');
const path = require('path');
const { Server } = require('socket.io');


const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.use(express.static(path.join(__dirname, "views")));


app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
})

io.on('connection', (socket) => {
  
  socket.connectedRoom = "";

  // socket.on("circle-position", position => {
  //   socket.broadcast.emit("move-circle", position); // Emite a todos los clientes conectados menos a mi
  // });

  socket.on("connect-to-room", room => {

    socket.leave(socket.connectedRoom);

    switch (room) {
      case "room1":
        socket.join("room1"); // Si la sala no existe, la crea
        socket.connectedRoom = "room1";
        break;
      case "room2":
        socket.join("room2"); // Si la sala no existe, la crea
        socket.connectedRoom = "room2";
        break;
      case "room3":
        socket.join("room3"); // Si la sala no existe, la crea
        socket.connectedRoom = "room3";
        break;
      default:
        break;
    }

  });

  socket.on("message", message => {
    const room = socket.connectedRoom;

    io.to(room).emit("send-message", {
      message,
      room
    });

  });

});

httpServer.listen(3000);
