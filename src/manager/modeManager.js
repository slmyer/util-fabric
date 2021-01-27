export default class {
  constructor(proxy, changeProxy) {
    this.proxy = proxy;
  }

  updateControls(mode, status) {
    if (this.proxy[mode]) {
      this.proxy[mode].update(status);
    }
  }

  /**
   *
   * @param {*} mode  模式名称
   * @param {*} status 状态
   * 对include 进行关联操作
   * exclude 取反操作
   * 匹配 * 字符
   */
  updateStatus(mode, status) {
    const control = this.proxy[mode];
    const names = Object.keys(this.proxy);
    const { include, exclude } = control;
    if (status) {
      control.active = status;
      if (Array.isArray(exclude)) {
        if (exclude.includes('*')) {
          names.map((key) => {
            this.changeProxy(key, false);
            this.updateControls(key, false);
          });
        } else {
          exclude.map((key) => {
            this.changeProxy(key, false);
            this.updateControls(key, false);
          });
        }
      }
      if (Array.isArray(include)) {
        if (include.includes('*')) {
          names.map((key) => {
            this.changeProxy(key, true);
            this.updateControls(key, true);
          });
        } else {
          include.map((key) => {
            this.changeProxy(key, true);
            this.updateControls(key, true);
          });
        }
      }
    } else {
      if (Array.isArray(exclude)) {
        if (exclude.includes('*')) {
          names.map((key) => {
            this.changeProxy(key, true);
            this.updateControls(key, true);
          });
        } else {
          exclude.map((key) => {
            this.changeProxy(key, true);
            this.updateControls(key, true);
          });
        }
      }
      if (Array.isArray(include)) {
        if (include.includes('*')) {
          names.map((key) => {
            this.changeProxy(key, false);
            this.updateControls(key, false);
          });
        } else {
          include.map((key) => {
            this.changeProxy(key, false);
            this.updateControls(key, false);
          });
        }
      }
    }
  }

  resetMode() {
    Object.keys(this.proxy).map((key) => {
      this.changeProxy(key, false);
      this.updateControls(key, false);
    });
  }
}
