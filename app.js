// const express = require('express');
// const bodyParser = require('body-parser');
// const passport = require('./middlewares/auth');
// const userRoutes = require('./routes/userRoutes');
// const finalViewRoutes = require('./routes/finalViewRoutes');
// const nodemailer = require('nodemailer');
// const app = express();

// // Use environment variables for sensitive information


// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(passport.initialize());



// app.use('/user/routes', userRoutes);
// app.use('/final/view', finalViewRoutes);

// module.exports = app;


const express = require('express');
const bodyParser = require('body-parser');
// const passport = require('./middlewares/auth');
const userRoutes = require('./routes/userRoutes');
const finalViewRoutes = require('./routes/finalViewRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const capitalAccountViewRouter = require('./routes/capitalAccountViewRouter');
const companyAccountViewRouter = require('./routes/companyAccountViewRouter');
const monthsAccountViewRouter = require('./routes/monthsAccountViewRouter');
const accountMasterRouter = require('./routes/accountMaster');
const companyRoutes = require('./routes/companyRoutes');
const oauthRoutes = require('./routes/oauthRoutes');
const nodemailer = require('nodemailer'); // Appears unused, ensure to configure if needed
const pool = require('./config/db'); // Adjust the path to your db.js
const passport = require('passport');
const session = require('express-session');

require('dotenv').config();
const cors = require('cors');
const { dashboardView } = require('./controllers/dashboardController');

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || process.env.LOCAL_HOST;


//cors
const corsOptions = {
    origin: '*', // Allow all origins; you can specify an array of allowed origins if needed
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
};
  
  app.use(
    session({
      secret: process.env.JWT_SECRET, // Replace with your secret key
      resave: false,
      saveUninitialized: false,
    })
  );
  // Use CORS with the defined options
app.use(cors(corsOptions));
app.use(passport.initialize());
app.use(passport.session());
// Middleware setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(passport.initialize());

// Route setup
app.use('/user', userRoutes);
app.use('/company', companyRoutes);
app.use('/oauth', oauthRoutes);
// temperory api 
app.use('/final/view', finalViewRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/view',accountMasterRouter );
app.use('/view',capitalAccountViewRouter );
app.use('/view',companyAccountViewRouter );
app.use('/view',monthsAccountViewRouter );
// Test database connection
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

// Start the server
app.listen(PORT, HOST, () => {
  console.log(`Server is running at: http://${HOST}:${PORT}`);
});

module.exports = app;
