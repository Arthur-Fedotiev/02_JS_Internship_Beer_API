//import { recentSearches, beerSearchForm } from "../src/pageMarkupComponents.js";

export const scrollToFirstItem = () => {
  document
    .getElementById("beersListContainer")
    .scrollIntoView({ behavior: "smooth" });
  // window.scrollTo(
  //   0,
  //   35 + recentSearches.getHeight() + beerSearchForm.getHeight()
  // );
};
