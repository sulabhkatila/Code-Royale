require("dotenv").config();

const express = require("express");
const app = express();

// Middleware


// Connect to MongoDB
const mongoose = require("mongoose");

main().catch((err) => console.error(err));

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
