export default class {
  constructor({ canvas, manager, drawingObject, requestData }) {
    this.canvas = canvas;
    this.manager = manager;
    this.drawingObject = drawingObject;
    this.requestData = requestData;
  }

  enterMode = () => {
    this.manager.updateStatus(this.name, true);
  };

  leaveMode = () => {
    this.manager.updateStatus(this.name, false);
  };

  update = (status) => {
    if (!status) {
      this.clearDrawingObject();
    }
  };
  clearDrawingObject = () => {
    const target = this.getDrawingObject();
    if (target) {
      this.canvas.remove(target);
      this.setDrawingObject(null);
    }
  };

  getDrawingObject = () => {
    return this.drawingObject[this.name];
  };

  setDrawingObject = (obj) => {
    this.drawingObject[this.name] = obj;
  };

  requestRender() {
    this.fabCanvas.requestRenderAll();
  }
}
