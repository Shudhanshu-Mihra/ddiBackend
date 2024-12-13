const express = require('express');
const MonthsAccountViewController = require('../controllers/MonthsAccountViewController.js');
const authenticateToken = require("../middlewares/auth")

const router = express.Router();

router.put('/month-account-view',authenticateToken, MonthsAccountViewController.monthAccountView);
router.put('/item-master-view',authenticateToken, MonthsAccountViewController.itemMasterView);
router.put('/cash-entry-view',authenticateToken, MonthsAccountViewController.cashEntrymonthAccountView);
router.put('/home-view',authenticateToken, MonthsAccountViewController.homeView);
router.put('/inventory-view',authenticateToken, MonthsAccountViewController.inventoryView);
router.put('/jv-entry-view',authenticateToken, MonthsAccountViewController.jvEntryView);
router.put('/jvf-entry-view',authenticateToken, MonthsAccountViewController.jvfEntryView);
router.put('/jvm-entry-view',authenticateToken, MonthsAccountViewController.jvmEntryView);
router.put('/sales-view',authenticateToken, MonthsAccountViewController.salesView);
router.put('/sales-gst-view',authenticateToken, MonthsAccountViewController.salesGstView);
router.put('/select-company-view',authenticateToken, MonthsAccountViewController.selectCompanyView);
router.put('/ui-view',authenticateToken, MonthsAccountViewController.uiView);
// router.get('/final/view/get', finalViewController.finalViewGet);

module.exports = router;
