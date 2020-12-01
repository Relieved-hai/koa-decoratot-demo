class BaseModel {
  private errno?: number;
  private data?: any;
  private message?: string;

  constructor({ errno, data, message }: {
    errno?: number,
    data?: any,
    message?: string
  }) {
    this.errno = errno

    if (data) {
      this.data = data
    }

    if (message) {
      this.message = message
    }
  }
}

class SuccessModel extends BaseModel {
  constructor(data = {}) {
    super({ errno: 0, data })
  }
}

class ErrorModel extends BaseModel {
  constructor({ errno, message }: { errno: number, message: string }) {
    super({ errno, message })
  }
}

export {
  SuccessModel,
  ErrorModel
}
