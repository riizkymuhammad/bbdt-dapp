const mongoose = require('mongoose');
const connectDB = async () => {
    try {
       const conn = await mongoose.connect(process.env.MONGO_URI); // URL diambil dari .env
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        console.log('MongoDB Connected...');
        console.log(`MongoDB Connecteds...${process.env.MONGO_URI}`);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1);
    }
};
module.exports = connectDB;
