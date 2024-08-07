'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return await queryInterface.bulkInsert("specification_categories", [
      {
        name: 'hardware',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'software',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },
  
  async down (queryInterface, Sequelize) {
    return await queryInterface.bulkDelete("specification_categories", null, {});
  }
};
