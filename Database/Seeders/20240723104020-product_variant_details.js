'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return await queryInterface.bulkInsert("product_variant_details", [
      {
        product_id: 1,
        strike_price: 2000,
        price: 1200,
        stock: 20,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        product_id: 2,
        strike_price: 23000,
        price: 13200,
        stock: 203,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    return await queryInterface.bulkDelete("product_variant_details", null, {});
  }
};
