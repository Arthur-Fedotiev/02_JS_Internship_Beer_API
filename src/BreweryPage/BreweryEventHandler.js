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
    const dataForClickHandlers = { target, store: this.store, actionCreators };

    if (!!target.dataset.searchQuery) {
      handleSearchQuery(dataForClickHandlers);
    }

    if (target.id === CONSTANT.LOAD_MORE) {
      handleLoadMoreBeers(dataForClickHandlers);
    }

    if (scrollTopArrow.isMyChild(target)) {
      return scrollToFirstItem();
    }

    if (!!target.dataset.favorite) {
      handleAddToFavorites(dataForClickHandlers);
    }

    if (target.id === CONSTANT.FAVORITE_BTN) {
      modalFavorites.toggleModal(true);
    }

    if (target.dataset.role === CONSTANT.BEER_PICKER) {
      this.store.dispatch(actionCreators.pickBeerItem(target.id));
      modalBeerItem.toggleModal(true);
    }

    if (target.dataset.role === CONSTANT.TOGGLE_MODAL) {
      target.id === CONSTANT.CLOSE_BEER_MODAL
        ? modalBeerItem.toggleModal(false)
        : modalFavorites.toggleModal(false);
    }
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    if (e.target.name === CONSTANT.SEARCH_FORM) {
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
