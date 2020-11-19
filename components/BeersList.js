import { isEmpty } from "../utils/validate.js";
export default class BeersList {
  constructor(container) {
    this.container = container;
  }

  loadBtnToHTML(beerItems, err, loading) {
    const thereAreBeers = !isEmpty(beerItems);
    const allBeersFetched = !!err["allBeersFetched"];
    if (thereAreBeers && !allBeersFetched) {
      return `<button id="loadMore" type="button" class="btn btn-success btn-lg btn-block" ${
        loading ? "disabled" : ""
      }>Show me more!</button>`;
    }
    if (thereAreBeers && allBeersFetched)
      return this.errorMessageToHTML(err["allBeersFetched"]);
    return "";
  }

  errorMessageToHTML(errMessage) {
    return `<div class="alert alert-warning alert-dismissible fade show text-center" role="alert">
    <strong>${errMessage}</strong> 
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>`;
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

  beerItemsToHTML(beerItems, favorites) {
    return beerItems.map(
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

  beerContainerToHTML(beerItems, err, loading, favorites) {
    return `${this.beerItemsToHTML(beerItems, favorites)}
    ${this.loadBtnToHTML(beerItems, err, loading)}`;
  }

  greeterToHTML() {
    return `<div class="jumbotron">
    <h1 class="display-4 text-warning text-center bold">Greeting Traveler!</h1>
    <p class="lead text-center mt-2">Don't be shy and take a look at what we've got!</p>
    <hr class="my-4">
      </div>`;
  }

  render(beerItems, err, loading, favorites) {
    const isEmptyResponse = !!err["emptyResponse"];

    this.container.innerHTML =
      isEmpty(beerItems) && !isEmptyResponse
        ? `<div class="jumbotron">
    <h1 class="display-4 text-warning text-center bold">Greeting Traveler!</h1>
    <p class="lead text-center mt-2">Don't be shy and take a look at what we've got!</p>
    <hr class="my-4">
    
  </div>`
        : isEmptyResponse
        ? this.errorMessageToHTML(err["emptyResponse"])
        : this.beerContainerToHTML(beerItems, err, loading, favorites);
  }
}
