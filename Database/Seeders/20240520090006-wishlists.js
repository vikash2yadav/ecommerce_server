'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("wishlists", [
      {
        product_id:1,
        user_id: 2
      },
      {
        product_id:2,
        user_id: 1
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete("wishlists", null, {});
  }
};
