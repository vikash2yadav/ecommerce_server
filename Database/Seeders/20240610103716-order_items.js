'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return await queryInterface.bulkInsert("order_items", [
      {
        order_id: 1,
        product_id: 2,
        quantity: 1,
        vendor_id:1,
        product_variant_id: 1,
        attribute: 'color',
        attribute_value: 'red',
        image: 'image',
        unit_price: 200,
        unit_discount: 10,
        total_discount: 10,
        total_amount: 190
      },
      {
        order_id: 2,
        product_id: 1,
        product_variant_id: 1,
        attribute: 'size',
        attribute_value: 'big',
        image: 'image',
        vendor_id: 1,
        quantity: 2,
        unit_price: 2000,
        unit_discount: 200,
        total_discount: 400,
        total_amount: 3600
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    return await queryInterface.bulkDelete('order_items', null, {});

  }
};
