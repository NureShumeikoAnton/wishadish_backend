const {User, Order, OrderDish} = require('../models/Relations');

const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.findAll();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const createOrder = async (req, res) => {
    try {
        const {cart, deliveryTime} = req.body;
        const uid = req.headers['uid'];

        if(!uid) {
            return res.status(400).json({message: 'User not authenticated'});
        }

        if(!cart || cart.length === 0) {
            return res.status(400).json({message: 'Cart is empty'});
        }

        const user = await User.findOne({where: {uid: uid}});

        const newOrder = await Order.create({
            userId: user.userId,
            createdAt: deliveryTime,
            status: 'Pending'
        });

        const orderDishes = [];
        for (const dishId in cart) {
            const quantity = cart[dishId];
            if (quantity > 0) {
                orderDishes.push({
                    orderId: newOrder.orderId,
                    dishId: dishId,
                    quantity: quantity
                });
            }
        }

        await OrderDish.bulkCreate(orderDishes);

        return res.status(201).json(newOrder);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

const getOrderById = async (req, res) => {
    try {
        const {orderId} = req.params;
        const order = await Order.findOne({where: {orderId}});
        if (!order) {
            return res.status(404).json({message: 'Order not found'});
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports = {
    getAllOrders,
    createOrder,
    getOrderById
}