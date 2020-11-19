import { isEmpty } from "../utils/validate.js";
import shortenDescription from "../utils/shortenDescription.js";

export default class ModalFavorites {
  constructor(container) {
    this.container = container;
    this.toggleModal = this.toggleModal.bind(this);
  }

  imgToHTML(img, id, favorites) {
    return `<div class="col-sm-3 col-md-4 col-lg-3">
    <img class="beer-card-img card-img-right flex-auto d-none d-block"
     src=${img}>
     <button id=${id} data-favorite=${
      this.isFavorite(id, favorites) ? "delete" : "add"
    } type="button" class="font-weight-bold btn btn-block btn-${
      this.isFavorite(id, favorites) ? "danger" : "warning"
    } mt-2">${this.isFavorite(id, favorites) ? "REMOVE" : "ADD"}</button>
</div>`;
  }

  toggleModal(show, delay = 0) {
    setTimeout(() => {
      this.container.style.display = show ? "block" : "none";
    }, delay);
  }

  isFavorite(id, favorites) {
    return isEmpty(favorites)
      ? false
      : favorites.some((beer) => beer.id === id);
  }

  cardBodyToHTML({ logo, name, id, description }) {
    return `<div class="card-body d-flex flex-column align-items-start">
    <strong class="d-inline-block mb-2 text-success">${logo}</strong>
    <h3 class="m-0">
        <a id=${id} data-role="beerPicker" class="text-dark" href="#">${name}</a>
    </h3>
    <p class="card-text mb-auto elipsis overflow">${shortenDescription(
      description
    )}</p>
   </div>`;
  }

  beerItemsToHTML(favorites) {
    return favorites.map(
      (beer) => `<div class="row mb-2 justify-content-center">
  <div id="beerItem" class="col-sm-12 col-md-10 col-lg-8">
      <div class="card flex-row mb-4 box-shadow h-md-250 align-items-center">
          <div class="col-sm-9 col-md-7 col-lg-9">
              ${this.cardBodyToHTML(beer)}
          </div>
         ${this.imgToHTML(beer.img, beer.id, favorites)}
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
        <h1 class="display-4 text-warning">Heey... Nothing you liked?:( </h1>
      </div>
    </div>`;
  }

  render(favorites) {
    const favoritesListIsEmpty = isEmpty(favorites);

    this.container.innerHTML = favoritesListIsEmpty
      ? this.emptyListOfFavorites()
      : this.beerContainerToHTML(favorites);

    favoritesListIsEmpty && this.toggleModal(false, 2000);
  }
}
