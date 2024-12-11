const express = require('express');
const CapitalAccountViewController = require('../controllers/CapitalAccountViewController.js');
const authenticateToken = require("../middlewares/auth")

const router = express.Router();

router.put('/capital-account-view',authenticateToken, CapitalAccountViewController.capitalAccountView);
// router.get('/final/view/get', finalViewController.finalViewGet);

module.exports = router;
