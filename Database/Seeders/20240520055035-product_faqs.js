'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("product_faqs", [
      {
        product_id: 1,
        question: 'what is this product',
        answer: "This is smart book"
      },
      {
        product_id: 1,
        question: 'Is it expensive',
        answer: "No, it is under your budget"
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete("product_faqs", null, {});
  }
};
