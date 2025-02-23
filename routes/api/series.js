let express = require('express');
let router = express.Router();
const { Series } = require("../../models");
const { Op } = require("sequelize");
const { BadRequestError, UnauthorizedError } = require("../../utils/errors");
const { success, failure } = require("../../utils/responses");

/**
 * 公共方法：白名单过滤
 */
function filterUpdate(req) {
  return {
    brandId: req.body.brandId,
    seriesName: req.body.seriesName,
    seriesImg: req.body.seriesImg,
    seriesStart: req.body.seriesStart,
    seriesEnd: req.body.seriesEnd,
    seriesRemark: req.body.seriesRemark
  };
}

function filterAdd(req) {
  return {
    brandId: req.body.brandId,
    seriesName: req.body.seriesName,
    seriesImg: req.body.seriesImg,
    seriesStart: req.body.seriesStart,
    seriesEnd: req.body.seriesEnd,
    seriesRemark: req.body.seriesRemark
  };
}


/**
 * 公共方法：查询系列
 */
async function getSeriesInfo(req) {
  // 获取系列 ID
  const { id } = req.params;

  // 查询系列
  const series = await Series.findByPk(id);

  // 如果没有找到，就抛出异常
  if (!series) {
    throw new BadRequestError("The Series does not exist");
  }

  return series;
}

/**
 * 查询系列列表
 * GET /api/series/getSeriesList
 */
router.get("/getSeriesList", async function (req, res, next) {
  try {
    const query = req.query;
    const condition = {
      order: [["seriesName", "ASC"]],
      where: {},
    };
    if (query.brandId) {
      condition.where.brandId = {
        [Op.eq]: query.brandId,
      };
    }
    if (query.seriesName) {
      condition.where.seriesName = {
        [Op.like]: `%${query.seriesName}%`,
      };
    }
    const serieses = await Series.findAll(condition);
    success(res, "Query success", serieses);
  } catch (err) {
    failure(res, err);
  }
});

/**
 * 新增系列
 * POST /api/series/addSeriesInfo
 */
router.post("/addSeriesInfo", async function (req, res, next) {
  try {
    const body = filterAdd(req);
    const series = await Series.create(body);
    success(res, "Add success", series, 201);
  } catch (err) {
    failure(res, err);
  }
});

/**
 * 更新系列
 * PUT /api/series/updateSeriesInfo/:id
 */
router.put("/updateSeriesInfo/:id", async function (req, res, next) {
  try {
    const series = await getSeriesInfo(req);
    const body = filterUpdate(req);
    await series.update(body);
    success(res, "Update success", series);
  } catch (err) {
    failure(res, err);
  }
});

/**
 * 删除系列信息
 * DELETE /api/series/deleteSeriesInfo/:id
 */
router.delete("/deleteSeriesInfo/:id", async function (req, res, next) {
  try {
    const series = await getSeriesInfo(req);
    await series.destroy();
    success(res, "Delete success");
  } catch (err) {
    failure(res, err);
  }
});

module.exports = router;
