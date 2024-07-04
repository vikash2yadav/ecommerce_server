'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   return queryInterface.bulkInsert("coupons", [
    {
      name: "10% off",
      description: "enjoy your shopping",
      value: 10,
      code: "1scD&#e!JdNbxdl",
      expired_time: "2024-08-28",
      created_by: 1
    },
    {
      name: "30% off",
      description: "This is coupone for you",
      value: 30,
      code: "1scDGh03bxdl",
      expired_time: "2024-06-08",
      created_by: 1
    }
   ])
  },

  async down (queryInterface, Sequelize) {
   return queryInterface.bulkDelete("coupons", null, {});
  }
};
