export default class RecentSearches {
  constructor(container) {
    this.container = container;
    this.setDefaultStyle();
  }

  setDefaultStyle() {
    this.container.style.display = "block";
  }

  searchesToHTML(recentSearches) {
    return recentSearches
      .map(
        (
          entry
        ) => `<li data-search-query=${entry} class="list-group-item d-flex justify-content-between align-items-center">
      ${entry}
      <span class="badge badge-warning badge-pill"><i class="fa fa-check" aria-hidden="true"></i></span>
    </li>`
      )
      .join("");
  }

  render(recentSearches = []) {
    this.container.innerHTML = ` 
    <h4 class="text-warning">Recent searches</h4>
    <div id="1" class="col-12 p-4 d-flex justify-content-center">
    <div class="col-6">
    <ul class="list-group">${this.searchesToHTML(recentSearches)}</ul>
    </div>
    </div>`;
  }
}
