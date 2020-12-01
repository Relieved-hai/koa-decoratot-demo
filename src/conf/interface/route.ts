import { ctxType, nextType } from "../type/route";

interface IMiddlewareFun {
  (ctx: ctxType, next: nextType): void
}

export {
  IMiddlewareFun
}
