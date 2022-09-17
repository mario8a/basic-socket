const user = prompt("Escribe tu usuario");


const profes = ["mario", 'thelma', "gastaldo"];


let socketNamespace, group;

const chat = document.querySelector("#chat");
const namespace = document.querySelector("#namespace");

if (profes.includes(user)) {
  socketNamespace = io("/teach");
  group = "teach";
} else {
  socketNamespace = io("/students");
  group = "students";
}


socketNamespace.on("connect", () => {
  namespace.textContent = group;
});


// logica de envio de mensajes
const sendMessage = document.querySelector("#sendMessage");
sendMessage.addEventListener("click", () => {
  const message = prompt("Escribe tu mensaje");
  socketNamespace.emit("send-message", {
    message,
    user,
  });
});

socketNamespace.on("message", messageData => {
  const {user, message} = messageData;

  const li = document.createElement("li");
  li.textContent = `${user}: ${message}`;

  chat.append(li);
})
