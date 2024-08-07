'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return await queryInterface.bulkInsert("products", [
      {
        name: 'book',
        vendor_id: 2, 
        category_id: 2,
        sku: 'book12',
        keywords: 'books, new books',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'bat',
        vendor_id: 1,
        category_id: 1,
        sku: 'bat1',
        keywords: 'bat, wooden bat',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    return await queryInterface.bulkDelete("products", null, {});
  }
};
