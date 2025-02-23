'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Series extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Series.init({
    brandId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Brand can't be allow null",
        },
        notEmpty: {
          msg: "Brand can't be allow null",
        },
      },
    },
    seriesName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Series Name can't be allow null",
        },
        notEmpty: {
          msg: "Series Name can't be allow null",
        },
      },
    },
    seriesImg: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Series Image can't be allow null",
        },
        notEmpty: {
          msg: "Series Image can't be allow null",
        },
      },
    },
    seriesRemark: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    seriesStart: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Series Start Date can't be allow null",
        },
        notEmpty: {
          msg: "Series Start Date can't be allow null",
        },
      },
    },
    seriesEnd: {
      type: DataTypes.DATE,
    }
  }, {
    sequelize,
    modelName: 'Series',
  });
  return Series;
};