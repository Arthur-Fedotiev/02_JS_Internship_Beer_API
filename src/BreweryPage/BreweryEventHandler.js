import EventHandler from "../EventHandler.js";
import BreweryStore from "./BreweryStore.js";
import clickHandlers from "./clickHandlers/index.js";
import handleSearchSubmit from "./submitHandlers/handleSearchSubmit/handleSearchSubmit.js";
import * as actionCreators from "../AC/index.js";
import { scrollToFirstItem } from "../../utils/scroll.js";
import CONSTANT from "../../src/constants.js";
import {
  scrollTopArrow,
  modalFavorites,
  modalBeerItem,
} from "./BreweryPageMarkupComponents.js";

const {
  handleAddToFavorites,
  handleSearchQuery,
  handleLoadMoreBeers,
} = clickHandlers;

export class BreweryEventHandler extends EventHandler {
  constructor(store) {
    super(store);
  }

  handleClick = async ({ target }) => {
    if (!!target.dataset.searchQuery) {
      handleSearchQuery({ target, store: this.store, actionCreators });
    }

    if (target.id === "loadMore") {
      handleLoadMoreBeers(this.store, actionCreators);
    }

    if (scrollTopArrow.isMyChild(target)) {
      return scrollToFirstItem();
    }

    if (!!target.dataset.favorite) {
      handleAddToFavorites({ target, store: this.store, actionCreators });
    }

    if (target.id === "favoriteBtn") {
      modalFavorites.toggleModal(true);
    }

    if (target.dataset.role === "beerPicker") {
      this.store.dispatch(actionCreators.pickBeerItem(target.id));
      modalBeerItem.toggleModal(true);
    }

    if (target.dataset.role === "toggleModal") {
      target.id === "closeBeerModal"
        ? modalBeerItem.toggleModal(false)
        : modalFavorites.toggleModal(false);
    }
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    if (e.target.name === "searchForm") {
      handleSearchSubmit({
        target: e.target,
        store: this.store,
        actionCreators,
      });
    }
  };

  handleKeydown = (e) => {
    if (e.code !== CONSTANT.ESCAPE_KEY) return;

    modalFavorites.toggleModal(false);
    modalBeerItem.toggleModal(false);
  };
}

export default new BreweryEventHandler(BreweryStore);
