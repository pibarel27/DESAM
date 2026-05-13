const express = require("express");
const app = express();
const connectDB = require("./config/database");
const createDefaultAdmin = require("./utils/createDefaultAdmin");
const authRouter = require("./routes/authRoutes");
const cors = require("cors");
const serviceRouter = require("./routes/serviceRoutes");

require("dotenv").config()

const PORT = process.env.PORT || 5000;

connectDB();
createDefaultAdmin();

// Middlewares
app.use(express.json())
app.use(cors());


// Routes
app.use('/api/admin/auth', authRouter);
app.use('/api/admin/service', serviceRouter);

app.listen(PORT,() => {
    console.log(`Server listening on port 5000`);
})

