'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return await queryInterface.bulkInsert("product_highlights", [
      {
        product_id: 1,
        content: 'this is very thin product',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        product_id: 2,
        content: 'price is most loyal',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        product_id: 2,
        content: 'ease to use and throw',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    return await queryInterface.bulkDelete("product_highlights", null, {});
  }
};
