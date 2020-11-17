import {
  beerSearchForm,
  recentSearches,
  beersList,
} from "./pageMarkupComponents.js";
import ReduceStore from "../flux/ReduceStore.js";
import Reducer from "./Reducer.js";
import {
  addNewItems,
  addNewSearchItem,
  handleError,
  handleDelete,
} from "./AC/index.js";
import { getBeers } from "../utils/api.js";
import { scrollToFirstItem } from "../utils/scrollToFirstItem.js";
import validate from "../utils/validate.js";
import CONSTANT from "./constants.js";

//------------------ STORE (contains State of App)

class BreweryStore extends ReduceStore {
  setInitialState() {
    return {
      beerItems: [],
      searchItems: [],
      err: {},
    };
  }
  reduce = (state, action) => Reducer(state, action);
}

const breweryStore = new BreweryStore(); // STORE for Brewery CREATED

//----------------EVENT HANDLERS

const handleSubmit = async (e) => {
  const { target } = e;

  e.preventDefault();
  console.log("Here I am");
  if (target.name === "searchForm") {
    let err = validate({
      name: "searchQuery",
      value: target.searchInput.value,
    });

    breweryStore.dispatch(handleError(err));
    if (!err["searchQuery"]) {
      try {
        const query = target.searchInput.value.trim();
        const beerItems = await getBeers(query);

        if (beerItems.length === 0) {
          breweryStore.dispatch(
            handleError({ emptyResponse: CONSTANT.EMPTY_RESPONSE })
          );
          breweryStore.dispatch(handleDelete([]));
        }
        if (beerItems.length !== 0) {
          breweryStore.dispatch(addNewItems(beerItems));
          breweryStore.dispatch(addNewSearchItem(query));
          scrollToFirstItem();
        }
      } catch (e) {
        breweryStore.dispatch(
          handleError({ emptyResponse: CONSTANT.EMPTY_RESPONSE })
        );
        breweryStore.dispatch(handleDelete([]));
      } finally {
        console.log("Finally from index");
      }
    }
  }
  console.log("another form");
};

document.addEventListener("submit", handleSubmit);

//----------------VIEWS

const render = ({ beerItems, searchItems, err }) => {
  beersList.render(beerItems, err);
  recentSearches.render(searchItems);
  beerSearchForm.render(err);
};

// --------------- CALLING & REGISTRING of RENDER
render(breweryStore.setInitialState());
breweryStore.register(render);

//---------------- Just handy (must be deleted later)
window.breweryStore = breweryStore;
