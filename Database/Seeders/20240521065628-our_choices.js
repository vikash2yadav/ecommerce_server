'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("our_choices", [
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
    return queryInterface.bulkDelete("our_choices", null, {});
  }
};
