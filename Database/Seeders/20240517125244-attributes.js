'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return await queryInterface.bulkInsert("attributes", [
      { name: "color",  },
      { name: "size" },
    ])
  },

  async down (queryInterface, Sequelize) {
    return await queryInterface.bulkDelete("attributes", null, {});
  }
};
