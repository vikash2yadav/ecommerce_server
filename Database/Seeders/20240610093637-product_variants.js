'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert("product_variants", [
      {
        product_id: 1,
        attribute_id: 1,
        attribute_value_id: 1,
        price: 2000,
        discount: 10,
        stock: 2,
        weight: '2',
        is_default: 1,
        dimensions: '2 * 3* 6',
        material: 'wood',
        image: 'red_image'
      },
      {
        product_id: 2,
        attribute_id: 2,
        attribute_value_id: 1,
        price: 1000,
        discount: 30,
        stock: 20,
        weight: '20',
        is_default: 0,
        dimensions: '2 * 3* 6',
        material: 'wood',
        image: 'red_image'
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete('product_variants', null, {});
  }
};
