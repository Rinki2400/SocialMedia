const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 5000;

// connect mongoose db
connectDB();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ limit: '30mb', extended: false }));
app.use(bodyParser.json({ limit: '30mb', extended: false }));

app.use('/post', require('./routes/postRoutes'));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));