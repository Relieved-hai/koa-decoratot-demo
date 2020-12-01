/*
* @Description 连接 Redis 的方法 get set
* @author hai
* */

import redis from 'redis'
import { REDIS_CONF } from '../conf/db/db'

// 创建客户端
const redisClient = redis.createClient(
  REDIS_CONF.port,
  REDIS_CONF.host
)

// 发生错误
redisClient.on('error', err => {
  console.log('redis error', err)
})
