"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Staffs", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
      companyId: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      staffName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      staffMobile: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      staffPassword: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      staffRemark: {
        type: Sequelize.STRING(1000),
        allowNull: true,
      },
      staffRole: {
        type: Sequelize.TINYINT.UNSIGNED,
        allowNull: false,
        defaultValue: 2, // 0系统管理 1公司管理 2公司员工
      },
      staffStatus: {
        type: Sequelize.TINYINT.UNSIGNED,
        allowNull: false,
        defaultValue: 0, // 0启用 1禁用
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
    await queryInterface.addIndex("Staffs", {
      fields: ["staffMobile"], // 要索引的字段
      unique: true, // 唯一索引
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Staffs");
  },
};
