export default class EventHandler {
  constructor(store) {
    this.store = store;
  }

  handleSubmit() {
    throw new Error("Must be overridden in sublasses");
  }

  handleClick() {
    throw new Error("Must be overridden in sublasses");
  }

  handleKeydown() {
    throw new Error("Must be overridden in sublasses");
  }
}
