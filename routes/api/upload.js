const express = require('express');
const multer = require('multer')
let fs = require('fs');
const router = express.Router();
const {BadRequestError} = require('../../utils/errors');
const {success, failure} = require('../../utils/responses');
const OSS = require("ali-oss");

// 配置你的OSS信息
const client = new OSS({
    region: 'oss-ap-southeast-7',
    accessKeyId: 'LTAI5tBF7rkpvtuw729L75Qc',
    accessKeySecret: 'oNFstE10nSqhtJla41hAmAeD4AddAc',
    bucket: 'spare-parts-bucket'
});

const upload = multer({ // 不太清楚这是什么，但是必须有这一段
    storage: multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, './public/uploads'); // 必须在上一级有public文件夹，public文件夹内也必须有uploads，当然，文件夹的名称可以随便修改，只需要写对就可以了
        },
        filename: function(req, file, cb) {
            var changedName = new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname;
            cb(null, changedName);
        }
    })
});

/**
 * 文件上传
 * POST /api/upload
 */
router.post('/', upload.single('file'), async function (req, res, next) {
    const file = req.file; // 获取上传的文件
    if (!file) {
        throw new BadRequestError(`未接收到文件`)
    }
    try {
        // 文件路径
        const filePath = './' + file.path;
        const folder = 'image/'; // 指定的OSS文件夹
        const fileName = `${folder}${file.originalname || file.name}`; // 文件名包含文件夹路径
        // 阿里云 上传文件
        const result = await client.put(fileName, file.path); // 上传文件
        fs.unlinkSync(filePath);
        success(res, '文件上传成功', result.url, 201);
    } catch (err) {
        failure(res, err)
    }
});
module.exports = router;