const { DataTypes } = require('sequelize');
const db = require('../config/db.config.js');

const OrderDish = db.sequelize.define('OrderDish', {
    orderId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'order',
            key: 'orderId'
        },
        allowNull: false,
        primaryKey: true
    },
    dishId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'dish',
            key: 'dishId'
        },
        allowNull: false,
        primaryKey: true
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    }
}, {
    tableName: 'order_dish',
    timestamps: false
});

module.exports = OrderDish;
