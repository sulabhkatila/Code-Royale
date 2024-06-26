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

  let socket_to_users = {};
  let users_to_socket = {};
  let socket_to_user = {};
  let user_to_socket = {};

  io.on("connection", async (socket) => {
    console.log("User connected via socket", socket.id);
    const token = socket.handshake.query.token;
    // const connectToUser = socket.handshake.query.connectToUser;

    const { _id } = jwt.verify(token, process.env.JWT_SECRET);

    const thisUser = await User.findById(_id);

    if (!thisUser) {
      return;
    }

    socket_to_users[socket.id] = thisUser.username;
    users_to_socket[thisUser.username] = socket.id;

    // if (connectToUser !== null) {}
    // const connectedUsers = thisUser.username + "->" + connectToUser;

    // socket_to_users[socket.id] = connectedUsers;
    // users_to_socket[connectedUsers] = socket.id;

    socket.on("sendMessage", ({ message, to }) => {
      // Broadcast the message to the intended recipient
      // check if the user->connectToUser is available

      const fromSocket = socket.id;
      const toSocket = users_to_socket[to];
      if (toSocket) {
        socket.broadcast.to(toSocket).emit("message", message);
        return;
      }
      // const usersInServer = socket_to_users[fromSocket].split("->");
      // const fromUserInServer = usersInServer[0];
      // const toUserInServer = usersInServer[1];

      // if (users_to_socket[toUserInServer + "->" + fromUserInServer]) {
      //   socket.broadcast.to(users_to_socket[toUserInServer + "->" + fromUserInServer]).emit("message", message);
      //   return;
      // }

      // socket.broadcast.to(to).emit("message", message);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected", socket.id);
      delete socket_to_user[socket.id];
      delete user_to_socket[thisUser.username];
      // delete socket_to_users[socket.id];
    });

    socket.on("sendChallange", (problemId, to) => {
      // use the user to socket mapping to send the challange
      const fromSocket = socket.id;
      const toSocket = users_to_socket[to];
      const fromUser = socket_to_users[fromSocket];

      console.log("sendChallange: ", problemId, to);
      if (toSocket) {
        socket.broadcast.to(toSocket).emit("gotChallange", fromUser, problemId);
        return;
      }
    });

    socket.on("gotChallange", (from, problemId) => {
      const fromSocket = socket.id;
      const toSocket = users_to_socket[from]; // from is the user who sent the challange
      if (toSocket) {
        socket.broadcast.to(toSocket).emit("gotChallange", from, problemId);
        return;
      }
    });

    socket.on("acceptChallange", (from, problemId) => {
      const fromSocket = socket.id;
      const toSocket = users_to_socket[from]; // from is the user who sent the challange
      if (toSocket) {
        socket.broadcast.to(toSocket).emit("acceptChallange", from);
        return;
      }
    });

    socket.on("rejectChallange", (from) => {
      const fromSocket = socket.id;
      const toSocket = users_to_socket[from]; // from is the user who sent the challange
      if (toSocket) {
        socket.broadcast.to(toSocket).emit("rejectChallange", from);
        return;
      }
    });

    socket.on("cancelChallange", (to) => {
      const fromSocket = socket.id;
      const toSocket = users_to_socket[to];
      if (toSocket) {
        socket.broadcast.to(toSocket).emit("cancelChallange", from);
        return;
      }
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
