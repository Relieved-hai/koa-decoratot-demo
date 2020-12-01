import { ctxType, nextType } from "../../conf/type/route";
import { controller, post, required, use } from "../../decorator";
import { SuccessModel } from "../../model/resModel";

@controller('/login', 'POST 请求测试')
export class PostRouter {
  @post('/')
  @required({
    body: ['password']
  })
  getData(ctx: ctxType, next: nextType) {
    (ctx as any).session.userInfo = { "name": 'koa demo', "age": "18" }

    ctx.body = new SuccessModel(
      '登录成功！'
    )
  }
}
