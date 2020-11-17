import { recentSearches, beerSearchForm } from "../src/pageMarkupComponents.js";

export const scrollToFirstItem = () => {
  window.scrollTo(
    0,
    35 + recentSearches.getHeight() + beerSearchForm.getHeight()
  );
};
