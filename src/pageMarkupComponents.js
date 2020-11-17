import SearchForm from "../components/SearchForm.js";
import RecenetSearches from "../components/RecentSearches.js";

export const beerSearchForm = new SearchForm(
  document.getElementById("beerSearchFormContainer")
);

export const recentSearches = new RecenetSearches(
  document.getElementById("recentSearches")
);
