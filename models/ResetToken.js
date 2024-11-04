const {DataTypes} = require('sequelize');
const db = require('../config/db.config.js');
const User = require('../models/User.js');

const ResetToken = db.sequelize.define('ResetToken', {
    tokenId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'userId',
        },
    },
    token: {
        type: DataTypes.STRING(200)
    }
}, {
    tableName: 'resetToken',
    timestamps: false
});

ResetToken.associate = (models) => {
    ResetToken.hasOne(models.User, { foreignKey: 'userId' });
};

module.exports = ResetToken;