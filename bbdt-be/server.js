require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const cors = require('cors')

const casesRoutes = require('./routes/caseRoutes');
// const transactionsRoutes = require('./routes/transactionsRoutes');
const usersRoutes = require('./routes/userRoutes'); // Sesuaikan nama file di sini

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

// Routes
app.use('/api/users', usersRoutes);
app.use('/api/cases', casesRoutes);
app.get('/', (req, res) => {
    res.send('Hello World!')
  })
// app.use('/api/transactions', transactionsRoutes);

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
