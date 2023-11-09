'use strict';

const utils = require('../common').utils
const { defConfig } = require('../common/hw')
const config = {
	version: '1.0.0',
	pkg: require('../package.json'),
	root_path: __dirname,
	log_level: "info",
	webConfig: {
		PRODUCT_NAME: '火花情报站'
	},
	TextConfig: defConfig
};

module.exports = utils.loadEnvFile(__dirname, config)