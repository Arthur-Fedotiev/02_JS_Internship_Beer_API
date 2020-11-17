export default class BeersList {
  constructor(container) {
    this.container = container;
  }

  render(beerItems = []) {
    this.container.innerHTML = beerItems.map(
      (beer) => `<div class="row mb-2 justify-content-center">
      <div id="beerItem" class="col-sm-12 col-md-10 col-lg-6">
          <div class="card flex-md-row mb-4 box-shadow h-md-250 align-items-center">
              <div class="col-8">
                  <div class="card-body d-flex flex-column align-items-start">
                      <strong class="d-inline-block mb-2 text-success">${
                        beer.tagline
                      }</strong>
                      <h3 class="mb-0">
                          <a class="text-dark" href="#">${beer.name}</a>
                      </h3>
                      <p class="card-text mb-auto elipsis overflow">${beer.description.substring(
                        0,
                        250
                      )}...</p>
                      <a id=${beer.id} href="#">Continue reading</a>
                  </div>
              </div>
             
              <div class="col-4">
                  <img class="beer-card-img card-img-right flex-auto d-none d-md-block"
                   src=${beer.image_url}>
              </div>
          </div>
      </div>
  </div>`
    );
  }
}
