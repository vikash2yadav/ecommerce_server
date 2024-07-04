'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert('user_addresses', [{
      user_name: 'adma john',
      contact_no: 2938383842,
      street: 'new area',
      area: 'area',
      pin_code: 231213,
      user_id: 2,
      city_id: 1,
      state_id: 2,
      country_id: 1,
      instruction: 'keep it safe',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete('user_addresses', null, {});
  }
};
