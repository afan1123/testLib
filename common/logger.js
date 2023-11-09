
const log4js = require('log4js')
const config = require('../config/index'); 


log4js.configure({
	appenders: {
		out: {
			type: 'stdout'
		},
		app: {
			type: 'file',
			filename: 'logs/ve.log'
		}
	},
	categories: {
		default: {
			appenders: ['out', 'app'],
			level: config.log_level||'debug'
		}
	}
});

module.exports = log4js.getLogger('app');