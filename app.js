let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
require('dotenv').config();
const cors = require('cors')
const tokenAuth = require('./middlewares/token-auth');

let indexRouter = require('./routes/index');
let apiAuthRouter = require('./routes/api/auth');
let apiCompanyRouter = require('./routes/api/company');
let apiStaffRouter = require('./routes/api/staff');
let apiBrandRouter = require('./routes/api/brand');
let apiUploadRouter = require('./routes/api/upload');
let apiSeriesRouter = require('./routes/api/series');

let app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// CORS 跨域配置
app.use(cors());

app.use('/', indexRouter);
app.use('/api/auth', apiAuthRouter);
app.use('/api/company', tokenAuth, apiCompanyRouter);
app.use('/api/staff', tokenAuth, apiStaffRouter);
app.use('/api/brand', apiBrandRouter);
app.use('/api/upload', apiUploadRouter);
app.use('/api/series', apiSeriesRouter);

module.exports = app;
