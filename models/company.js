"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Company.hasMany(models.Staff, {foreignKey: 'companyId'});
    }
  }
  Company.init(
    {
      companyName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Company Name can't be allow null",
          },
          notEmpty: {
            msg: "Company Name can't be allow null",
          },
        },
      },
      companyCode: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Company Code can't be allow null",
          },
          notEmpty: {
            msg: "Company Code can't be allow null",
          },
        },
      },
      companyContact: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Company Contact Name can't be allow null",
          },
          notEmpty: {
            msg: "Company Contact Name can't be allow null",
          },
        },
      },
      companyMobile: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Company Mobile can't be allow null",
          },
          notEmpty: {
            msg: "Company Mobile can't be allow null",
          },
        },
      },
      companyRemark: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      companyBalance: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Company Balance can't be allow null",
          },
          notEmpty: {
            msg: "Company Balance can't be allow null",
          },
        },
      },
      companyStatus: {
        type: DataTypes.TINYINT.UNSIGNED,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Company Status can't be allow null",
          },
          notEmpty: {
            msg: "Company Status can't be allow null",
          },
        },
        isIn: {
          args: [[0, 1]],
          msg: "Company Status can only be '0,1'", // 0 启用 1禁用
        },
      },
    },
    {
      sequelize,
      modelName: "Company",
    }
  );
  return Company;
};
