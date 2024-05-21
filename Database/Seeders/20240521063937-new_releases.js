'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("new_releases", [
      {
        category_id: 1,
        product_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category_id: 1,
        product_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete("new_releases", null, {});
  }
};
