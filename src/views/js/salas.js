const socket = io();

const connectRoom1 = document.querySelector('#connectRoom1');
const connectRoom2 = document.querySelector('#connectRoom2');
const connectRoom3 = document.querySelector('#connectRoom3');


// events

connectRoom1.addEventListener('click', () => {
  socket.emit('connect-to-room', 'room1');
});

connectRoom2.addEventListener('click', () => {
  socket.emit('connect-to-room', 'room2');
});

connectRoom3.addEventListener('click', () => {
  socket.emit('connect-to-room', 'room3');
});


// Enviar mensaje

const sendMessage = document.querySelector('#sendMessage');

sendMessage.addEventListener("click", () => {
  const message = prompt("Escribe un mensaje");

  socket.emit("message", message);

});

// Recibir mensaje

socket.on("send-message", data => {
  const {room, message} = data;

  const li = document.createElement("li");
  li.textContent = message;

  document.querySelector(`#${room}`).append(li);

})
