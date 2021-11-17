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

    socket.on("new-user", (room) =>{
      socket.join(room)
      
      console.log("the user is",socket.id,'jas joined', room)
      
    })
    socket.on("sendStartSignal",(room)=>{
      console.log("receive !");
      io.to(room).emit("startSignal")
    })

    socket.on("playerMoving", (myXPosition, myYPosition, room) => {
      
      socket.to(room).emit("trackMovement", myXPosition,myYPosition,socket.id);
    });

    socket.on("digBoard", (room,boardGame) => {
      
      socket.to(room).emit("refreshBoard", boardGame)
    });

    socket.on("transferScore", (room, myScore) =>{
      
      socket.to(room).emit("otherPlayerScore", {myScore, id: socket.id} )
    })
    socket.on("transferBomb", (room, myBomb) =>{
      
      socket.to(room).emit("otherPlayerBomb", {myBomb, id: socket.id} )
    })

    socket.on("sendStunned", (room,message)=> {
      socket.to(room).emit("Stunned",( message))
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
