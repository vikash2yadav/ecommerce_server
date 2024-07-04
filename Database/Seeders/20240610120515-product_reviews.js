'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return await queryInterface.bulkInsert("product_reviews", [
      {
        user_id: 1, 
        product_id: 1,
        product_variant_id:1,
        rating: 2,
        comment: "nice product"
      },
      {
        user_id: 2, 
        product_id: 2,
        product_variant_id: 1,
        rating: 2,
        comment: "worst product"
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    return await queryInterface.bulkDelete("product_reviews", null, {});
  }
};
