import 'reflect-metadata'
import { IMiddlewareFun } from "../conf/interface/route";

export const use = (middleware: IMiddlewareFun) => {
  return (target: any, key: string) => {
    const originMiddlewares = Reflect.getMetadata('middlewares', target, key) || [];
    Reflect.defineMetadata('middlewares', [middleware, ...originMiddlewares], target, key)
  }
}

