'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   return await queryInterface.bulkInsert("orders", [
    {
      user_id: 1,
      orderd_date: "2024-08-04",
      shipped_date: "",
      shipped_address_id: 1,
      total_amoumt: 2000,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      user_id: 2,
      orderd_date: "2024-08-04",
      shipped_date: "",
      shipped_address_id: 2,
      total_amoumt: 20000,
      createdAt: new Date(),
      updatedAt: new Date()
    }
   ]);
  },

  async down (queryInterface, Sequelize) {
    return await queryInterface.bulkDelete('orders', null, {});
  }
};
