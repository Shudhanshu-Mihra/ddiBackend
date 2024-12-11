const express = require('express');
const dashboardController = require('../controllers/dashboardController');
const authenticateToken = require("../middlewares/auth")

const router = express.Router();

router.put('/dashboard',authenticateToken, dashboardController.dashboardView);
// router.get('/final/view/get', finalViewController.finalViewGet);

module.exports = router;
