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
  // console.log("Clientes conectados ", io.engine.clientsCount);
  // console.log("Id del cliente conectado",socket.id);

  // Detecta cuando se desconecta un cliente
  // socket.on("disconnect", () => {
  //   console.log("Cliente desconectado", socket.id);
  // })


  // socket.conn.once("upgrade", () => {
  //   console.log('Hemos pasado a http long polling a', socket.conn.transport.name);
  // })

  // Emision basica
  socket.emit("mensaje" ,"Ahora estas conectado :D");

  socket.on("mensaje-server", data => {
    console.log(data);
  });

  // emitir a todos los clientes
  io.emit("todos", socket.id + " Se ha conectado");
});

httpServer.listen(3000);
