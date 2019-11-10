const express = require('express');
const router = express.Router();



employeesCtrl = require('../controllers/employees');

router.post('/create-user', employeesCtrl.signup);
// router.post('/signin', employeesCtrl);


module.exports = router;