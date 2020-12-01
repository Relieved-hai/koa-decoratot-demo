import { ctxType, nextType } from "../../conf/type/route";
import { get, post, controller } from "../../decorator";

const { isProd } = require('../../utils/env')

@controller('/swagger.json')
export class ErrorPage {
  @get('/')
  getNotFound(ctx: ctxType) {
    ctx.body = isProd ? '' : require('../../../swagger.json');
  }
}
