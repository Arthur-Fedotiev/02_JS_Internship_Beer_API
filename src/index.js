import {
  beerSearchForm,
  recentSearches,
  beersList,
} from "./pageMarkupComponents.js";
import ReduceStore from "../flux/ReduceStore.js";
import Reducer from "./Reducer.js";
import { addNewItems, addNewSearchItem } from "./AC/index.js";
import { getBeers } from "../utils/api.js";
import { scrollToFirstItem } from "../utils/scrollToFirstItem.js";
import CONSTANTS from "./constants.js";

beerSearchForm.render();
recentSearches.render();

//------------------ STORE (contains State of App)

class BreweryStore extends ReduceStore {
  setInitialState() {
    return {
      beerItems: [],
      searchItems: [],
    };
  }
  reduce = (state, action) => Reducer(state, action);
}

const breweryStore = new BreweryStore(); // STORE for Brewery CREATED

//----------------EVENT HANDLERS

const handleSubmit = async (e) => {
  const { target } = e;
  e.preventDefault();
  if (target.name === "searchForm") {
    try {
      {
        const query = target.searchInput.value.trim();
        const beerItems = await getBeers(query);
        console.log(beerItems);
        if (beerItems.length !== 0) {
          breweryStore.dispatch(addNewItems(beerItems));
          breweryStore.dispatch(addNewSearchItem(query));
          scrollToFirstItem();
        }
      }
    } catch (e) {
      console.log(e);
    } finally {
      console.log("Finally from index");
    }
  }
  console.log("another form");
};

document.addEventListener("submit", handleSubmit);

//----------------VIEWS

const render = ({ beerItems, searchItems }) => {
  beersList.render(beerItems);
  recentSearches.render(searchItems);
};

// --------------- CALLING & REGISTRING of RENDER
render(breweryStore.setInitialState());
breweryStore.register(render);

//---------------- Just handy (must be deleted later)
window.breweryStore = breweryStore;

// async function getBeerItems(query) {
//   try {
//     const url = `https://api.punkapi.com/v2/beers?page=1&per_page=10&beer_name=${query}`;
//     const beerItems = await queryApi(url);
//     if (beerItems.length !== 0) {
//       breweryStore.dispatch(addNewItems(beerItems));
//       breweryStore.dispatch(addNewSearchItem(query));
//       scrollToFirstItem();
//     }
//     // if (beerItems.length === 0) {
//     //   breweryStore.dispatch(addNewItems(beerItems));
//     // }
//   } catch (err) {
//     console.log(err);
//   } finally {
//     console.log("Finally");
//   }
// }
