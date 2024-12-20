'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('user', 'password');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn('user', 'password', {
      type: Sequelize.STRING(255),
      allowNull: false
    });
  }
};
