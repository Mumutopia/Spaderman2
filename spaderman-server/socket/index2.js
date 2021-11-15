const socketIo = require("socket.io");
let usersConnected = [];
let usersBuffer = [];

module.exports = function initSocket(server) {
  const io = socketIo(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

  /**
   *
   * Listening and emiting with Io io
   */

  io.on("connection", (socket) => {
    console.log("New client connected");
    console.log(socket.id);
    usersConnected.push(socket.id);
    console.log(usersConnected);

    socket.on("clientTalks", (count) => {
      console.log("je suis :", count);
      io.emit("serverReponded", { count, id: socket.id });

    });

    // socket.on("playerMoving", (movement) =>{
    //     console.log("hello")
    //     console.log(movement.myYPosition)
    //     io.emit("trackMovement",{movement, id : socket.id})
    // })

    socket.on("disconnect", () => {
      console.log("Client disconnected");
      usersBuffer = usersConnected;
      usersConnected = usersBuffer.filter((id) => {
        return id !== socket.id;
      });
      console.log(usersConnected);
    });
  });
};
