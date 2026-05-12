const express = require("express");
const app = express();
const connectDB = require("./config/database");

require("dotenv").config()

const PORT = process.env.PORT || 5000;

connectDB();

app.listen(PORT,() => {
    console.log(`Server listening on port 5000`);
})

