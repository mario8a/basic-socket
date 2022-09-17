const { createServer } = require("http");
const { Server } = require("socket.io");
const client = require("socket.io-client");

describe('Testing socket io', () => {

  let io, serverSocket, clientSocket;

  // Antes de empezar los test, creamos el server
  beforeAll(done => {
    const httpServer = createServer();

    io = new Server(httpServer);

    httpServer.listen(() => {
      const port = httpServer.address().port;
      clientSocket = new client(`http://localhost:${port}`);

      io.on("connection", socket => {
        serverSocket = socket;
      });

      clientSocket.on("connect", done);
      
    }); 
  });

  afterAll(() => {
    io.close();
    clientSocket.close();
  });

  test('Test event', (done) => { 

    clientSocket.on("saludos", saludo => {
      try {
        expect(saludo).toBe("Hola");
        done();
      } catch (error) {
        done(error)
      }
    });

    serverSocket.emit("saludos", "Hola");

  });

  test("Testing callbacks ()", done => {

    serverSocket.on("bark", callback => {
      callback("woof");
    });

    clientSocket.emit("bark", (arg) => {
      try {
        expect(arg).toBe("woof");
        done();
      } catch (error) {
        done(error)
      }
    })

  });

});