import SearchForm from "../components/SearchForm.js";
import RecenetSearches from "../components/RecentSearches.js";
import BeersList from "../components/BeersList.js";
import ScrollTopArrow from "../components/ScrollTopArrow.js";
import Modal from "../components/Modal.js";

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

export const modalWindow = new Modal(document.getElementById("modalWindow"));
