//import { recentSearches, beerSearchForm } from "../src/pageMarkupComponents.js";

export const scrollToFirstItem = () => {
  document
    .getElementById("beersListContainer")
    .scrollIntoView({ behavior: "smooth" });
};
