const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const app = express();
const PORT = process.env.PORT || 5000;

// connect mongoose db
connectDB();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('Server is running'));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));