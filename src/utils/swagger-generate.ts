import fs from 'fs'
import path from 'path'
import { ISwagger } from "../conf/interface/swagger";

const DEF = {
  Order: {
    "type": "object",
    "properties": {
      "id": {
        "type": "integer",
        "format": "int64"
      },
      "petId": {
        "type": "integer",
        "format": "int64"
      },
      "quantity": {
        "type": "integer",
        "format": "int32"
      },
      "shipDate": {
        "type": "string",
        "format": "date-time"
      },
      "status": {
        "type": "string",
        "description": "Order Status",
        "enum": [
          "placed",
          "approved",
          "delivered"
        ]
      },
      "complete": {
        "type": "boolean",
        "default": false
      }
    },
    "xml": {
      "name": "Order"
    }
  },
  Category: {
    "type": "object",
    "properties": {
      "id": {
        "type": "integer",
        "format": "int64"
      },
      "name": {
        "type": "string"
      }
    },
    "xml": {
      "name": "Category"
    }
  },
  User: {
    "type": "object",
    "properties": {
      "id": {
        "type": "integer",
        "format": "int64"
      },
      "username": {
        "type": "string"
      },
      "firstName": {
        "type": "string"
      },
      "lastName": {
        "type": "string"
      },
      "email": {
        "type": "string"
      },
      "password": {
        "type": "string"
      },
      "phone": {
        "type": "string"
      },
      "userStatus": {
        "type": "integer",
        "format": "int32",
        "description": "User Status"
      }
    },
    "xml": {
      "name": "User"
    }
  },
  Tag: {
    "type": "object",
    "properties": {
      "id": {
        "type": "integer",
        "format": "int64"
      },
      "name": {
        "type": "string"
      }
    },
    "xml": {
      "name": "Tag"
    }
  },
  Pet: {
    "type": "object",
    "required": [
      "name",
      "photoUrls"
    ],
    "properties": {
      "id": {
        "type": "integer",
        "format": "int64"
      },
      "category": {
        "$ref": "#/definitions/Category"
      },
      "name": {
        "type": "string",
        "example": "doggie"
      },
      "photoUrls": {
        "type": "array",
        "xml": {
          "name": "photoUrl",
          "wrapped": true
        },
        "items": {
          "type": "string"
        }
      },
      "tags": {
        "type": "array",
        "xml": {
          "name": "tag",
          "wrapped": true
        },
        "items": {
          "$ref": "#/definitions/Tag"
        }
      },
      "status": {
        "type": "string",
        "description": "pet status in the store",
        "enum": [
          "available",
          "pending",
          "sold"
        ]
      }
    },
    "xml": {
      "name": "Pet"
    }
  },
  ApiResponse: {
    "type": "object",
    "properties": {
      "code": {
        "type": "integer",
        "format": "int32"
      },
      "type": {
        "type": "string"
      },
      "message": {
        "type": "string"
      }
    }
  }
}
const SEC = {
  petstore_auth: {
    "type": "oauth2",
    "authorizationUrl": "http://petstore.swagger.io/oauth/dialog",
    "flow": "implicit",
    "scopes": {
      "write:pets": "modify pets in your account",
      "read:pets": "read your pets"
    }
  },
  api_key: {
    "type": "apiKey",
    "name": "api_key",
    "in": "header"
  }
}
const RES = {
  default: {
    "description": "successful operation"
  },
  200: {
    "description": "successful operation",
    "schema": {
      "$ref": "#/definitions/User"
    }
  },
  201: {
    "description": "successful operation",
    "schema": {
      "type": "string"
    },
    "headers": {
      "X-Rate-Limit": {
        "type": "integer",
        "format": "int32",
        "description": "calls per hour allowed by the user"
      },
      "X-Expires-After": {
        "type": "string",
        "format": "date-time",
        "description": "date in UTC when token expires"
      }
    }
  },
  202: {
    "description": "successful operation",
    "schema": {
      "type": "object",
      "additionalProperties": {
        "type": "integer",
        "format": "int32"
      }
    }
  },
  203: {
    "description": "successful operation",
    "schema": {
      "type": "array",
      "items": {
        "$ref": "#/definitions/Pet"
      }
    }
  },
  400: {
    "description": "Invalid ID supplied"
  },
  404: {
    "description": "Pet not found"
  },
  405: {
    "description": "Validation exception"
  }
}
const PAMAMS = [
  {
    in: "body",
    name: "body",
    description: "Pet object that needs to be added to the store",
    required: true,
    schema: {
      "$ref": "#/definitions/Pet"
    }
  },
  {
    name: "status",
    in: "query",
    description: "Status values that need to be considered for filter",
    required: true,
    type: "array",
    items: {
      "type": "string",
      "enum": [
        "available",
        "pending",
        "sold"
      ],
      "default": "available"
    },
    collectionFormat: "multi"
  },
  {
    name: "tags",
    in: "query",
    description: "Tags to filter by",
    required: true,
    type: "array",
    items: {
      "type": "string"
    },
    collectionFormat: "multi"
  },
  {
    "name": "petId",
    "in": "path",
    "description": "ID of pet to update",
    "required": true,
    "type": "integer",
    "format": "int64"
  },
  {
    "name": "additionalMetadata",
    "in": "formData",
    "description": "Additional data to pass to server",
    "required": false,
    "type": "string"
  },
  {
    "name": "file",
    "in": "formData",
    "description": "file to upload",
    "required": false,
    "type": "file"
  },
  {
    "name": "name",
    "in": "formData",
    "description": "Updated name of the pet",
    "required": false,
    "type": "string"
  },
  {
    "name": "api_key",
    "in": "header",
    "required": false,
    "type": "string"
  },
  {
    "name": "orderId",
    "in": "path",
    "description": "ID of pet that needs to be fetched",
    "required": true,
    "type": "integer",
    "maximum": 10,
    "minimum": 1,
    "format": "int64"
  },
  {
    "in": "body",
    "name": "body",
    "description": "List of user object",
    "required": true,
    "schema": {
      "type": "array",
      "items": {
        "$ref": "#/definitions/User"
      }
    }
  }
]

const swaggerTemplate: ISwagger = {
  swagger: "2.0",
  info: {
    description: "",
    version: "1.0.0",
    title: "Swagger 接口文档"
  },
  host: "localhost:3000",
  basePath: "",
  tags: [],
  schemes: [
    // "https",
    "http"
  ],
  paths: {},
  securityDefinitions: SEC,
  definitions: DEF
}

const genSwaggerTag = (root: string, rootDescription?: string) => {
  if (rootDescription) {
    const { tags } = swaggerTemplate

    const key: string = root.split('/')[1]

    const idx = tags.findIndex((item: any) => item.name === key)

    if (idx === -1) {
      // 设置标题
      tags.push({
        name: key,
        description: rootDescription,
        externalDocs: { description: "", url: "" }
      })
    }
  }
}

const genSwaggerContent = (
  root: string,
  fullPath: string,
  method: string,
  rootDescription?: string
) => {
  if (rootDescription) {
    const key: string = root.split('/')[1]
    const obj = {
      tags: [key],
      summary: '接口标题',
      description: "接口描述",
      // 相当于唯一的KEY标识，这里暂时用随机数
      operationId: `${Math.random()}`,
      // 接收格式
      consumes: [
        "application/json",
        // "application/xml"
      ],
      // 响应格式
      produces: [
        // "application/xml",
        "application/json"
      ],
      // 参数
      // parameters: PAMAMS,
      // 状态码
      responses: {}, // responses: RES,
      // 验证
      security: [
        { petstore_auth: ["write:pets", "read:pets"] },
        { "api_key": [] }
      ],
      // 是否不用了
      deprecated: false
    }
    const { paths } = swaggerTemplate

    if (!paths[fullPath]) {
      paths[fullPath] = {
        [method]: { ...obj }
      }
    } else {
      paths[fullPath][method] = { ...obj }
    }
  }
}

const generateSwagger = (obj?: any) => {
  // 1. 打开写入流stream
  var ws = fs.createWriteStream(path.join(__dirname, '../../swagger.json'));

  // 2. 监听流打开/关闭事件
  ws.once("open", () => {
    // console.log("swagger 开始生成");
  });

  ws.once("close", () => {
    // console.log("swagger 结束生成");
  });

  // 3. 写入文件
  try {
    ws.write(JSON.stringify(obj));
  } catch (e) {
    ws.write('');
  }

  // 4. 关闭流, 关闭时 触发 close 事件
  ws.end();
}

export {
  generateSwagger,
  swaggerTemplate,
  genSwaggerTag,
  genSwaggerContent
}
