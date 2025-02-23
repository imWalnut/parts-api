const jwt = require("jsonwebtoken");
const { Staff } = require("../models");
const { UnauthorizedError, BadRequestError } = require("../utils/errors");
const { success, failure } = require("../utils/responses");

module.exports = async (req, res, next) => {
  try {
    // 判断 Token 是否存在
    const token = req.headers.authorization;
    if (!token) {
      throw new UnauthorizedError(
        "The current interface requires authentication to access"
      );
    }
    // 验证 token 是否正确
    const decoded = jwt.verify(token, process.env.SECRET);

    // 从 jwt 中，解析出之前存入的 userId
    const { staffId } = decoded;

    // 查询一下，当前用户
    const staff = await Staff.findByPk(staffId);
    if (!staff) {
      throw new BadRequestError("User not exist");
    }

    req.staff = staff;

    next();
  } catch (error) {
    failure(res, error);
  }
};
