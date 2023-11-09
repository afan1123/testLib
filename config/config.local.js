'use strict';

module.exports = {
	port: 8080,
	log_level: "error",
	webConfig: {
		NODE_ENV: "local",
		USER_URL: "http://172.16.70.239:10000/",  // 用户平台url
		Sandbox_URL: "https://sandbox.venuseye.com.cn", // 云沙箱URL
		IPGEO_URL: "bluespace/api/v1/ip-geo/", // 地理位置
		TIP_URL: "http://172.16.70.238:10001/" // TIP地址
	},
	USER_API: "http://172.16.70.239:30000/", // 用户平台接口
	BASE_API: "http://firework:8080/"
	// BASE_API: "http://172.16.70.207:50002/", // 基础API

}