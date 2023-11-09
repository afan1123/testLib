// build/IP.js
const os = require('os')

module.exports = (function() {
  const ifaces = os.networkInterfaces()
  let ip = ''
  for (const dev in ifaces) {
    ifaces[dev].forEach(function(details) {
      if (ip === '' && details.family === 'IPv4' && !details.internal) {
        ip = details.address
        return
      }
    })
  }

  return ip || 'localhost'
})()
