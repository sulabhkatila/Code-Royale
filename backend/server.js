require("dotenv").config();

const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");

const User = require("./models/userModel");

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(require("cookie-parser"));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/user", require("./routes/user"));
app.use("/api/problemset", require("./routes/problemset"));
app.use("/api/problem", require("./routes/problem"));
app.use("/api/friend", require("./routes/friend"));

// Connect to MongoDB
const mongoose = require("mongoose");

main().catch((err) => console.error(err));

async function main() {
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const port = process.env.PORT || 5000;
  const server = app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
  });

  const io = require("socket.io")(server, {
    pingTimeout: 60000,
    cors: {
      origin: "*",
    },
  });
  
  // one user will make a socket connection for contacting with another user
  // reqUser->connecttoUser : socket
  // reqUser->connecttoUser : socket
  // socket : reqUser->connecttoUser
  // socket : reqUser->connecttoUser
  // we will store it in a data structure

  let socket_to_users = {};
  let users_to_socket = {};
  io.on("connection", async (socket) => {
    console.log("User connected via socket", socket.id);
    const token = socket.handshake.query.token;
    const connectToUser = socket.handshake.query.connectToUser;

    const {_id} = jwt.verify(token, process.env.JWT_SECRET);

    const thisUser = await User.findById(_id);

    if (!thisUser) {
      return;
    }

    const connectedUsers = thisUser.username + "->" + connectToUser;

    socket_to_users[socket.id] = connectedUsers;
    users_to_socket[connectedUsers] = socket.id;

    socket.on("sendMessage", ({ message, to }) => {
      // Broadcast the message to the intended recipient
      // check if the user->connectToUser is available

      const fromSocket = socket.id;
      const usersInServer = socket_to_users[fromSocket].split("->");
      const fromUserInServer = usersInServer[0];
      const toUserInServer = usersInServer[1];


      if (users_to_socket[toUserInServer + "->" + fromUserInServer]) {
        socket.broadcast.to(users_to_socket[toUserInServer + "->" + fromUserInServer]).emit("message", message);
        return;
      }

      // socket.broadcast.to(to).emit("message", message);
    });
  
    socket.on("disconnect", () => {
      console.log("User disconnected", socket.id);
      delete socket_to_users[socket.id];
    });
  });
}

// This is just to avaid the mongoose error 
// when not connected to the database
// main()

// function main() {
//   app.listen(process.env.PORT, () => {
//     console.log(`Server is running on port: ${process.env.PORT}`);
//   });
// }