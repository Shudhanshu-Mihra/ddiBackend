const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');
const passport = require('passport');
const { createUser, findUserByUsername } = require('../models/userModel');
const bcrypt = require('bcryptjs');


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

// exports.getUser = (req, res, next) => {
//     process.nextTick(function () {
//         res.json({ userId: req.user.MEM_NO });
//     });
// };


exports.login = async (req, res) => {
    const { username, password } = req.body;
    console.log(username, password);
    const user = await findUserByUsername(username);
    // if (user && await bcrypt.compare(password, user.password)) {
  // if (user && await (password, user.userpass)) {
    if (username==user.username && password == user.userpass) {
      console.log(user)
      const AdminData = { user }
      
        const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '3d' });
        res.json({ token  , login: true , AdminData});
      // }
   
    } else {
      res.status(401).json({ message: 'Wrong Password' });
    }
  };

  exports.signUp = async (req, res) => {
    try {
      // const { PARTYNAME, USERPASS, USERNAME ,EMAIL} = req.body;
      const PARTYNAME = req.body.name;
      const USERPASS = req.body.password;
      const USERNAME = req.body.userName;
      const EMAIL = req.body.email;

        console.log(PARTYNAME, USERPASS, USERNAME,EMAIL);
      if (!PARTYNAME || !USERPASS || !USERNAME || !EMAIL) {
        return res.status(400).json({ message: 'Missing required fields' });
      }
  
      // Ensure the "users" table exists
      await pool.query(`
        CREATE TABLE IF NOT EXISTS users (
          sno SERIAL PRIMARY KEY,
          userkey UUID NOT NULL,
          userid UUID NOT NULL,
          partyname VARCHAR(255) NOT NULL,
          userpass VARCHAR(255),
          username VARCHAR(255) UNIQUE NOT NULL,
          email VARCHAR(255) UNIQUE NOT NULL
        )
      `);
  
      // Check if the username already exists
      const userCheckQuery = 'SELECT * FROM users WHERE username = $1';
      const userCheckResult = await pool.query(userCheckQuery, [USERNAME]);
      if (userCheckResult.rows.length > 0) {
        return res.status(409).json({ message: 'Username already exists' });
      }

      const emailCheckQuery = 'SELECT * FROM users WHERE email = $1';
      const emailCheckResult = await pool.query(emailCheckQuery, [EMAIL]);
      if (emailCheckResult.rows.length > 0) {
        return res.status(409).json({ message: 'E-mail already exists' });
      }
      
  
      // Generate unique UUIDs
      const userkey = await generateUniqueUUID('userkey', 'users');
      const userid = await generateUniqueUUID('userid', 'users');
  
      // Insert user data into the database
      const insertQuery = `
        INSERT INTO users (userkey, userid, partyname, userpass, username,email)
        VALUES ($1, $2, $3, $4, $5,$6)
      `;
      await pool.query(insertQuery, [userkey, userid, PARTYNAME, USERPASS, USERNAME,EMAIL]);
  
      // Generate JWT token
      const token = jwt.sign(
        { id: userid, username: USERNAME },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
  
      res.status(201).json({ token, login: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
 
  exports.addUser = async (req, res) => {
    try {
      // const { PARTYNAME, USERPASS, USERNAME ,EMAIL} = req.body;
      const PARTYNAME = req.body.name;
      const USERPASS = req.body.password;
      const USERNAME = req.body.username;
      const EMAIL = req.body.email;
      const AdminUUID = req.body.userid;

        console.log(PARTYNAME, USERPASS, USERNAME,EMAIL ,AdminUUID);
      if (!PARTYNAME || !USERPASS || !USERNAME || !EMAIL || !AdminUUID) {
        return res.status(400).json({ message: 'Missing required fields' });
      }
  
      // Ensure the "users" table exists
      // await pool.query(`
      //   CREATE TABLE IF NOT EXISTS users (
      //     sno SERIAL PRIMARY KEY,
      //     userkey UUID NOT NULL,
      //     userid UUID NOT NULL,
      //     partyname VARCHAR(255) NOT NULL,
      //     userpass VARCHAR(255),
      //     username VARCHAR(255) UNIQUE NOT NULL,
      //     email VARCHAR(255) UNIQUE NOT NULL
      //   )
      // `);
  
      // Check if the username already exists
      const userCheckQuery = 'SELECT * FROM users WHERE username = $1';
      const userCheckResult = await pool.query(userCheckQuery, [USERNAME]);
  
      if (userCheckResult.rows.length > 0) {
        return res.status(409).json({ message: 'Username already exists' });
      }
  
      const emailCheckQuery = 'SELECT * FROM users WHERE email = $1';
      const emailCheckResult = await pool.query(emailCheckQuery, [EMAIL]);
      if (emailCheckResult.rows.length > 0) {
        return res.status(409).json({ message: 'E-mail already exists' });
      }
      // Generate unique UUIDs
      const userkey = await generateUniqueUUID('userkey', 'users');
      const userid = AdminUUID;
  
      // Insert user data into the database
      const insertQuery = `
        INSERT INTO users (userkey, userid, partyname, userpass, username,email)
        VALUES ($1, $2, $3, $4, $5,$6)
      `;
      await pool.query(insertQuery, [userkey, userid, PARTYNAME, USERPASS, USERNAME,EMAIL]);
  
      // Generate JWT token
      const token = jwt.sign(
        { id: userid, username: USERNAME },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
  
      res.status(201).json({ token, login: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
};
  
exports.getUser = async (req, res) => {
  try { 
    const { useruuid } = req.params;
    const Users = 'SELECT * FROM users WHERE userid = $1';
    const usersResult = await pool.query(Users, [useruuid]);
    res.status(201).json({data: usersResult.rows });
  }
  catch { }
}