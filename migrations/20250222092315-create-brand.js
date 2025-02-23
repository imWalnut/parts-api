'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Brands', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      brandName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      brandLogo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      brandRemark: {
        type: Sequelize.STRING(1000),
        allowNull: true,
      },
      brandStatus: {
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
    await queryInterface.addIndex("Brands", {
      fields: ["brandName"], // 要索引的字段
      unique: true, // 唯一索引
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Brands');
  }
};