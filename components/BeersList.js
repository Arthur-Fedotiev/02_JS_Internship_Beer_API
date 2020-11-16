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
    <img class="beer-card-img card-img-right flex-auto d-none d-md-block"
     src=${img}>
</div>`;
  }

  cardBodyToHTML({ logo, name, id, description }) {
    return `<div class="card-body d-flex flex-column align-items-start">
    <strong class="d-inline-block mb-2 text-success">${logo}</strong>
    <h3 class="mb-0">
        <a class="text-dark" href="#">${name}</a>
    </h3>
    <p class="card-text mb-auto elipsis overflow">${this.shortenDescription(
      description
    )}</p>
    <a id=${id} href="#">Continue reading</a>
</div>`;
  }

  beerItemsToHTML(beerItems) {
    return beerItems.map(
      (beer) => `<div class="row mb-2 justify-content-center">
  <div id="beerItem" class="col-sm-12 col-md-10 col-lg-6">
      <div class="card flex-md-row mb-4 box-shadow h-md-250 align-items-center">
          <div class="col-8">
              ${this.cardBodyToHTML(beer)}
          </div>
         ${this.imgToHTML(beer.img)}
      </div>
  </div>
</div>`
    );
  }

  beerContainerToHTML(beerItems, err, loading) {
    return `${this.beerItemsToHTML(beerItems)}
    ${this.loadBtnToHTML(beerItems, err, loading)}`;
  }

  render(beerItems, err, loading) {
    const isEmptyResponse = !!err["emptyResponse"];

    this.container.innerHTML = isEmptyResponse
      ? this.errorMessageToHTML(err["emptyResponse"])
      : this.beerContainerToHTML(beerItems, err, loading);
  }
}
