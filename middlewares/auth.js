// const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;
// const JWTStrategy = require('passport-jwt').Strategy;
// const ExtractJWT = require('passport-jwt').ExtractJwt;
// const User = require('../models/userModel');

// passport.use(new LocalStrategy(
//     function (username, password, cb) {
//         User.findOne({ username: username }, function (err, user) {
//             if (err) { return cb(err); }
//             if (!user) { return cb(null, false); }
//             if (user.password != password) { return cb(null, false); }
//             return cb(null, user);
//         });
//     }
// ));

// passport.use(new JWTStrategy({
//     jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
//     secretOrKey: '1luvmother'
// },
//     function (jwtPayload, cb) {
//         User.findOne({ username: jwtPayload.username }, function (err, user) {
//             if (err) { return cb(err); }
//             if (!user) { return cb(null, false); }
//             if (user.password != jwtPayload.password) { return cb(null, false); }
//             return cb(null, user);
//         });
//     }
// ));

// passport.serializeUser(function (user, cb) {
//     cb(null, user.id);
// });

// passport.deserializeUser(function (id, cb) {
//     User.findById(id, function (err, user) {
//         if (err) { return cb(err); }
//         cb(null, user);
//     });
// });

// module.exports = passport;

const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  try {
    const token = req.headers['authorization'];

    if (!token) {
      return res.status(401).json({ message: 'Token missing' });
    }

    // Assuming the token is sent as "Bearer <token>", extract the actual token
    const actualToken = token.split(' ')[1];

    if (!actualToken) {
      return res.status(401).json({ message: 'Invalid token format' });
    }

    const decoded = jwt.verify(actualToken, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

module.exports = authenticateToken;
