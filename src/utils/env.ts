/*
* @Description 环境变量
* @author hai
* */

const ENV = process.env.NODE_ENV

module.exports = {
  idDev: ENV === 'dev',
  notDev: ENV !== 'dev',
  isProd: ENV === 'production',
  notProd: ENV !== 'production',
  isTest: ENV === 'test',
  notTest: ENV !== 'test',
}
