import { fabric } from 'fabric';
import EventEmitter from 'events';
import ModeManager from '../manager/modeManager';
import Modes from './mode';

export default class extends EventEmitter {
  constructor(
    id,
    {
      width = 100,
      height = 100,
      scale = 1,
      modes = Object.keys(Modes),
      requestData = () => {},
      readOnly = false,
    }
  ) {
    super();

    this.canvas = null;

    this.id = id;

    this.requestData = requestData;

    this.canvasZoom = scale;

    this.width = width;

    this.height = height;

    this.readOnly = readOnly;

    this.modes = modes;

    this.proxy = {};
  }

  init = () => {
    this.canvas = new fabric.canvas(this.id, {
      width: this.width,
      height: this.height,
    });

    this.initModeManger();

    this.emit('onReady', this.canvas);
  };

  initModeManger = () => {
    this.manager = new ModeManager(this.proxy, this.changeProxy);
  };

  changeProxy = (mode, status) => {
    if (this.proxy[mode]) {
      this.proxy[mode].active = status;
    }
  };

  getModeStatus = (mode) => {
    if (this.proxy[mode]) return this.proxy[mode].active;
    return false;
  };
}
