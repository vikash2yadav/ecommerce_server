'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return await  queryInterface.bulkInsert('users', [
      {
          first_name: "Ralph",
          last_name: "Adam",
          full_name: "Ralph Adam",
          username: "ralph_adam",
          birth_date: "1984-10-26",
          gender: "male",
          email: "ralph@mailinator.com",
          password: "$2b$10$Ku1kgHoY63PoR5LyFsZCvOXvCqHZxPjSsXjXSbtb2janNb46J2KQ2", //123123123
          contact_no: 6352416987,
          profile_image: "/users/download__1__1709894033875_25399.jpg",
          country_code: "+91",
          user_address_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
      },
      {
          first_name: "John",
          last_name: "Adam",
          full_name: "John Adam",
          username: "john_adam",
          birth_date: "1974-10-20",
          gender: "male",
          email: "john@mailinator.com",
          password: "$2b$10$fbezhkTs/AZxk73JqJchyesTFiBR.xs8OQeF8FQDYTGkIt7smpJ32", //123123123
          profile_image: "/users/Noise_Mettle_Smart_Watch_493838766_i_1_1200Wx1200H_300Wx300H_1709892928314_44099.jpg",
          contact_no: 6352417654,
          country_code: "+91",
          user_address_id: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
      },
      {
          first_name: "Sunny",
          last_name: "Deol",
          full_name: "Sunny Deol",
          username: "sunny_deol",
          birth_date: "1974-10-20",
          gender: "male",
          email: "sunny@mailinator.com",
          password: "$2b$10$BMGwHY/yy3PslnCClujfYuV62kAtzLA237.kIZvX7UATB3iRbMREO", //123123123
          profile_image: "/users/Noise_Mettle_Smart_Watch_493838766_i_1_1200Wx1200H_300Wx300H_1709892928314_44099.jpg",
          contact_no: 63524169874,
          country_code: "+91",
          user_address_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
      },
  ]);
},

  async down (queryInterface, Sequelize) {
    return await queryInterface.bulkDelete('users', null, {});
  }
};
