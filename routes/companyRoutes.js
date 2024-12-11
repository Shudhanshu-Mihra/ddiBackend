const express = require('express');
const companyController = require('../controllers/companyController');
const authenticateToken = require("../middlewares/auth")
const router = express.Router();

router.post('/addcompany', authenticateToken,companyController.createCompany);
router.get('/:useruuid', authenticateToken,companyController.AllCompanys);
router.get('/takedata/:useruuid', authenticateToken,companyController.Companys);

module.exports = router;
