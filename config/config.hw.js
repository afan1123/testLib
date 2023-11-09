'use strict';

const { hwConfig } = require('../common/hw')
module.exports = {
	port: 8080,
	log_level: "error",
	webConfig: {
		NODE_ENV: "hvv",
		USER_URL: "https://auth.venuseye.com.cn/", // 用户管理平台地址
		Sandbox_URL: "https://sandbox.venuseye.com.cn", // 云沙箱URL
		IPGEO_URL: "spark-city/api/v1/ip-geo/", // 地理位置
		TIP_URL: "https://cybercity.venuseye.com.cn/" // TIP地址
	},
  TextConfig: hwConfig,
	USER_API: "https://auth.venuseye.com.cn:30000/", // 用户平台API
	BASE_API: "http://firework:8080/"
}