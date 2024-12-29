const express = require('express');
const router = express.Router();
const {getOrderCart, getAllOrders, getOrderById, createOrder} = require('../controllers/OrderController.js');

router.get('/', getAllOrders);
router.post('/', createOrder);
router.get('/user', getOrderCart);
router.get('/:orderId', getOrderById);

module.exports = router;