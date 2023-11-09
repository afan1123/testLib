'use strict';
const axios = require('axios')
const FormData = require('form-data')

var utilModule = require('util'),
  moment = require('moment'),
  _ = require('lodash'),
  fs = require('fs'),
  url = require('url'),
  path = require('path'),
  os = require('os');

/**
 * util工具函数集
 * 工具函数来自 lodash和内建util模块
 * @type {[type]}
 */
_.extend(_, utilModule);

var util = module.exports = _;



/**
 * Date格式化
 *
 * @param  {Date} date
 * @param  {String} format @optional 默认为 YYYY-MM-DD HH:mm
 * @return {String}
 * @api public
 */
util.getDateTime = function (date, format) {
  format = format || "YYYY-MM-DD HH:mm";
  return moment(date).utcOffset('+08:00').format(format);
};

/**
 * Date格式化
 * @param {String} format @optional 默认为 YYYY-MM-DD HH:mm
 * @returns {Function}
 */
util.dateFormat = function (format) {
  return function (date) {
    return util.getDateTime(date, format);
  };
};

/**
 * 时间戳
 * @returns {Function}
 */
util.dateTimestamp = function () {
  return function (date) {
    return moment(date).utcOffset('+08:00').unix();
  };
};

/**
 * 获取详细时间精确到秒
 * @param format {String} format @optional 默认为 YYYY-MM-DD HH:mm:ss
 * @returns {*}
 */
util.getDateParticularTime = function (format) {
  format = format || "YYYY-MM-DD HH:mm:ss";
  return moment(new Date()).utcOffset('+08:00').format(format);
};

/**
 * 验证邮箱是否正确
 * @param email
 * @returns {*}
 */
util.testEmail = function (email) {
  var regex = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
  return regex.test(email);
}

/**
 * 随机获取密码
 * @param minLength
 * @param maxLength
 * @returns {string}
 */
util.getPassword = function (minLength, maxLength) {
  if (minLength <= 0) {
    throw new Error('invalid params.');
  }
  minLength = minLength || 8;
  maxLength = maxLength || minLength;
  var text = ['abcdefghijklmnopqrstuvwxyz', 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', '1234567890', '!@#$*'];
  var rand = function (min, max) {
    return Math.floor(Math.max(min, Math.random() * (max + 1)));
  }
  var len = rand(minLength, maxLength);
  var pw = [];
  for (var i = 0; i < len; ++i) {
    var strpos = rand(0, text.length - 1);
    var charPostion = rand(0, text[strpos].length);
    pw.push(text[strpos].charAt(charPostion));
  }
  return pw.join('');
};

/**
 * 删除对象里面的空参数 utils.removeEmpty(user,['a','c']);
 * @param val
 * @returns {boolean}
 */
function isEmpty(val) {
  if (null == val) return true;
  if ('number' == typeof val) return 0 === val;
  if (undefined !== val.length) return 0 === val.length;
  for (var key in val)
    if (val[key]) return false;
  return true;
}

var removeEmpty = util.removeEmpty = function (obj, ignoreArr) {
  var keys = util.keys(obj);
  //忽略空参数
  util.each(keys, function (key) {
    //表示不存在 忽略列表里面    删除
    if (util.indexOf(ignoreArr, key) < 0) {
      if (isEmpty(obj[key])) {
        delete obj[key];
      }
      //列表
      if (util.isArray(obj[key])) {
        util.each(obj[key], function (o) {
          if (isEmpty(o)) {
            delete obj[key];
          } else {
            removeEmpty(o);
          }
        })
      }
    }
  });
  return obj;
}

/**
 * 生成验证码
 * @param codeLength 验证码长度
 * @returns {string}
 */
util.createCode = function (codeLength) {
  var code = '';
  codeLength = codeLength || 6;
  var selectChar = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');
  for (var i = 0; i < codeLength; i++) {
    var charIndex = Math.floor(Math.random() * 36);
    code += selectChar[charIndex];
  }
  return code;
}

/**
 * 得到用户的ip地址
 * @param req
 * @returns {*|string}
 */
// util.getIpAddress = function (req) {
//   var ip = req.ip || '0.0.0.0';
//   if (req.headers['x-real-ip'] || req.headers['x-forwarded-for']) {
//     ip = req.headers['x-real-ip'] || req.headers['x-forwarded-for'];
//   }
//   return ip;
// }

util.getIpAddress = function (req) {
  const ips = req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || // 判断是否有反向代理 IP
    req.connection.remoteAddress || // 判断 connection 的远程 IP
    req.socket.remoteAddress || // 判断后端的 socket 的 IP
    req.connection.socket.remoteAddress ||
    req.ip || 
    '0.0.0.0'
  return ips.split(',')[0]
}

/**
 * 得到本机的ip地址
 * @returns {string}
 */
util.getLocalIP = function () {
  var interfaces = os.networkInterfaces(),
    addresses = [];
  for (var k in interfaces) {
    for (var k2 in interfaces[k]) {
      var address = interfaces[k][k2];
      if (address.family == 'IPv4' && !address.internal) {
        addresses.push(address.address)
      }
    }
  }
  return (addresses.length > 0) ? addresses[0] : '127.0.0.1';
};


/**
 * 加载当前环境下的配置文件
 * @param configFilePath
 * @param config
 * @returns {*}
 */
util.loadEnvFile = function (configFilePath, config) {
  const env = process.env.APP_ENV
  
  let result = config;
  try {
    result = this.merge(config, require(path.join(configFilePath, 'config.' + env)))
  } catch (e) {
    if (~e.message.indexOf('Cannot find module')) {
      console.log('-************** Unable load to <APP_ENV> Config. **************-');
    } else {
      throw e;
    }
  }
  return result;
}

/**
 * 删除相同的属性
 * @param target
 * @param source
 */
util.deleteEqualObject = function (target, source) {
  util.each(source, function (value, key) {
    if (target[key] == value) {
      delete source[key];
    }
  })
}

/**
 * 删除相同的属性
 * @param target
 * @param source
 */
util.retData = function (data) {
  const ret = []
  for (const it in data) {
    ret.push(`${it}=${data[it]}`)
  }
  return ret.join('&')
}

const BAIDU_KEY = 'HSr18h3YG3k4Iijzuo7VyFkSG1kzqH92'
/**
 * WGS84转换百度坐标(bd09ll)
 *
 * @param {*} {lng, lat}
 * @returns
 */
async function WGS84ToBd09ll ({lng, lat}) {
  try {
    const params = {
      coords:`${lng},${lat}`,
      // from:1, 默认 1
      // to:5, 默认 5
      ak:BAIDU_KEY
    }

    const { data: res } = await axios.get('http://api.map.baidu.com/geoconv/v1/', { params })
    if (res.status === 0) {
      const {x: lng, y: lat } = res.result[0]
      return {
        lng,
        lat
      }
    }
    throw new Error('转换坐标失败')
  } catch (error) {
    console.error(error)
  }
}

/**
 * 根据 坐标 逆向地理编码
 *
 * @param {*} {lat<纬度>,lng<经度>}
 * @returns
 */
async function pointToAddress ({lat, lng}) {
  try {
    const params = {
      location:`${lat},${lng}`,
      // coordtype:bd09ll, 默认 bd09ll
      output: 'json',
      ak:BAIDU_KEY
    }

    const { data: res } = await axios.get('http://api.map.baidu.com/reverse_geocoding/v3/', { params })
    if (res.status === 0) {
      const { location, formatted_address, business, addressComponent } = res.result
      return {
        location,
        formatted_address,
        business,
        addressComponent,
      }
    }
    throw new Error('逆向地理编码失败')
  } catch (error) {
    console.error(error)
  }
}
// 上传文件
util.getFileData =  async function (ctx) {
  const formdata = new FormData()
  const file = ctx.request.file || ctx.request.files.file // 获取上传文件
  try {
    const keys = Object.keys(ctx.request.body)
    if (file) {
      formdata.append('file', fs.createReadStream(file.path), file.name) // 拼凑formData
    }
    keys.forEach(key => {
      formdata.append(key, ctx.request.body[key]) // 拼凑formData
    })
    const headers = {
      ...formdata.getHeaders(),
      Authorization: ctx.header.authorization || ctx.request.body.Authorization
    }

    return Promise.resolve({
      headers,
      data: formdata
    })
  } catch (error) {
    return Promise.reject(error)
  }
}
// 验证地域权限函数
util.VerityArea = function (res, cityName) {
  const mapObj = {
    anhui: '安徽省', beijing: '北京市', chongqing: '重庆市', fujian: '福建省', gansu: '甘肃省', guangxi: '广西省', guangdong: '广东省', guizhou: '贵州省', hainan: '海南省', hebei: '河北省', heilongjiang: '黑龙江省', henan: '河南省', hongkong: '香港', hubei: '湖北省', hunan: '湖南省', jiangsu: '江苏省', jiangxi: '江西省', jilin: '吉林省', liaoning: '辽宁省', macao: '澳门', neimongol: '内蒙古省', ningxia: '宁夏', qinghai: '青海省', shaanxi: '陕西省', shandong: '山东省', shanghai: '上海市', shanxi: '山西省', shenzhen: '深圳市', sichuan: '四川省', taiwan: '台湾省', tianjin: '天津市', xinjiang: '新疆省', xizang: '西藏省', yunnan: '云南省', zhejiang: '浙江省'}
  if ((res.code && res.code === 402) || !res.hasOwnProperty('chinese_admin')) return false
  const state = res.chinese_admin.some(v => v.name === 'all')
  if (!state) {
    const arr = Object.keys(mapObj).filter(v => {
      return res.chinese_admin.some(item => item.name === mapObj[v])
    })
    return arr.includes(cityName)
  } else {
    return true
  }
}

util.WGS84ToBd09ll = WGS84ToBd09ll
util.pointToAddress = pointToAddress