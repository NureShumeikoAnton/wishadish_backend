const express = require('express');
const router = express.Router();
const {generateToken, confirmReset, resetPassword} = require('../controllers/ResetController.js');

router.post('/', generateToken);
router.get('/final', confirmReset);
router.post('/reset', resetPassword);

module.exports = router;