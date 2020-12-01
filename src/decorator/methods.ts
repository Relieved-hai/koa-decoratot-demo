import 'reflect-metadata'
import { Methods } from "../conf/enum/methods";

const setRouter = (type: string) => {
  return (path: string) => {
    return (target: any, key: string) => {
      Reflect.defineMetadata('path', path, target, key)
      Reflect.defineMetadata('method', type, target, key)
    }
  }
}

const get = setRouter(Methods.GET);
const post = setRouter(Methods.POST);

export {
  get,
  post
}
