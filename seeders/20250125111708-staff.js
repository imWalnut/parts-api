"use strict";

const bcrypt = require("bcryptjs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Staffs",
      [
        {
          companyId: 1,
          staffName: "Walnut",
          staffMobile: "13952666195",
          staffPassword: bcrypt.hashSync('494609038ycq', 10),
          staffRemark: "Super Admin",
          staffRole: 0,
          staffStatus: 0,
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
