let express = require("express");
let router = express.Router();
const { Company, Staff } = require("../../models");
const { Op } = require("sequelize");
const { BadRequestError, UnauthorizedError } = require("../../utils/errors");
const { success, failure } = require("../../utils/responses");

/**
 * 公共方法：白名单过滤
 */
function filterUpdate(req) {
  return {
    staffName: req.body.staffName,
    staffMobile: req.body.staffMobile,
    staffRemark: req.body.staffRemark,
    staffRole: req.body.staffRole,
  };
}

function filterAdd(req) {
  return {
    companyId: req.body.companyId,
    staffName: req.body.staffName,
    staffPassword: req.body.staffPassword,
    staffMobile: req.body.staffMobile,
    staffRemark: req.body.staffRemark,
    staffRole: req.body.staffRole,
    staffStatus: req.body.staffStatus,
  };
}

/**
 * 公共方法：关联公司
 */
function getCondition() {
  return {
    include: [
      {
        model: Company,
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
      },
    ],
  };
}

/**
 * 公共方法：查询员工
 */
async function getStaffInfo(req) {
  // 获取员工 ID
  const { id } = req.params;

  const condition = getCondition();

  // 查询员工
  const staff = await Staff.findByPk(id, condition);

  // 如果没有找到，就抛出异常
  if (!staff) {
    throw new BadRequestError("The staff does not exist");
  }

  return staff;
}

/**
 * 公共方法：判断该员工是否为企业管理
 */
async function isCompanyLegal(staffMobile, companyId) {
  // 查询公司
  const company = await Company.findByPk(companyId);

  // 如果没有找到，就抛出异常
  if (company.companyMobile === staffMobile) {
    return true;
  } else {
    return false;
  }
}

/**
 * 查询员工列表
 * GET /api/staff/getStaffList
 */
router.get("/getStaffList", async function (req, res, next) {
  try {
    const query = req.query;
    const condition = {
      ...getCondition(),
      order: [["createdAt", "DESC"]],
      where: {},
    };
    if (query.staffStatus) {
      condition.where.staffStatus = {
        [Op.eq]: query.staffStatus,
      };
    }
    if (query.companyId) {
      condition.where.companyId = {
        [Op.eq]: query.companyId,
      };
    }
    const staffs = await Staff.findAll(condition);
    success(res, "Query success", staffs);
  } catch (err) {
    failure(res, err);
  }
});

/**
 * 分页查询员工列表
 * GET /api/staff/getStaffListByPage
 */
router.get("/getStaffListByPage", async function (req, res, next) {
  try {
    // 分页信息
    const query = req.query;
    const currentPage = Math.abs(Number(query.currentPage)) || 1;
    const pageSize = Math.abs(Number(query.pageSize)) || 10;
    const offset = (currentPage - 1) * pageSize;
    const condition = {
      ...getCondition(),
      order: [["createdAt", "DESC"]],
      limit: pageSize,
      offset: offset,
      where: {},
      distinct: true,
    };
    let companyId;
    if (req.staff.staffRole === 2) {
      throw new UnauthorizedError(
        "You do not have permission to access this interface"
      );
    }
    if (req.staff.staffRole === 1) {
      companyId = req.staff.companyId;
    }
    if (req.staff.staffRole === 0) {
      companyId = query.companyId;
    }
    if (companyId) {
      condition.where.companyId = {
        [Op.eq]: companyId,
      };
    }
    if (query.staffStatus) {
      condition.where.staffStatus = {
        [Op.eq]: query.staffStatus,
      };
    }
    if (query.staffName) {
      condition.where.staffName = {
        [Op.like]: `%${query.staffName}%`,
      };
    }
    if (query.staffRole) {
      condition.where.staffRole = {
        [Op.eq]: query.staffRole,
      };
    }
    if (query.staffMobile) {
      condition.where.staffMobile = {
        [Op.eq]: query.staffMobile,
      };
    }
    const { count, rows } = await Staff.findAndCountAll(condition);
    const totalPages = Math.ceil(count / pageSize);
    success(res, "Query success", {
      data: rows,
      total: count,
      totalPages,
      currentPage,
      pageSize,
    });
  } catch (err) {
    failure(res, err);
  }
});

/**
 * 查询员工详情
 * GET /api/staff/getStaffInfo/:id
 */
router.get("/getStaffInfo/:id", async function (req, res, next) {
  try {
    const staff = await getStaffInfo(req);
    success(res, "Query success", staff);
  } catch (err) {
    failure(res, err);
  }
});

/**
 * 新增员工
 * POST /api/staff/addStaffInfo
 */
router.post("/addStaffInfo", async function (req, res, next) {
  try {
    const body = filterAdd(req);
    if (req.staff.staffRole === 2) {
      throw new UnauthorizedError(
        "You do not have permission to access this interface"
      );
    }
    if (req.staff.staffRole === 1) {
      body.companyId = req.staff.companyId;
    }
    const staff = await Staff.create(body);
    success(res, "Add Success", staff, 201);
  } catch (err) {
    failure(res, err);
  }
});

/**
 * 更改员工状态
 * PUT /api/staff/updateStaffStatus/:id
 */
router.put("/updateStaffStatus/:id", async function (req, res, next) {
  try {
    if (req.staff.staffRole === 2) {
      throw new UnauthorizedError(
        "You do not have permission to access this interface"
      );
    }
    const staff = await getStaffInfo(req);
    const isLegal = await isCompanyLegal(staff.staffMobile, staff.companyId);
    if (isLegal) {
      throw new UnauthorizedError(
        "The staff is an enterprise legal person, AND-not operation"
      );
    }
    staff.staffStatus = req.body.staffStatus;
    await staff.save();
    success(res, "Update success");
  } catch (err) {
    failure(res, err);
  }
});

/**
 * 更改员工登陆密码
 * PUT /api/staff/updateStaffPassword/:id
 */
router.put("/updateStaffPassword/:id", async function (req, res, next) {
  try {
    const staff = await getStaffInfo(req);
    staff.staffPassword = req.body.staffPassword;
    await staff.save();
    success(res, "Update success");
  } catch (err) {
    failure(res, err);
  }
});

/**
 * 更新员工
 * PUT /api/staff/updateStaffInfo/:id
 */
router.put("/updateStaffInfo/:id", async function (req, res, next) {
  try {
    if (req.staff.staffRole === 2) {
      throw new UnauthorizedError(
        "You do not have permission to access this interface"
      );
    }
    const staff = await getStaffInfo(req);
    const isLegal = await isCompanyLegal(staff.staffMobile, staff.companyId);
    if (isLegal) {
      throw new UnauthorizedError(
        "The staff is an enterprise legal person, AND-not operation"
      );
    }
    const body = filterUpdate(req);
    await staff.update(body);
    success(res, "Update success", staff);
  } catch (err) {
    failure(res, err);
  }
});

/**
 * 删除员工信息
 * DELETE /api/staff/deleteStaffInfo/:id
 */
router.delete("/deleteStaffInfo/:id", async function (req, res, next) {
  try {
    if (req.staff.staffRole === 2) {
      throw new UnauthorizedError(
        "You do not have permission to access this interface"
      );
    }
    const staff = await getStaffInfo(req);
    const isLegal = await isCompanyLegal(staff.staffMobile, staff.companyId);
    if (isLegal) {
      throw new UnauthorizedError(
        "The staff is an enterprise legal person, AND-not operation"
      );
    }
    await staff.destroy();
    success(res, "Delete success");
  } catch (err) {
    failure(res, err);
  }
});

module.exports = router;
