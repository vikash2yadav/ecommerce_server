'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert("product_variants", [
      {
        product_id: 1,
        attribute_id: 1,
        attribute_value: "red",
        is_default: 1,
      },
      {
        product_id: 2,
        attribute_id: 2,
        attribute_value: "small",
        is_default: 0
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete('product_variants', null, {});
  }
};
