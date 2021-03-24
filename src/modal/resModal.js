// 用于请求结果的数据modal

// 基类
class BaseModal {
  constructor(data, message) {
    // 容错处理，运行只传1个message
    if (typeof data === "string") {
      this.data = message;
      data = null;
      message = null;
    }
    if (data) {
      this.data = data;
    }
    if (message) {
      this.message = message;
    }
  }
}

// 成功类

class SuccessModal extends BaseModal {
  constructor(data, message) {
    super(data, message); // 调用父类的构造函数
    this.error = 0;
  }
}

class ErrorModal extends BaseModal {
  constructor(data, message) {
    super(data, message);
    this.error = -1;
  }
}

// 导出
module.exports = {
  SuccessModal,
  ErrorModal,
};
