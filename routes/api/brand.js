let express = require('express');
let router = express.Router();
const { Brand } = require("../../models");
const { Op } = require("sequelize");
const { BadRequestError, UnauthorizedError } = require("../../utils/errors");
const { success, failure } = require("../../utils/responses");

/**
 * 公共方法：白名单过滤
 */
function filterUpdate(req) {
  return {
    brandName: req.body.brandName,
    brandLogo: req.body.brandLogo,
    brandRemark: req.body.brandRemark
  };
}

function filterAdd(req) {
  return {
    brandName: req.body.brandName,
    brandLogo: req.body.brandLogo,
    brandRemark: req.body.brandRemark,
    brandStatus: req.body.brandStatus,
  };
}


/**
 * 公共方法：查询品牌
 */
async function getBrandInfo(req) {
  // 获取品牌 ID
  const { id } = req.params;

  // 查询品牌
  const brand = await Brand.findByPk(id);

  // 如果没有找到，就抛出异常
  if (!brand) {
    throw new BadRequestError("The Brand does not exist");
  }

  return brand;
}

/**
 * 查询品牌列表
 * GET /api/brand/getBrandList
 */
router.get("/getBrandList", async function (req, res, next) {
  try {
    const query = req.query;
    const condition = {
      order: [["brandName", "DESC"]],
      where: {},
    };
    if (query.brandStatus) {
      condition.where.brandStatus = {
        [Op.eq]: query.brandStatus,
      };
    }
    if (query.brandName) {
      condition.where.brandName = {
        [Op.like]: `%${query.brandName}%`,
      };
    }
    const brands = await Brand.findAll(condition);
    success(res, "Query success", brands);
  } catch (err) {
    failure(res, err);
  }
});

/**
 * 新增品牌
 * POST /api/brand/addBrandInfo
 */
router.post("/addBrandInfo", async function (req, res, next) {
  try {
    const body = filterAdd(req);
    // if (req.staff.staffRole !== 0) {
    //   throw new UnauthorizedError(
    //     "You do not have permission to access this interface"
    //   );
    // }
    const brand = await Brand.create(body);
    success(res, "Add Success", brand, 201);
  } catch (err) {
    failure(res, err);
  }
});

/**
 * 更改品牌状态
 * PUT /api/brand/updateBrandStatus/:id
 */
router.put("/updateBrandStatus/:id", async function (req, res, next) {
  try {
    // if (req.staff.staffRole !== 0) {
    //   throw new UnauthorizedError(
    //     "You do not have permission to access this interface"
    //   );
    // }
    const brand = await getBrandInfo(req);
    brand.brandStatus = req.body.brandStatus;
    await brand.save();
    success(res, "Update success");
  } catch (err) {
    failure(res, err);
  }
});

/**
 * 更新品牌
 * PUT /api/brand/updateBrandInfo/:id
 */
router.put("/updateBrandInfo/:id", async function (req, res, next) {
  try {
    // if (req.staff.staffRole !== 0) {
    //   throw new UnauthorizedError(
    //     "You do not have permission to access this interface"
    //   );
    // }
    const brand = await getBrandInfo(req);
    const body = filterUpdate(req);
    await brand.update(body);
    success(res, "Update success", brand);
  } catch (err) {
    failure(res, err);
  }
});

/**
 * 删除品牌信息
 * DELETE /api/brand/deleteBrandInfo/:id
 */
router.delete("/deleteBrandInfo/:id", async function (req, res, next) {
  try {
    // if (req.staff.staffRole !== 0) {
    //   throw new UnauthorizedError(
    //     "You do not have permission to access this interface"
    //   );
    // }
    const brand = await getBrandInfo(req);
    await brand.destroy();
    success(res, "Delete success");
  } catch (err) {
    failure(res, err);
  }
});

module.exports = router;
