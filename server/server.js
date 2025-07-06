const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ limit: "30mb", extended: false }));
app.use(bodyParser.json({ limit: "30mb", extended: false }));

// Routes
app.use("/post", require("./routes/postRoutes"));
app.use("/user", require("./routes/UserRouter"));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
