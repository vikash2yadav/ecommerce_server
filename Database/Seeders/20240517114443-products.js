'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return await queryInterface.bulkInsert("products", [
      {
        name: 'book',
        slug: 'book/',
        suplier_id: 2,
        title: 'this is nice book',
        description: 'very important book', 
        category_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'bat',
        suplier_id: 1,
        slug: '/bat-',
        title: 'english willow bat',
        description: 'this is light weight bat',
        category_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    return await queryInterface.bulkDelete("products", null, {});
  }
};
