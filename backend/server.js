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

// Connect to MongoDB
const mongoose = require("mongoose");

main().catch((err) => console.error(err));

// main()
// This is just to avaid the mongoose error for now
// function main() {
//   app.listen(process.env.PORT, () => {
//     console.log(`Server is running on port: ${process.env.PORT}`);
//   });
// }

async function main() {
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
  });
}
