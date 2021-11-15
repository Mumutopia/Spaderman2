// const http = require("http");
// const socketIo = require("socket.io");


// module.exports = (server) => {

//   //const server = http.createServer();
//   const io = socketIo(server, {
//     cors: {
//       origin: "http://localhost:3000",
//       methods: ["GET", "POST"],
//     },
//   });

//   handleListen(io);

//   return io;
// };

// function handleListen(io) {
//     /**
//    *
//    * Listening and emiting with Io io
//    */

//   io.on("connection", (socket) => {
//     console.log("New client connecteddddd");
//     console.log(socket);
//     console.log("hello")

//     socket.on("clientTalks", (count) => {
//       io.emit("serverReponded", {
//         mes: "je suis le serveur et je te parle" + count,
//       });
//     });

//     socket.on("disconnect", () => {
//       console.log("Client disconnected");
//     });
//   });
// }
