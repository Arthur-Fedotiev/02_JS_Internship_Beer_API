export default class RecentSearches {
  constructor(container) {
    this.container = container;
    this.setDefaultStyle();
  }

  setDefaultStyle() {
    this.container.style.display = "block";
  }

  toggle() {
    const isVisible = this.container.style.display === "block";
    this.container.style.display = isVisible ? "none" : "block";
  }

  searchesToHTML(recentSearches) {
    return recentSearches
      .map((entry) => `<p class="text-white">${entry}</p>`)
      .join("");
  }

  render(recentSearches = []) {
    this.container.innerHTML = ` <div id="1" class="col-6 bg-dark p-4">
    <h4 class="text-warning">Recent searches</h4>
    ${this.searchesToHTML(recentSearches)}
</div>`;
  }
}
