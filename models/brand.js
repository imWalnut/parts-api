'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Brand extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Brand.init({
    brandName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Brand Name can't be allow null",
        },
        notEmpty: {
          msg: "Brand Name can't be allow null",
        },
      },
    },
    brandLogo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Brand Logo can't be allow null",
        },
        notEmpty: {
          msg: "Brand Logo can't be allow null",
        },
      },
    },
    brandRemark: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    brandStatus: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Brand Status can't be allow null",
        },
        notEmpty: {
          msg: "Brand Status can't be allow null",
        },
      },
      isIn: {
        args: [[0, 1]],
        msg: "Brand Status can only be '0,1'", // 0 启用 1禁用
      },
    }
  }, {
    sequelize,
    modelName: 'Brand',
  });
  return Brand;
};