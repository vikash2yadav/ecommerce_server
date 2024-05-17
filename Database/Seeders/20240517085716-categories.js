'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('categories', [{
      name: "electronic",
      slug: "electronic_gadgets",
      created_by:1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: "hardware",
      slug: "hardware_gadgets",
      created_by:2,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: "software",
      slug: "software_gadgets",
      created_by:1,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};