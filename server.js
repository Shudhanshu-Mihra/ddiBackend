// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();

// Import your database configuration if needed
const pool = require('./config/db'); // Adjust the path to your db.js

// CORS configuration with custom headers
const corsOptions = {
  origin: '*', // Allow all origins; you can specify an array of allowed origins if needed
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
};

// Use CORS with the defined options
app.use(cors(corsOptions));

// Middleware to parse JSON requests
app.use(express.json());

// Test DB connection (optional)
const testDbConnection = async () => {
  try {
    const client = await pool.connect();
    const res = await client.query('SELECT NOW()');
    console.log('Database connected:', res.rows[0]);
    client.release();
  } catch (err) {
    console.error('Database connection error:', err.stack);
  }
};

testDbConnection();

// Sample API route
app.get('/api', (req, res) => {
  res.json({ message: 'Hello from the API!' });
});

// Set port and host; HOST is set to 0.0.0.0 to listen on all interfaces
const PORT = process.env.PORT || 3000;
// const HOST = process.env.HOST ||'0.0.0.0'; // Ensures the server listens on all interfaces, making it accessible in the local network

// Start the server
app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});
