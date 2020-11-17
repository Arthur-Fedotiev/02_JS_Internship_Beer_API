import CONSTANTS from "./constants.js";

//----------HELPERS

export default (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CONSTANTS.ADD_NEW_ITEMS:
      console.log(payload);
      return {
        ...state,
        beerItems: payload,
      };
    case CONSTANTS.ADD_NEW_SEARCH_ITEM:
      return {
        ...state,
        searchItems: state.searchItems.includes(payload)
          ? state.searchItems
          : [...state.searchItems, payload],
      };

    default:
      return state;
  }
};
