import {
  beerSearchForm,
  recentSearches,
  beersList,
  scrollTopArrow,
  modalFavorites,
  modalBeerItem,
} from "./BreweryPage/breweryPageMarkupComponents.js";
import breweryStore from "./BreweryPage/BreweryStore.js";
import breweryEventHandler from "./BreweryPage/BreweryEventHandler.js";

document.addEventListener("submit", breweryEventHandler.handleSubmit);
document.addEventListener("click", breweryEventHandler.handleClick);
document.addEventListener("keydown", breweryEventHandler.handleKeydown);
window.addEventListener("scroll", scrollTopArrow.showScrollBtn);

const render = (state) => {
  const { favorites, pickedBeerItem } = state;
  beersList.render(state);
  recentSearches.render(state.searchItems);
  beerSearchForm.render(state);
  modalFavorites.render(favorites);
  modalBeerItem.render(pickedBeerItem, favorites);
};

scrollTopArrow.render();
render(breweryStore.setInitialState());
breweryStore.register(render);

//---------------- Just handy (must be deleted later)
window.breweryStore = breweryStore;
