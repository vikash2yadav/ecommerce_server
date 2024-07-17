'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("languages", [
      {
        name: 'English',
        code: 'en',
        is_default: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Hindi',
        code: 'hn',
        is_default: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Gujarati',
        code: 'gj',
        is_default: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete("languages", null, {});
  }
};
