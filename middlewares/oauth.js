// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const passport = require('passport');
// // Load environment variables
// require('dotenv').config();

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: process.env.GOOGLE_CALLBACK_URL||'/auth/google/callback', // Ensure this matches your Google Console redirect URI
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       try {
//         const email = profile.emails[0].value;
//         const username = profile.displayName;

//         // Check if user exists in the database
//         const userQuery = 'SELECT * FROM users WHERE username = $1';
//         const userResult = await pool.query(userQuery, [email]);

//         if (userResult.rows.length > 0) {
//           // Existing user
//           return done(null, userResult.rows[0]);
//         }

//         // Generate unique UUIDs for new users
//         const userkey = await generateUniqueUUID('userkey', 'users');
//         const userid = await generateUniqueUUID('userid', 'users');

//         // Insert new user into the database
//         const insertQuery =
//           'INSERT INTO users (userkey, userid, partyname, userpass, username) VALUES ($1, $2, $3, $4, $5)';
//         await pool.query(insertQuery, [userkey, userid, username, null, email]);

//         const newUser = { userkey, userid, username, email };
//         return done(null, newUser);
//       } catch (error) {
//         console.error(error);
//         return done(error, null);
//       }
//     }
//   )
// );

// // Serialize user into session
// passport.serializeUser((user, done) => {
//   done(null, user.userid);
// });

// // Deserialize user from session
// passport.deserializeUser(async (id, done) => {
//   try {
//     const userQuery = 'SELECT * FROM users WHERE userid = $1';
//     const result = await pool.query(userQuery, [id]);
//     done(null, result.rows[0]);
//   } catch (error) {
//     done(error, null);
//   }
// });


const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// Load environment variables
require('dotenv').config();

// Configure the Google strategy


// Serialize user into session (required for persistent login sessions)
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
