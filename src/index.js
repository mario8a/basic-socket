const express = require('express');
const { createServer } = require('http');
const path = require('path');
const { Server } = require('socket.io');


const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.use(express.static(path.join(__dirname, "views")));

const socketsOnline = [];

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
})

io.on('connection', (socket) => {
  // console.log("Clientes conectados ", io.engine.clientsCount);
  // console.log("Id del cliente conectado",socket.id);

  // Detecta cuando se desconecta un cliente
  // socket.on("disconnect", () => {
  //   console.log("Cliente desconectado", socket.id);
  // })


  // socket.conn.once("upgrade", () => {
  //   console.log('Hemos pasado a http long polling a', socket.conn.transport.name);
  // })

  socketsOnline.push(socket.id);

  // Emision basica
  socket.emit("mensaje" ,"Ahora estas conectado :D");

  socket.on("mensaje-server", data => {
    console.log(data);
  });

  // emitir a todos los clientes
  io.emit("todos", socket.id + " Se ha conectado");

  // Elmision a uno solo
  socket.on("last", message => {
    const lastSocket = socketsOnline[socketsOnline.length - 1];

    io.to(lastSocket).emit("saludar", message);

  });

  // on, once, off
  socket.emit("on","Holi hili");
  socket.emit("on","Holi hili");
  socket.emit("once","Holi hili");
  socket.emit("once","Holi hili");
  socket.emit("once","Holi hili");


});

httpServer.listen(3000);
