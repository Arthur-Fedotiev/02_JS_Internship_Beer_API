import { isEmpty } from "../utils/validate.js";

export default class Modal {
  constructor(container) {
    this.container = container;
    this.toggleModal = this.toggleModal.bind(this);
  }

  shortenDescription(description) {
    return `${description.substring(0, 250)}...`;
  }

  imgToHTML(img) {
    return `<div class="col-4">
    <img class="beer-card-img card-img-right flex-auto d-none d-block"
     src=${img}>
</div>`;
  }

  toggleModal(show) {
    this.container.style.display = show ? "block" : "none";
  }

  isFavorite(id, favorites) {
    return isEmpty(favorites)
      ? false
      : favorites.some((beer) => beer.id === id);
  }

  cardBodyToHTML({ logo, name, id, description }, favorites) {
    return `<div class="card-body d-flex flex-column align-items-start">
    <strong class="d-inline-block mb-2 text-success">${logo}</strong>
    <h3 class="m-0">
        <a class="text-dark" href="#">${name}</a>
    </h3>
    <p class="card-text mb-auto elipsis overflow">${this.shortenDescription(
      description
    )}</p>
    <button id=${id} data-favorite=${
      this.isFavorite(id, favorites) ? "delete" : "add"
    } type="button" class="font-weight-bold btn btn-block btn-${
      this.isFavorite(id, favorites) ? "danger" : "warning"
    } mt-2">${this.isFavorite(id, favorites) ? "REMOVE" : "ADD"}</button>
</div>`;
  }

  beerItemsToHTML(favorites) {
    return favorites.map(
      (beer) => `<div class="row mb-2 justify-content-center">
  <div id="beerItem" class="col-sm-12 col-md-10 col-lg-8">
      <div class="card flex-row mb-4 box-shadow h-md-250 align-items-center">
          <div class="col-8">
              ${this.cardBodyToHTML(beer, favorites)}
          </div>
         ${this.imgToHTML(beer.img)}
      </div>
  </div>
</div>`
    );
  }

  beerContainerToHTML(favorites) {
    return `${this.beerItemsToHTML(favorites)}`;
  }

  emptyListOfFavorites() {
    return `<div class="jumbotron jumbotron-fluid">
      <div class="container">
        <h1 class="display-4 text-warning">The List is empty</h1>
        <p class="lead">This is a modified jumbotron that occupies the entire horizontal space of its parent.</p>
      </div>
    </div>`;
  }
  render(favorites) {
    const favoritesListIsEmpty = isEmpty(favorites);
    this.container.innerHTML = favoritesListIsEmpty
      ? this.emptyListOfFavorites()
      : this.beerContainerToHTML(favorites);

    // this.container.style.display = showModal ? "block" : "none";
  }
}
