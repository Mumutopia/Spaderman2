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
    
    usersConnected.push(socket.id);
    console.log(usersConnected);

    socket.on("playerMoving", (movement) => {
      io.emit("trackMovement", { movement, id: socket.id });
    });

    socket.on("digBoard", (boardGame) => {
      
      socket.broadcast.emit("refreshBoard", boardGame)
    });

    socket.on("transferScore", (myScore) =>{
      console.log("score",myScore)
      socket.broadcast.emit("otherPlayerScore", {myScore, id: socket.id} )
    })
    socket.on("transferBomb", (myBomb) =>{
      
      socket.broadcast.emit("otherPlayerBomb", {myBomb, id: socket.id} )
    })

    socket.on("sendStunned", (message)=> {
      socket.broadcast.emit("Stunned",(message))
    })

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
