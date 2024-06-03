'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert("modules", [
      { name: "admin", created_by: 1 },
      { name: "customer", created_by: 2 },
      { name: "vendor", created_by: 1 },
      { name: "delivery partner", created_by: 1 },
      { name: "category", created_by: 2 },
      { name: "product", created_by: 1 },
      { name: "cart", created_by: 2 },
      { name: "order", created_by: 1 }
    ])
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete("modules", null, {});
  }
};
