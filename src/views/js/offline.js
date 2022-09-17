const socket = io();

const send = document.getElementById('send');
const disconnect = document.getElementById('disconnect');
const connect = document.getElementById('connect');


send.addEventListener("click", () => {

  if (socket.connected)
    socket.emit("is-connnect", "Esta conectado");

});

disconnect.addEventListener("click", () => {
  socket.disconnect();
});




connect.addEventListener("click", () => {

  socket.connect();

});