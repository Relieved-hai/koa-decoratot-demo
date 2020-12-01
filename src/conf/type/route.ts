import { ExtendableContext } from "koa";
import { IRouterParamContext } from "koa-router";

type ctxType = ExtendableContext & { state: any } & {} & IRouterParamContext<any, {}>;
type nextType = () => Promise<any>;

export {
  ctxType,
  nextType
}
