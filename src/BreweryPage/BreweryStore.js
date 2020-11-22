import ReduceStore from "../../flux/ReduceStore.js";
import breweryReducer from "./BreweryReducer.js";
import {
  getLocalStorage,
  setInitialLocalStorage,
} from "../../utils/localStorage.js";

setInitialLocalStorage();

class BreweryStore extends ReduceStore {
  setInitialState() {
    return {
      beerItems: [],
      searchItems: getLocalStorage().recentSearches,
      err: {},
      currentPage: 1,
      searchQuery: "",
      loading: false,
      favorites: getLocalStorage().favorites,
      pickedBeerItem: {},
    };
  }

  reduce(state, action) {
    return breweryReducer(state, action);
  }
}

export default new BreweryStore();
