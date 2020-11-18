export default class SearchForm {
  constructor(container) {
    this.container = container;
  }

  errorMessageToHTML(isFieldEmpty) {
    return isFieldEmpty
      ? `<div class="alert alert-danger mt-2" role="alert">
    Ya wanna get some <a href="#" class="alert-link">proper drink</a>, ain't ya?
  </div>`
      : "";
  }

  render(err, loading) {
    const isFieldEmpty = !!err["searchQuery"];
    this.container.innerHTML = ` <form name="searchForm" class="form-inline mb-0 d-flex justify-content-center">
        <div class="input-group">
          <input
            name="searchInput"
            id="searchInput"
            class="form-control mr-0 ${isFieldEmpty ? "alert-warning" : ""}"
            type="search"
            placeholder="${isFieldEmpty ? `${err["searchQuery"]}` : "Search"}"
          />
          <button class="btn btn-outline-success" type="submit" ${
            loading ? "disabled" : ""
          }>
          <i  id="searchIcon" class="fas fa-search text-grey" aria-hidden="true"></i>
          </button>
          </div>
      <button class="btn btn-outline-success my-2 my-sm-0" type="button">
                    Favourites
                  </button>
                  ${this.errorMessageToHTML(isFieldEmpty)}
      </form>
      `;
  }
}
