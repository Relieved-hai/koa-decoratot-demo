import { Methods } from '../enum/methods'
import { SCHEMES } from '../enum/schemes'

interface ISwagger {
  swagger: string,
  info: IInfo,
  host: string,
  basePath: string,
  tags: ITag[],
  schemes: any,
  // paths: { [propName: Methods]: IPathConf }[],
  paths: any,
  securityDefinitions: any,
  definitions: any,
}

interface IInfo {
  description: string
  version: string
  title: string
  termsOfService?: string
}

interface ITag {
  name: string,
  description: string
  externalDocs?: {
    description?: string,
    url?: string,
  }
}

interface IPathConf {
  "tags": string[],
  "summary": string,
  "description": string,
  "operationId": string,
  "consumes": string[],
  "produces": string[],
  "parameters": any,
  "responses": any,
  "security": any
}

export {
  ISwagger
}
