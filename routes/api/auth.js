const express = require("express");
const router = express.Router();
const { Staff, Company } = require("../../models");
const { Op } = require("sequelize");
const { BadRequestError, UnauthorizedError } = require("../../utils/errors");
const { success, failure } = require("../../utils/responses");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/**
 * 后台登录
 * POST /api/auth/login
 */
router.post("/login", async (req, res) => {
  try {
    const { companyName, phoneNumber, password } = req.body;

    if (!companyName) {
      throw new BadRequestError("Company Name can't be allow null");
    }

    if (!phoneNumber) {
      throw new BadRequestError("Phone Number can't be allow null");
    }

    if (!password) {
      throw new BadRequestError("Password can't be allow null");
    }

    const conditionCompany = {
      attributes: [
        "id",
        "companyName",
        "companyCode",
        "companyContact",
        "companyMobile",
        "companyRemark",
        "companyStatus",
        "createdAt",
        "updatedAt",
      ],
      where: {
        companyName: {
          [Op.eq]: companyName,
        },
        companyStatus: {
          [Op.eq]: 0,
        },
      },
    };

    // 通过公司名称检验公司是否正常使用
    const company = await Company.findOne(conditionCompany);

    if (!company) {
      throw new BadRequestError(
        "Please enter a valid company name or contact the administrator to enter the company information"
      );
    }

    // 通过手机号，查询用户是否存在
    const conditionStaff = {
      where: {
        staffMobile: {
          [Op.eq]: phoneNumber,
        },
        staffStatus: {
          [Op.eq]: 0,
        },
      },
    };

    const staff = await Staff.findOne(conditionStaff);

    if (!staff) {
      throw new BadRequestError("Please enter a valid phone number");
    }

    // 验证密码
    const isPasswordValid = bcrypt.compareSync(password, staff.staffPassword);

    if (!isPasswordValid) {
      throw new BadRequestError("Wrong password");
    }

    // 生成身份验证令牌
    const token = jwt.sign(
      {
        companyId: company.id,
        staffId: staff.id,
        role: staff.staffRole,
      },
      process.env.SECRET,
      { expiresIn: "1d" }
    );

    success(res, "Login success", {
      company,
      staff,
      token,
    });
  } catch (err) {
    failure(res, err);
  }
});

module.exports = router;
