import SearchForm from "../components/SearchForm.js";
import RecenetSearches from "../components/RecentSearches.js";
import BeersList from "../components/BeersList.js";

export const beerSearchForm = new SearchForm(
  document.getElementById("beerSearchFormContainer")
);

export const recentSearches = new RecenetSearches(
  document.getElementById("recentSearches")
);

export const beersList = new BeersList(
  document.getElementById("beersListContainer")
);
