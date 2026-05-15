require("dotenv").config()
const express = require("express");
const app = express();
const connectDB = require("./config/database");
const createDefaultAdmin = require("./utils/createDefaultAdmin");
const authRouter = require("./routes/authRoutes");
const cors = require("cors");
const serviceRouter = require("./routes/serviceRoutes");
const { applyTimestamps } = require("./models/admin");
const aboutUsRouter = require("./routes/aboutUsRoutes");
const homeRouter = require("./routes/homeRoutes");
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT || 6001;

connectDB();
createDefaultAdmin();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

// Routes
app.use('/api/admin/auth', authRouter);
app.use('/api/admin/service', serviceRouter);
app.use('/api/admin/about', aboutUsRouter);
app.use('/api/admin/home', homeRouter);

app.listen(PORT,() => {
    console.log(`Server listening on port 6001`);
})

