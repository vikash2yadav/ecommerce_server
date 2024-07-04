'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return await queryInterface.bulkInsert("attribute_values", [
      { attribute_id: 1, value: 'red' },
      { attribute_id: 2, value: 'smalll' },
    ])
  },
  

  async down (queryInterface, Sequelize) {
    return await queryInterface.bulkDelete("attribute_values", null, {});
  }
};
