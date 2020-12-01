import router from "../router";
import { Methods } from "../conf/enum/methods";
import { generateSwagger, genSwaggerTag, swaggerTemplate, genSwaggerContent } from "../utils/swagger-generate";

export const controller = (root: string, rootDescription?: string) => {
  return (target: new (...args: any[]) => any) => {
    for (let key in target.prototype) {
      const path: string = Reflect.getMetadata('path', target.prototype, key);
      const method: Methods = Reflect.getMetadata('method', target.prototype, key);
      const handler = target.prototype[key];
      const middlewares = Reflect.getMetadata('middlewares', target.prototype, key);

      // ========= 待抽离
      genSwaggerTag(root, rootDescription)
      // ========= 待抽离

      if (path && method) {
        let fullPath: string

        rootDescription
          ? (fullPath = root === '/' ? `${swaggerTemplate.basePath}${path}` : `${swaggerTemplate.basePath}${root}${path}`)
          : (fullPath = root === '/' ? path : `${root}${path}`)

        if (middlewares && middlewares.length) {
          router[method](fullPath, ...middlewares, handler);
        } else {
          router[method](fullPath, handler);
        }

        // ========= 待抽离
        genSwaggerContent(root, fullPath, method, rootDescription)
        // ========= 待抽离
      }
    }

    generateSwagger(swaggerTemplate)
  }
}
