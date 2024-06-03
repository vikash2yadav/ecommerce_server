'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return await queryInterface.bulkInsert("shipped_addresses", [
      {
        street: 'new area',
        area: 'area',
        pin_code: 231213,
        city_id: 1, 
        state_id: 3,
        country_id: 9,
        createdAt: new Date(),
        updatedAt: new Date()
      },
     ])
  },

  async down (queryInterface, Sequelize) {
    return await queryInterface.bulkDelete('shipped_addresses', null, {});
  }
};
