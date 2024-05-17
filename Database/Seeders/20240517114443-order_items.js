'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("order_items", [
      {
        order_id: 1,
        product_id: 2,
        quantity: 1,
        unit_price: 200,
        discount: 10,
        totoal_amount: 200
      },
      {
        order_id: 2,
        product_id: 3,
        quantity: 2,
        unit_price: 2000,
        discount: 200,
        totoal_amount: 200
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    return await queryInterface.bulkDelete('order_items', null, {});

  }
};
