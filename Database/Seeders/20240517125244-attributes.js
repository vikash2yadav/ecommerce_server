"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert("attributes", [
      { name: "color", createdAt: new Date(), updatedAt: new Date() },
      { name: "size", createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete("attributes", null, {});
  },
};
