export default class EventHandler {
  constructor(store) {
    this.store = store;
  }

  handleSubmit() {
    throw new Error("Must be overridden in");
  }

  handleClick() {
    throw new Error("Must be overridden in");
  }

  handleKeydown() {
    throw new Error("Must be overridden in");
  }

  handleScroll() {
    throw new Error("Must be overridden in");
  }
}
