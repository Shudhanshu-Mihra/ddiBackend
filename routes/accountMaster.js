const express = require('express');
const AccountMasterController = require('../controllers/AccountMasterController.js');
const authenticateToken = require("../middlewares/auth")

const router = express.Router();

router.put('/account-master',authenticateToken, AccountMasterController.accountMasterView);
// router.get('/final/view/get', finalViewController.finalViewGet);

module.exports = router;
