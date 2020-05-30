const express = require("express");
const cors = require("cors");
const socketio = require("socket.io");
const path = require("path");
const http = require("http");

const port = process.env.PORT || 5000;
const app = express();
const server = http.createServer(app);
const io = socketio(server);
const routes = require("./modules/routes");
const {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom
} = require("./modules/user/userController");

io.on("connection", socket => {
  socket.on("join", ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if (error) return callback(error);
    // This is for user who is joining.
    // This is we are emitting message from backend to the front end
    socket.emit("message", {
      user: "admin",
      text: `${user.name}, welcome to the room ${user.room}`
    });
    // this is for all other room members
    socket.broadcast.to(user.room).emit("message", {
      user: "admin",
      text: `${user.name} has joined the room!`
    });

    socket.join(user.room);
    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room)
    });

    callback();
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);
    console.log(user);
    console.log(user.room);
    io.to(user.room).emit("message", { user: user.name, text: message });
    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room)
    });
    callback();
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);
    if (user) {
      io.to(user.room).emit("message", {
        user: "admin",
        text: `${user.name} has left.`
      });
    }
  });
});
app.use(routes);
app.use(cors());
// app.use(userRoutes);
server.listen(port, () => console.log(`Server has started on port ${port}`));
