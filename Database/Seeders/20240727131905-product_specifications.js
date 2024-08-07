'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return await queryInterface.bulkInsert("product_specifications", [
      {
        specification_category_id: 1,
        product_id: 1,
        title: 'material',
        value: 'plastic',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        specification_category_id: 2,
        product_id: 2,
        title: 'price',
        value: '2000',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    return await queryInterface.bulkDelete("product_specifications", null, {});
  }
};
