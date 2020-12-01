import { ctxType, nextType } from "../conf/type/route";
import { ErrorModel } from "../model/resModel";

interface IQueryObj {
  query?: string[],
  body?: string[]
}

interface IGetNoeParams {
  (requiredObj: string[], obj: any): [] | string[]
}

const getNotParams: IGetNoeParams = (requiredObj, obj) => {
  const _notArr = []
  for (let key in requiredObj) {
    if (!obj[requiredObj[key]]) {
      _notArr.push(requiredObj[key])
    }
  }
  return _notArr;
}

export const required = (obj: IQueryObj) => {
  return (target: any, key: string) => {
    const fn = async (ctx: ctxType, next: nextType) => {
      const { query, body } = obj
      let _notQuery: [] | string[] = []
      let _notBody: [] | string[] = []

      if (query) {
        const _q = (ctx.request as any).query;
        _notQuery = getNotParams(query, _q);
      }

      if (body) {
        const _b = (ctx.request as any).body;
        _notBody = getNotParams(body, _b);
      }

      if (_notQuery.length >= 1) {
        ctx.body = new ErrorModel({
          errno: -1,
          message: `${_notQuery ? 'query参数错误：' + _notQuery.toString() : ''}`
        })
        return
      }

      if (_notBody.length >= 1) {
        ctx.body = new ErrorModel({
          errno: -1,
          message: `${_notBody ? 'body参数错误：' + _notBody.toString() : ''}`
        })
        return
      }
      await next();
    }

    const originMiddlewares = Reflect.getMetadata('middlewares', target, key) || [];
    Reflect.defineMetadata('middlewares', [fn, ...originMiddlewares], target, key)
  }
}

