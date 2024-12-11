const express = require('express');
const passport = require('../middlewares/auth');
const userController = require('../controllers/userController');
const authenticateToken = require("../middlewares/auth")

const router = express.Router();

router.post('/login', userController.login);
router.post('/signup', userController.signUp);
router.post('/add-user', userController.addUser);
router.get('/get-user/:useruuid', authenticateToken,userController.getUser);
// router.get('/user', passport.authenticate('jwt', { session: false }), userController.getUser);
// router.post('/upload', passport.authenticate('jwt', { session: false }), userController.uploadFile);
// router.post('/convert-pdf', passport.authenticate('jwt', { session: false }), userController.convertPDF);
// router.get('/data', passport.authenticate('jwt', { session: false }), userController.getData);
// router.get('/company', passport.authenticate('jwt', { session: false }), userController.getCompany);
// router.post('/post-ledger', passport.authenticate('jwt', { session: false }), userController.postLedger);

module.exports = router;
