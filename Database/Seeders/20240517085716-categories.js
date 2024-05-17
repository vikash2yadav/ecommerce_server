'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('categories', [{
      name: "electronic",
      slug: "electronic_gadgets",
      description: 'this is electronic category',
      created_by:1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: "hardware",
      slug: "hardware_gadgets",
      description: 'this is hardware category',
      created_by:2,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: "software",
      slug: "software_gadgets",
      description: 'this is software category',
      created_by:1,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ]);
  },

  async down (queryInterface, Sequelize) {
    return await queryInterface.bulkDelete('categories', null, {});
  }
};
