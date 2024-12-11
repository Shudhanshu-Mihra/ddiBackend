const express = require('express');
const CompanyAccountViewController = require('../controllers/CompanyAccountViewController.js');
const authenticateToken = require("../middlewares/auth")

const router = express.Router();

router.put('/company-account-view',authenticateToken, CompanyAccountViewController.companyAccountView);
// router.get('/final/view/get', finalViewController.finalViewGet);

module.exports = router;
