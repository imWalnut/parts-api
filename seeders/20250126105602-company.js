"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Companies",
      [
        {
          companyName: "苏州勒克司汽配",
          companyCode: "74827829234",
          companyContact: "Walnut",
          companyMobile: "13952666195",
          companyRemark: "Super Company",
          companyBalance: 0,
          companyStatus: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
