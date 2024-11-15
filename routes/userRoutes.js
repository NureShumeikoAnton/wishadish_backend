const express = require('express');
const router = express.Router();
const {getAllUsers, createUser, getUserByEmail} = require('../controllers/UserController.js');

router.get('/', getAllUsers);
router.post('/create', createUser);
router.get('/:email', getUserByEmail);


module.exports = router;