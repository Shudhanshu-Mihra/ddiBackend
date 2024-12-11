const express = require('express');
const passport = require('passport');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const session = require("express-session");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const pool = require('../config/db');
const jwt = require('jsonwebtoken');

// passport.initialize();
// passport.session();
const generateUniqueUUID = async (column, table) => {
  let uniqueUUID;
  let exists;
  do {
    uniqueUUID = uuidv4();
    const query = `SELECT COUNT(*) FROM ${table} WHERE ${column} = $1`;
    const result = await pool.query(query, [uniqueUUID]);
    exists = parseInt(result.rows[0].count, 10) > 0;
  } while (exists);
  return uniqueUUID;
};

passport.serializeUser((user, done) => {
  done(null, user.email);
});

// Deserialize user from session
passport.deserializeUser(async (email, done) => {
  try {
    const userQuery = 'SELECT * FROM users WHERE email = $1';
    const userResult = await pool.query(userQuery, [email]);
    done(null, userResult.rows[0]);
  } catch (err) {
    done(err);
  }
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL, // Replace with your callback URL
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Handle user data here
        let email = profile.emails[0].value;
        let username = profile.displayName;
        let email_verified = profile.email_verified;
        console.log(profile)
        let userQuery = 'SELECT * FROM users WHERE email = $1 OR username = $2';
        let userResult = await pool.query(userQuery, [email,email]);
        if (userResult.rows.length > 0) {
          // User exists
          console.log("user exist")
          return done(null, userResult.rows[0]);
        } else {
          // User doesn't exist, create a new user
          const insertQuery = `
            INSERT INTO users (userkey, userid, partyname, userpass, username, email)
            VALUES ($1, $2, $3, $4, $5, $6)
          `;
        
          const userkey = await generateUniqueUUID('userkey', 'users');
          const userid = await generateUniqueUUID('userid', 'users');
          if (email_verified = true) {
            await pool.query(insertQuery, [userkey, userid, username, null, email, email]);
          }
         

          return done(null, { email, username ,email_verified});
        }
      } catch (err) {
        return done(err);
      }
    }
  )
);
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Callback route after Google login
router.get("/login", (req, res) => {
  console.log("hit login ")
  res.send("<a href='/auth/google'>Login with Google</a>");
});

router.get('/auth/google/callback',passport.authenticate('google', { failureRedirect: '/oauth/login', session: false }),
  (req, res) => {
    // Generate JWT token for authenticated user
    console.log("login google is done")
    const token = jwt.sign(
      { id: req.user.userid, username: req.user.username ,email:req.user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // res.redirect(`http://localhost:5500/dashboard.html?token=${token}`);
    res.json({ token, login: true , user: {
      id: req.user.userid,
      email: req.user.email,
      username: req.user.username,
      name: req.user.name,
      emailVerified:req.email_verified
    },});
  }
);

module.exports = router;
