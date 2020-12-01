import { ctxType, nextType } from "../conf/type/route";

const { isProd } = require('../utils/env')

const errorHandler = () => {
  return async (ctx: ctxType, next: nextType) => {
    try {
      await next()
    } catch (err) {
      console.log('全局错误捕获：', err);

      const status = err.status || 500

      const error = status === 500 && isProd ? 'Internal Server Error' : err

      ctx.body = {
        code: status,
        error: error
      }
      if (status === 422) {
        ctx.body.detail = err.errors
      }
      ctx.status = 200
    }
  }
}

export default errorHandler
