import { isEmpty } from "../utils/validate.js";

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

<<<<<<< HEAD
  render(recentSearches = []) {
    this.container.innerHTML = ` <div id="1" class="col-6 bg-dark p-4">
    <h4 class="text-warning">Recent searches</h4>
    ${this.searchesToHTML(recentSearches)}
</div>`;
=======
  headerToHTML() {
    return `<h4 class="text-warning">Recent searches</h4>`;
  }

  render(recentSearches) {
    const noSearches = isEmpty(recentSearches);

    this.container.innerHTML = `
    ${this.headerToHTML()} 
    ${
      !noSearches
        ? `<div class="col-12 p-4 d-flex justify-content-center">
    <div class="col-6">
    <ul class="list-group">${this.searchesToHTML(recentSearches)}</ul>
    </div>
    </div>`
        : ""
    } `;
>>>>>>> feature/US008-add-possibility-to-view-single-item
  }
}
