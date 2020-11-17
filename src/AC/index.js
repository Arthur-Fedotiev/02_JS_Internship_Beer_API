import CONSTANTS from "../constants.js";

export const addNewItems = (items) => ({
  type: CONSTANTS.ADD_NEW_ITEMS,
  payload: items,
});

export const addNewSearchItem = (searchItem) => ({
  type: CONSTANTS.ADD_NEW_SEARCH_ITEM,
  payload: searchItem,
});
export const handleError = (value) => ({
  type: CONSTANTS.HANDLE_ERROR,
  payload: value,
});

export const handleDelete = () => ({
  type: CONSTANTS.HANDLE_DELETE,
  payload: null,
});
