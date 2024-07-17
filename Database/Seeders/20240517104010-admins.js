'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return await  queryInterface.bulkInsert('admins', [
      {
          first_name: "super",
          last_name: "Admin",
          full_name: "Super Admin",
          birth_date: "1984-10-26",
          gender: "male",
          email: "super_admin@mailinator.com",
          password: "$2b$10$Ku1kgHoY63PoR5LyFsZCvOXvCqHZxPjSsXjXSbtb2janNb46J2KQ2", //123123123
          contact_no: 6352416987,
          profile_image: "/users/download__1__1709894033875_25399.jpg",
          role_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
      },
      {
          first_name: "Only",
          last_name: "Admin",
          full_name: "Only Admin",
          birth_date: "1974-10-20",
          gender: "male",
          email: "admin@mailinator.com",
          password: "$2b$10$fbezhkTs/AZxk73JqJchyesTFiBR.xs8OQeF8FQDYTGkIt7smpJ32", //123123123
          profile_image: "/users/Noise_Mettle_Smart_Watch_493838766_i_1_1200Wx1200H_300Wx300H_1709892928314_44099.jpg",
          contact_no: 6352417654,
          role_id: 2,
          created_by: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
      },
  ]);
  },

  async down (queryInterface, Sequelize) {
    return await queryInterface.bulkDelete('admins', null, {});
  }
};
