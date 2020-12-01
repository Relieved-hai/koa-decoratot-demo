import { ctxType, nextType } from "../../conf/type/route";
import { controller, get, required, use, post } from "../../decorator";
import { ErrorModel, SuccessModel } from "../../model/resModel";
import { authTest, Test2, Test1 } from "../../controller/test";

@controller('/get', 'GET 请求测试')
export class GetRouter {
  @get('/test')
  @use(authTest)
  @use(Test2)
  @use(Test1)
  @required({
    query: ['name', 'password'],
  })
  getParams(ctx: ctxType, next: nextType) {
    // if (true) {
    //   const error: any = new Error()
    //   ctx.status = 500
    //   error.msg = '登录错误'
    //   throw new Error()
    // }
    ctx.body = new SuccessModel(
      (ctx as any).session.userInfo
    );
  }

  @get('/test1')
  test(ctx: ctxType) {
  }

  @post('/test1')
  testpost() {
  }
}
