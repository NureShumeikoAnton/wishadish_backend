'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('user', 'uid', {
            type: Sequelize.STRING(255),
            allowNull: false,
            unique: true
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn('user', 'uid');
    }
};
