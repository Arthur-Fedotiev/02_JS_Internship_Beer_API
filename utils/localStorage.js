export const setInitialLocalStorage = () => {
  !localStorage.favorites && localStorage.setItem("favorites", "[]");
  !localStorage.recentSearches && localStorage.setItem("recentSearches", "[]");
};

export const updateLocalStorage = (recentSearches, favorites) => {
  localStorage.favorites = JSON.stringify(favorites);
  localStorage.recentSearches = JSON.stringify(recentSearches);
};

export const getLocalStorage = () => {
  const favorites = JSON.parse(localStorage.favorites);
  const recentSearches = JSON.parse(localStorage.recentSearches);

  return { recentSearches, favorites };
};
