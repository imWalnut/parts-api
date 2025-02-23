'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Companies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      companyName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      companyCode: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      companyContact: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      companyMobile: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      companyRemark: {
        type: Sequelize.STRING(1000),
        allowNull: true,
      },
      companyBalance: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      companyStatus: {
        type: Sequelize.TINYINT.UNSIGNED,
        allowNull: false,
        defaultValue: 0, // 0启用 1禁用
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    await queryInterface.addIndex("Companies", {
      fields: ["companyName"], // 要索引的字段
      unique: true, // 唯一索引
    });
    await queryInterface.addIndex("Companies", {
      fields: ["companyCode"], // 要索引的字段
      unique: true, // 唯一索引
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Companies');
  }
};