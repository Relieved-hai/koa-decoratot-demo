import { REDIS_CONF } from "./db";
import redisStore from "koa-redis";

// redis config
const redisOps: any = {
  all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
}

// session config
const SESSION_SECRET_KEY = 'UIasd_12*&.'

const sessionOps: any = {
  key: 'koa_demo.sid',
  prefix: 'koa_demo:sess:',
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000
  },
  store: redisStore(redisOps)
}

// jwt config
export const JWT_SECRET = "it's a secret"


export {
  sessionOps,
  SESSION_SECRET_KEY
}
