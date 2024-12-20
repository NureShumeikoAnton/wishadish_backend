const {DataTypes} = require('sequelize');
const db = require('../config/db.config.js');

const Order = db.sequelize.define('Order', {
    orderId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    deliveryTime: {
        type: DataTypes.DATE
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
}, {
    tableName: 'order',
    timestamps: false
});

module.exports = Order;