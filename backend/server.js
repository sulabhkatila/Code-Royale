require("dotenv").config();

const express = require("express");
const app = express();

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
  
  io.on("connection", (socket) => {
    console.log("User connected via socket", socket.id);
  
    socket.on("disconnect", () => {
      console.log("User disconnected", socket.id);
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