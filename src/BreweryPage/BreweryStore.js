import ReduceStore from "../../flux/ReduceStore.js";
import breweryReducer from "./breweryReducer.js";

class BreweryStore extends ReduceStore {
  setInitialState() {
    return {
      beerItems: [],
      searchItems: [],
      err: {},
      currentPage: 1,
      searchQuery: "",
      loading: false,
      favorites: [],
      pickedBeerItem: {},
    };
  }
  reduce(state, action) {
    return breweryReducer(state, action);
  }
}

export default new BreweryStore();
