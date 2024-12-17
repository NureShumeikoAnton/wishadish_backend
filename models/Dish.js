const {DataTypes} = require('sequelize');
const db = require('../config/db.config.js');

const Dish = db.sequelize.define('Dish', {
    dishId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    description: {
        type: DataTypes.STRING(255)
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    imageUrl: {
        type: DataTypes.STRING(255)
    },
    category: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
}, {
    tableName: 'dish',
    timestamps: false
});

module.exports = Dish;