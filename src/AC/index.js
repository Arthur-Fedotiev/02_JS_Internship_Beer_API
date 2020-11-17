import CONSTANTS from "../constants.js";

export const addNewItems = (items) => ({
  type: CONSTANTS.ADD_NEW_ITEMS,
  payload: items,
});

export const addNewSearchItem = (searchItem) => ({
  type: CONSTANTS.ADD_NEW_SEARCH_ITEM,
  payload: searchItem,
});
