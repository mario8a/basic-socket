const socket = io({
    auth: {
        token: "hey como ta"
    }
});


// En caso de error en el middleware
socket.on("connect_error", err => {
    console.log("Error de conexion");
    console.log(err.message);
    console.log(err.data.details);
})