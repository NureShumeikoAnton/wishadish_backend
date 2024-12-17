const express = require('express');
const router = express.Router();
const {getAllOrders, getOrderById, createOrder} = require('../controllers/OrderController.js');

router.get('/', getAllOrders);
router.post('/', createOrder);
router.get('/:orderId', getOrderById);

module.exports = router;