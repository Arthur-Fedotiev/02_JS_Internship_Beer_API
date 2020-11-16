export default class ScrollTopArrow {
  constructor(container) {
    this.container = container;
    this.isMyChild = this.isMyChild.bind(this);
  }

  isMyChild(child) {
    return this.container.contains(child);
  }

  showScrollBtn() {
    const arrow = document.querySelector("#returnToTop");
    const { top } = document
      .getElementById("beersListContainer")
      .getBoundingClientRect();

    if (top <= -89) {
      arrow.style.display = "block";
    } else {
      arrow.style.display = "none";
    }
  }

  btnToHTML() {
    return `<a id="returnToTop" class="bg-dark"><i class="fas fa-chevron-up text-warning"></i></a>`;
  }

  render() {
    this.container.innerHTML = this.btnToHTML();
  }
}
