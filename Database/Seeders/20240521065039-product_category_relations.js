'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("product_category_relations", [
      {
        category_id: 1,
        product_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category_id: 1,
        product_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete("product_category_relations", null, {});
  }
};
