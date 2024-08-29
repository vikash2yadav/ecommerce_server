'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return await queryInterface.bulkInsert("cart_items", [
      {
        cart_id: 1,
        product_id: 2,
        product_variant_id:1,
        vendor_id: 1,
        quantity: 2,
        total_price: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        cart_id: 1,
        product_id: 1,
        product_variant_id:2,
        vendor_id: 1,
        quantity: 1,
        total_price: 200,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    return await queryInterface.bulkDelete("cart_items", null, {});
  }
};
