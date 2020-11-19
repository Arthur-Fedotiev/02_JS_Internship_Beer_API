import {
  beerSearchForm,
  recentSearches,
  beersList,
  scrollTopArrow,
  modalFavorites,
  modalBeerItem,
} from "./pageMarkupComponents.js";
import ReduceStore from "../flux/ReduceStore.js";
import Reducer from "./Reducer.js";
import {
  addNewItems,
  addNewSearchItem,
  handleError,
  handleDelete,
  setSearchQuery,
  toggleLoading,
  addToFavorites,
  deleteFromFavorites,
  pickBeerItem,
} from "./AC/index.js";
import { getBeers } from "../utils/api.js";
import { scrollToFirstItem, scrollToBottom } from "../utils/scroll.js";
import validate, { isEmpty } from "../utils/validate.js";
import CONSTANT from "./constants.js";

//------------------

scrollTopArrow.render();
//------------------ STORE (contains State of App)

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
  reduce = (state, action) => Reducer(state, action);
}

const breweryStore = new BreweryStore(); // STORE for Brewery CREATED

//----------------EVENT HANDLERS

const handleSubmit = async (e) => {
  const { target } = e;
  const { beerItems } = breweryStore.getState();

  e.preventDefault();
  if (target.name === "searchForm") {
    let err = validate({
      name: "searchQuery",
      value: target.searchInput.value,
    });

    breweryStore.dispatch(handleError({ ...err, emptyResponse: "" }));
    if (err["searchQuery"]) breweryStore.dispatch(setSearchQuery(""));

    if (!err["searchQuery"]) {
      try {
        breweryStore.dispatch(toggleLoading(true));
        const query = target.searchInput.value.trim();
        const receivedBeerItems = await getBeers(query);

        if (isEmpty(receivedBeerItems)) {
          breweryStore.dispatch(
            handleError({ emptyResponse: CONSTANT.EMPTY_RESPONSE })
          );
          breweryStore.dispatch(handleDelete([]));
        }
        if (!isEmpty(receivedBeerItems) && isEmpty(beerItems)) {
          breweryStore.dispatch(handleError({ emptyResponse: "" }));
          breweryStore.dispatch(addNewItems(receivedBeerItems));
          breweryStore.dispatch(addNewSearchItem(query));
          breweryStore.dispatch(setSearchQuery(query));
          //document.getElementById("searchInput").value = "";
          scrollToFirstItem();
        }
        if (!isEmpty(receivedBeerItems) && !isEmpty(beerItems)) {
          breweryStore.dispatch(handleDelete([]));
          breweryStore.dispatch(
            handleError({
              searchQuery: "",
              emptyResponse: "",
              allBeersFetched: "",
            })
          );
          breweryStore.dispatch(addNewItems(receivedBeerItems));
          breweryStore.dispatch(addNewSearchItem(query));
          breweryStore.dispatch(setSearchQuery(query));
          scrollToFirstItem();
        }
      } catch (error) {
        breweryStore.dispatch(setSearchQuery(""));
        breweryStore.dispatch(
          handleError({
            emptyResponse: "Oops... Something went wrong",
            searchQuery: "",
          })
        );
        breweryStore.dispatch(handleDelete([]));
      } finally {
        breweryStore.dispatch(toggleLoading(false));
        document.getElementById("searchInput").value = "";
      }
    }
  }
};

const handleClick = async ({ target }) => {
  if (!!target.dataset.searchQuery) {
    const query = target.dataset.searchQuery;

    try {
      breweryStore.dispatch(toggleLoading(true));
      breweryStore.dispatch(setSearchQuery(query));

      const { beerItems } = breweryStore.getState();
      const receivedBeerItems = await getBeers(query);

      if (isEmpty(receivedBeerItems)) {
        breweryStore.dispatch(
          handleError({ emptyResponse: CONSTANT.EMPTY_RESPONSE })
        );
        breweryStore.dispatch(handleDelete([]));
      }
      if (!isEmpty(receivedBeerItems) && isEmpty(beerItems)) {
        breweryStore.dispatch(handleError({ emptyResponse: "" }));
        breweryStore.dispatch(addNewItems(receivedBeerItems));
        //todo: +1 point to search query
        scrollToFirstItem();
      }
      if (!isEmpty(receivedBeerItems) && !isEmpty(beerItems)) {
        breweryStore.dispatch(handleDelete([]));
        breweryStore.dispatch(
          handleError({
            searchQuery: "",
            emptyResponse: "",
            allBeersFetched: "",
          })
        );
        breweryStore.dispatch(addNewItems(receivedBeerItems));
        //todo: +1 point to search query
        scrollToFirstItem();
      }
    } catch (error) {
      breweryStore.dispatch(
        handleError({ emptyResponse: "Oops... Something went wrong" })
      );
      breweryStore.dispatch(handleDelete([]));
    } finally {
      breweryStore.dispatch(toggleLoading(false));
      document.getElementById("searchInput").value = query;
    }
  }

  if (target.id === "loadMore") {
    try {
      breweryStore.dispatch(toggleLoading(true));
      const { searchQuery, currentPage } = breweryStore.getState();
      const receivedBeerItems = await getBeers(searchQuery, currentPage);

      if (!isEmpty(receivedBeerItems)) {
        breweryStore.dispatch(addNewItems(receivedBeerItems));
        scrollToBottom();
      }
      if (isEmpty(receivedBeerItems)) {
        breweryStore.dispatch(
          handleError({ allBeersFetched: "That's all we've got for ya ;)" })
        );
      }
    } catch (error) {
      breweryStore.dispatch(
        handleError({ emptyResponse: "Oops... Something went wrong" })
      );
      breweryStore.dispatch(handleDelete([]));
    } finally {
      breweryStore.dispatch(toggleLoading(false));
    }
  }

  if (scrollTopArrow.isMyChild(target)) return scrollToFirstItem();

  if (!!target.dataset.favorite) {
    const addItemToFavorites = target.dataset.favorite === "add";
    if (addItemToFavorites) {
      breweryStore.dispatch(addToFavorites(target.id));
    }
    if (!addItemToFavorites) {
      breweryStore.dispatch(deleteFromFavorites(target.id));
    }
    document.getElementById("searchInput").value = "";
  }

  if (target.id === "favoriteBtn") {
    modalFavorites.toggleModal(true);
  }
  if (target.dataset.role === "beerPicker") {
    breweryStore.dispatch(pickBeerItem(target.id));
    modalBeerItem.toggleModal(true);
  }
};

const handleKeydown = (e) => {
  if (e.keyCode !== 27) return;
  modalFavorites.toggleModal(false);
  modalBeerItem.toggleModal(false);
};

document.addEventListener("submit", handleSubmit);
document.addEventListener("click", handleClick);
document.addEventListener("keydown", handleKeydown);
window.addEventListener("scroll", scrollTopArrow.showScrollBtn);

//----------------VIEWS

const render = (state) => {
  console.log(state);
  const {
    beerItems,
    searchItems,
    err,
    searchQuery,
    loading,
    favorites,
    pickedBeerItem,
  } = state;
  beersList.render(state);
  recentSearches.render(state.searchItems);
  beerSearchForm.render(state);
  modalFavorites.render(favorites);
  modalBeerItem.render(pickedBeerItem, favorites);
};

// --------------- CALLING & REGISTRING of RENDER
render(breweryStore.setInitialState());
breweryStore.register(render);

//---------------- Just handy (must be deleted later)
window.breweryStore = breweryStore;
window.toggleModal = modalFavorites.toggleModal;
