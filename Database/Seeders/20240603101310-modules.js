"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert("modules", [
      {
        name: "admin",
        created_by: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "customer",
        created_by: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "vendor",
        created_by: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "delivery partner",
        created_by: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "category",
        created_by: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "product",
        created_by: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "cart",
        created_by: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "order",
        created_by: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete("modules", null, {});
  },
};
