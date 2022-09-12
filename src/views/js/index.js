const socket = io();

// function checkSocketStatus() {
//   console.log('Estado del socket: ', socket.connected);
// }

// socket.on("connect", () => {

//   console.log('El socket se ha conectado');
//   checkSocketStatus();

// });

// socket.on("disconnect", () => {

//   console.log('El socket se ha desconectado')
//   checkSocketStatus();

// });

// //Desde la v3 estos ya no jalan

// socket.io.on("reconnection_attempt", () => {
//   console.log('Intentando reconectar al socket');
// });

// socket.io.on("reconnect", () => {
//   console.log('Se ha reconectado al socket');
// });

// socket.on('connect_error', (error) => {
//   console.log('No pude coenctarme al socket', error);
// })

socket.on("mensaje", (data) => {
  console.log(data);
  text.textContent = data;
});

const emitToServer = document.querySelector("#emit-to-server");
emitToServer.addEventListener("click", () => {
  socket.emit("mensaje-server", "Hola desde el cliente");
});


socket.on("todos", message => {
  console.log(message);
})