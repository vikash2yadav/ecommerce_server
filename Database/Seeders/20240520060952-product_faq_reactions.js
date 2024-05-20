'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("product_faq_reactions", [
      {
        product_faq_id: 1,
        user_id: 2,
        reaction_type: 1,
      },
      {
        product_faq_id: 2,
        user_id: 5,
        reaction_type: 0,
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete("product_faq_reactions", null, {});
  }
};
