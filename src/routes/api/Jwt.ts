import { ctxType, nextType } from "../../conf/type/route";
import { controller, get, post, required, use } from "../../decorator";
const { getJwt, setJwt } = require('../../utils/jwt-util')

@controller('/jwt', 'jwt 验证')
export class JwtRouter {
  @post('/login-token')
  @required({
    body: ['username', 'password'],
  })
  jwtLogin(ctx: ctxType, next: nextType) {
    ctx.body = {
      message: "登录成功",
      user: 'testName',
      token: setJwt()
    };
  }

  @get('/getUser-token')
  @use(getJwt)
  jwtData(ctx: ctxType, next: nextType) {
    //获取session
    ctx.body = {
      message: "获取数据成功",
      userinfo: ctx.state.user.data
    };
  }
}
