export default class SearchForm {
  constructor(container) {
    this.container = container;
  }

  getHeight() {
    return this.container.offsetHeight;
  }

  render(el) {
    this.container.innerHTML = ` <form name="searchForm" class="form-inline mb-0">
        <div class="input-group">
          <input
            name="searchInput"
            id="searchInput"
            class="form-control mr-0"
            type="search"
            placeholder="Search"
          />
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
          <i  id="searchIcon" class="fas fa-search text-grey" aria-hidden="true"></i>
          </button>
          </div>
        </div>
        <button class="btn btn-outline-success my-2 my-sm-0" type="button">
                    Favourites
                  </button>
      </form>`;
  }
}
