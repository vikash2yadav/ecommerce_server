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
        image: 'image_url',
        category_id: 2,
        price: 2000,
        discount: 20,
        stock: 2,
        weight: "2 kg",
        dimensions: " 2 * 3 * 5 ",
        color: 'red',
        material: 'paper',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'bat',
        suplier_id: 1,
        slug: '/bat-',
        title: 'english willow bat',
        description: 'this is light weight bat',
        image: 'image_url',
        category_id: 1,
        price: 3000,
        discount: 10,
        stock: 1,
        weight: "1.3",
        dimensions: " 2.2 * 0.3 * 0.1 ",
        color: 'wood primary',
        material: 'wood',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    return await queryInterface.bulkDelete("products", null, {});
  }
};
