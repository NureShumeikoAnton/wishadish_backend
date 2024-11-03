'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('user', {
            userId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            lastName: {
                type: Sequelize.STRING(255)
            },
            firstName: {
                type: Sequelize.STRING(255)
            },
            email: {
                type: Sequelize.STRING(255),
                allowNull: false,
                unique: true
            },
            password: {
                type: Sequelize.STRING(255),
                allowNull: false
            },
            role: {
                type: Sequelize.STRING(255),
                allowNull: false
            },
            phone: {
                type: Sequelize.STRING(255)
            },
            createdAt: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW
            },
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('user');
    }
};
