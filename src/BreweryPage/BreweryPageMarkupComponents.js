import SearchForm from "../../components/SearchForm.js";
import RecenetSearches from "../../components/RecentSearches.js";
import BeersList from "../../components/BeersList.js";
import ScrollTopArrow from "../../components/ScrollTopArrow.js";
import ModalFavorites from "../../components/ModalFavorites.js";
import ModalBeerItem from "../../components/ModalBeerItem.js";

export const beerSearchForm = new SearchForm(
  document.getElementById("beerSearchFormContainer")
);

export const recentSearches = new RecenetSearches(
  document.getElementById("recentSearches")
);

export const beersList = new BeersList(
  document.getElementById("beersListContainer")
);

export const scrollTopArrow = new ScrollTopArrow(
  document.getElementById("scrollTopContainer")
);

export const modalFavorites = new ModalFavorites(
  document.getElementById("modalFavorites")
);

export const modalBeerItem = new ModalBeerItem(
  document.getElementById("modalBeerItem")
);
