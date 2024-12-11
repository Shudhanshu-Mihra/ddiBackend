const express = require('express');
const finalViewController = require('../controllers/finalViewController');
const authenticateToken = require("../middlewares/auth")

const router = express.Router();

router.put('/final-view',authenticateToken, finalViewController.finalView);
// router.get('/final/view/get', finalViewController.finalViewGet);

module.exports = router;
