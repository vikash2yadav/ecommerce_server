'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("user_coupon_relations", [
      {
        user_id: 1,
        coupon_id: 2
      },
      {
        user_id: 2,
        coupon_id: 1
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("user_coupon_relations", null, {});
  }
};
