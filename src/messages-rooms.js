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
});

const teach = io.of("/teach");
const students = io.of("/students");

teach.on("connection", socket => {
  console.log(socket.id, 'Se ha conectado a la sala teach');

  socket.on("send-message", data => {
    teach.emit("message", data);
  });
  
});

students.on("connection", socket => {
  console.log(socket.id, 'Se ha conectado a la sala students');

  socket.on("send-message", data => {
    students.emit("message", data);
  });
});

httpServer.listen(3000);
