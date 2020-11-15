export default class SearchForm {
  constructor(container) {
    this.container = container;
  }

  render(el) {
    this.container.innerHTML = ` <form class="form-inline mb-0">
        <div class="input-group">
          <input
            name="searchInput"
            id="searchInput"
            class="form-control mr-0"
            type="search"
            placeholder="Search"
          />
          <div class="input-group-append">
            <span
              class="input-group-text amber lighten-3 mr-3"
              id="basic-text1"
            >
              <i class="fas fa-search text-grey" aria-hidden="true"></i>
            </span>
          </div>
          <button class="btn btn-outline-success my-2 my-sm-0" type="button">
            Favourites
          </button>
        </div>
      </form>`;
  }
}
