'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("product_faq_reactions", [
      {
        product_faq_id: 1,
        user_id: 2,
        reaction_type: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        product_faq_id: 2,
        user_id: 1,
        reaction_type: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete("product_faq_reactions", null, {});
  }
};
