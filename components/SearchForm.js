import { isEmpty } from "../utils/validate.js";

export default class SearchForm {
  constructor(container) {
    this.container = container;
  }

  errorMessageToHTML(isFieldEmpty) {
    return isFieldEmpty
      ? `<div class="alert text-danger mt-2 d-flex justify-content-center" role="alert">
      Ya wanna get some proper drink, ain't ya?
    </div>`
      : "";
  }

  inputGorupToHTML(state, isFieldEmpty) {
    const { searchQuery, loading, err } = state;

    return `<div class="input-group">
    <input
      name="searchInput"
      id="searchInput"
      class="form-control mr-0 ${isFieldEmpty ? "alert-warning" : ""}"
      type="search"
      ${searchQuery && !loading ? `value=${searchQuery}` : ""}
      placeholder="${isFieldEmpty ? `${err["searchQuery"]}` : "Search"}"
    />
    <button class="btn btn-outline-success" type="submit" ${
      loading ? "disabled" : ""
    }>
    <i  id="searchIcon" class="fas fa-search text-grey" aria-hidden="true"></i>
    </button>
    </div>`;
  }

  formToHTML(state, isFieldEmpty) {
    return `<form name="searchForm" class="form-inline mb-0 d-flex justify-content-center">
  ${this.inputGorupToHTML(state, isFieldEmpty)}
  <button id="favoriteBtn" class="btn btn-success my-2 my-sm-0" type="button" ${
    isEmpty(state.favorites) ? "disabled" : ""
  }>
    Favourites: ${state.favorites.length}
   </button>
  </form>`;
  }

  render(state) {
    const isFieldEmpty = !!state.err["searchQuery"];

    this.container.innerHTML = ` ${this.formToHTML(state, isFieldEmpty)}
      ${this.errorMessageToHTML(isFieldEmpty)}
      `;
  }
}
