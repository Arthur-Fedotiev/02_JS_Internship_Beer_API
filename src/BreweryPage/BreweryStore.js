import ReduceStore from "../../flux/ReduceStore.js";
import BreweryReducer from "./BreweryReducer.js";

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
  reduce = (state, action) => BreweryReducer(state, action);
}

export default new BreweryStore();
