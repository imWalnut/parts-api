'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Staff extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Staff.belongsTo(models.Company, {foreignKey: 'companyId'});
    }
  }
  Staff.init({
    companyId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Company Id can't be allow null",
        },
        notEmpty: {
          msg: "Company Id can't be allow null",
        },
      },
    },
    staffName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Staff Name can't be allow null",
        },
        notEmpty: {
          msg: "Staff Name can't be allow null",
        },
      },
    },
    staffMobile: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Staff Mobile can't be allow null",
        },
        notEmpty: {
          msg: "Staff Mobile can't be allow null",
        },
      },
    },
    staffPassword: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Staff Password can't be allow null",
        },
        notEmpty: {
          msg: "Staff Password can't be allow null",
        },
      },
    },
    staffRemark: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    staffRole: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Staff Role can't be allow null",
        },
        notEmpty: {
          msg: "Staff Role can't be allow null",
        },
      },
      isIn: {
        args: [[0, 1, 2]],
        msg: "Staff Role can only be '0,1,2'", // 0系统管理 1公司管理 2公司员工
      },
    },
    staffStatus: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Staff Status can't be allow null",
        },
        notEmpty: {
          msg: "Staff Status can't be allow null",
        },
      },
      isIn: {
        args: [[0, 1]],
        msg: "Staff Status can only be '0,1'", // 0 启用 1 禁用
      },
    },
  }, {
    sequelize,
    modelName: 'Staff',
  });
  return Staff;
};