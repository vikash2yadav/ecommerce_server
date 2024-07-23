'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return await queryInterface.bulkInsert("product_variant_details", [
      {
        sku: 'grs1',
        strike_price: 2000,
        price: 1200,
        stock: 20,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sku: 'grs133',
        strike_price: 23000,
        price: 13200,
        stock: 203,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
