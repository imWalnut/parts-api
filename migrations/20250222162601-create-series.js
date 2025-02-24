'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Series', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      brandId: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      seriesName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      seriesImg: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      seriesStart: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      seriesEnd: {
        type: Sequelize.DATE
      },
      seriesRemark: {
        type: Sequelize.STRING(1000),
        allowNull: true,
      },
      body: {
        type: Sequelize.BIGINT,
        default: 0,
        allowNull: false,
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
    await queryInterface.addIndex("Series", {
      fields: ["seriesName"], // 要索引的字段
      unique: true, // 唯一索引
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Series');
  }
};