import { JWT_SECRET } from "../conf/db/conf";

const jwt = require("jsonwebtoken")
const jwtAuth = require("koa-jwt")

// 生成 token 返回给客户端
const setJwt = () => {
  return jwt.sign(
    {
      data: { test: '123', test1: '456' },
      // 设置 token 过期时间，⼀小时后，秒为单位
      exp: Math.floor(Date.now() / 1000) + 60 * 60
    },
    JWT_SECRET
  )
}

module.exports = {
  // 获取
  getJwt: jwtAuth({ secret: JWT_SECRET }),
  setJwt
}
