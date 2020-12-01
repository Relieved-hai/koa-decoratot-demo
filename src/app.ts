import Koa from 'koa';
import session from 'koa-generic-session';
import bodyParser from 'koa-bodyparser'
import logger from 'koa-logger'
import json from 'koa-json'
import router from "./router";
import { sessionOps, SESSION_SECRET_KEY } from "./conf/db/conf";
import { initRouter } from './utils/loader'
import errorHandler from './middleware/error_handler'

const app = new Koa();
app.use(errorHandler())

initRouter(app);

app.keys = [SESSION_SECRET_KEY]
app.use(session(sessionOps))
app.use(bodyParser({ enableTypes: ['json', 'form', 'text'] }))
app.use(json())
app.use(logger())

app.use(router.routes()).use(router.allowedMethods())

export default app
