import { ctxType, nextType } from "../conf/type/route";
import { get, post, controller } from "../decorator";
import { ErrorModel } from "../model/resModel";

@controller('/')
export class ErrorPage {
  @get('*')
  getNotFound(ctx: ctxType) {
    // ctx.throw(404)
    ctx.body = new ErrorModel({
      errno: -1,
      message: '404 Not Found'
    })
  }

  @post('*')
  postNotFound(ctx: ctxType) {
    ctx.body = new ErrorModel({
      errno: -1,
      message: '404 Not Found'
    })
  }
}
