'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('order_dish', {
      orderDishId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      orderId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'order',
          key: 'orderId'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      dishId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'dish',
          key: 'dishId'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('order_dish');
  }
};