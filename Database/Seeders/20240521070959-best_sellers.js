'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("best_sellers", [
      {
        category_id: 3,
        product_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category_id: 2,
        product_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete("best_sellers", null, {});
  }
};
