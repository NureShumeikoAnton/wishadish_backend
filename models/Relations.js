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

Order.hasMany(OrderDish, { foreignKey: 'orderId' });
OrderDish.belongsTo(Order, { foreignKey: 'orderId' });

Dish.hasMany(OrderDish, { foreignKey: 'dishId' });
OrderDish.belongsTo(Dish, { foreignKey: 'dishId' });

User.belongsToMany(Dish, {
    through: 'favorites',
    foreignKey: 'userId',
    otherKey: 'dishId',
    timestamps: false
});

Dish.belongsToMany(User, {
    through: 'favorites',
    foreignKey: 'dishId',
    otherKey: 'userId',
    timestamps: false
});

module.exports = {
    sequelize,
    User,
    Dish,
    Order,
    OrderDish
};