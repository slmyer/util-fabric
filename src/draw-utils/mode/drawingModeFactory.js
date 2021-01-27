import DrawingCircle from './drawingCircle';

import MODE from './mode';

export default class {
  static setGlobalParams({ canvas, manager, drawingObject, requestData }) {
    this.canvas = canvas;
    this.manager = manager;
    this.drawingObject = drawingObject;
    this.requestData = requestData;
  }

  static modeFactory(mode) {
    switch (mode) {
      case MODE.DRAW_MODE_CIRCLE:
        return new DrawingCircle({
          canvas: this.canvas,
          manager: this.manager,
          mode,
          drawingObject: this.drawingObject,
          requestData: this.requestData,
        });
    }
  }
}

export { MODE };
