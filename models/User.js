const {DataTypes} = require('sequelize');
const db = require('../config/db.config.js');

const User = db.sequelize.define('User', {
    userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    lastName: {
        type: DataTypes.STRING(255)
    },
    firstName: {
        type: DataTypes.STRING(255)
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true
    },
    role: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING(255)
    },
    uid: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
}, {
    tableName: 'user',
    timestamps: false
});

module.exports = User;
