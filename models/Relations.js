const sequelize = require('../config/db.config.js');
const Dish = require('./Dish.js');
const Order = require('./Order.js');
const OrderDish = require('./OrderDish.js');
const User = require('./User.js');

Order.belongsTo(User, {
    foreignKey: 'userId'
});

User.hasMany(Order, {
    foreignKey: 'userId'
});

Order.belongsToMany(Dish, {
    through: OrderDish,
    foreignKey: 'orderId'
});

Dish.belongsToMany(Order, {
    through: OrderDish,
    foreignKey: 'dishId'
});

module.exports = {
    sequelize,
    User,
    Dish,
    Order,
    OrderDish
};