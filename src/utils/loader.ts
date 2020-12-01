import fs from 'fs'
import path from 'path'
import koaSwagger from "koa2-swagger-ui";

const { isProd } = require('../utils/env')

const readFileList = (dir: string, filesList: string[] = []) => {
  const files = fs.readdirSync(dir);

  files.forEach((item, index) => {
    const fullPath: any = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      readFileList(path.join(dir, item), filesList);
    } else {
      filesList.push(fullPath);
    }
  });

  return filesList;
}


const initRouter = (app: any) => {
  if (!isProd) {
    app.use(koaSwagger({
      routePrefix: '/swagger',
      swaggerOptions: { url: '/swagger.json' },
    }))
  }

  const fileUrls: any = []
  readFileList(path.resolve(__dirname, '../routes/api'), fileUrls);
  readFileList(path.resolve(__dirname, '../routes/view'), fileUrls);

  fileUrls.forEach((url: string) => require(url))
  require('../routes/Error')
}

export { initRouter }
