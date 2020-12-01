const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')();


router.post('/', async (ctx) => {
  console.log(1);
  ctx.body = "首页";
})
router.get('/', async (ctx) => {
  console.log(1);
  ctx.body = "首页";
})

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(8089, () => {
  console.log('启动了');
});
