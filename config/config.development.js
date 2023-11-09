'use strict';

module.exports = {
	port: 3529,
	log_level: "debug",
	webConfig: {
		NODE_ENV: "development",
		USER_URL: "http://172.16.70.239:10000/", // 本地用户平台url
		Sandbox_URL: "https://sandbox.venuseye.com.cn", // 云沙箱URL
		IPGEO_URL: "bluespace/api/v1/ip-geo/", // 地理位置
		TIP_URL: "http://172.16.70.238:10001/" // TIP地址
	},
	USER_API: "http://172.16.70.239:30000/", // 本地用户平台API
	BASE_API: "http://172.16.70.207:50002/", // 基础API
	// BASE_API: "http://172.16.70.207/", // 基础API

}