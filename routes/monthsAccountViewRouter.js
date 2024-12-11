const express = require('express');
const MonthsAccountViewController = require('../controllers/MonthsAccountViewController.js');
const authenticateToken = require("../middlewares/auth")

const router = express.Router();

router.put('/month-account-view',authenticateToken, MonthsAccountViewController.monthAccountView);
// router.get('/final/view/get', finalViewController.finalViewGet);

module.exports = router;
