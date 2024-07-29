'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return await queryInterface.bulkInsert("inquiries", [
      {
        name: 'john adam',
        email: 'john@gmail.com',
        phone: '9898934342',
        message: 'how can i register on ecommerce ?',
        createdAt: new Date(),
        updatedAt: new Date() 
      },
      {
        name: 'ralph',
        email: 'ralph@gmail.com',
        phone: '4532432111',
        message: 'there is problem ?',
        createdAt: new Date(),
        updatedAt: new Date() 
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    return await queryInterface.bulkDelete("inquiries", null, {});
  }
};
