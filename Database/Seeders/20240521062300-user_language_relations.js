'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("user_language_relations", [
      {
        user_id: 2,
        language_id: 1
      },
      {
        user_id: 1,
        language_id: 1
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("user_language_relations", null, {});
  }
};
