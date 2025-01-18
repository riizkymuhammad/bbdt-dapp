const express = require('express')
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const caseRoutes = require('./routes/caseRoutes');
require('dotenv').config();

const app = express()
const port = process.env.PORT || 3002;

app.use(express.json());

// Database connection
mongoose.connect('mongodb://localhost:27017/bbdt_dapp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/cases', caseRoutes);


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})