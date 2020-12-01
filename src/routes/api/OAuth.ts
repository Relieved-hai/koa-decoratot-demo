import { ctxType, nextType } from "../../conf/type/route";
import { controller, get, post, required, use } from "../../decorator";

const axios = require('axios')
const querystring = require('querystring')

const config = {
  client_id: '70b9eee8a8a575108d13',
  client_secret: 'f99754496b14351de82d900d6a49f5c9c427726d'
}


@controller('/oauth', 'oauth 验证')
export class OAuthRouter {
  @get('/github/login')
  jwtLogin(ctx: ctxType, next: nextType) {
    const dataStr = (new Date()).valueOf();
    const path = "https://github.com/login/oauth/authorize" + '?client_id=' + config.client_id;

    // 转发到授权服务器器
    ctx.redirect(path);
  }

  @get('/github/callback')
  async jwtData(ctx: ctxType, next: nextType) {
    // 验证码
    const code = ctx.query.code;
    const params = {
      client_id: config.client_id,
      client_secret: config.client_secret,
      code: code
    }

    let res = await axios.post('https://github.com/login/oauth/access_token', params)

    const access_token = querystring.parse(res.data).access_token

    res = await axios.get('https://api.github.com/user?access_token=' + access_token)

    ctx.body = `
        <h1>Hello ${res.data.login}</h1>
        <img src="${res.data.avatar_url}" alt=""/>
    `
  }
}
