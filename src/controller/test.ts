import { ctxType, nextType } from "../conf/type/route";
import { ErrorModel } from "../model/resModel";

const Test1 = async (ctx: ctxType, next: nextType) => {
  console.log('Test1 ~ ~ ~');
  await next()
}

const Test2 = async (ctx: ctxType, next: nextType) => {
  console.log('Test2 ~ ~ ~');
  await next()
}

const authTest = async (ctx: ctxType, next: nextType) => {
  const { userInfo } = (ctx as any).session
  if (!userInfo) {
    ctx.body = new ErrorModel({
      errno: -1,
      message: '请先登录！'
    })
    return
  }
  await next()
}

export {
  Test1,
  Test2,
  authTest
}
