const { isProd } = require('../../utils/env')

let REDIS_CONF = {
  port: 6379,
  host: '127.0.0.1'
}


// 开发环境
if (isProd) {
  REDIS_CONF = {
    port: 6379,
    host: '127.0.0.1'
  }
}

export {
  REDIS_CONF
}
