import CONSTANTS from "./constants.js";

//----------HELPERS

export const createBeerItem = (beerItem) => ({
  id: beerItem.id,
  name: beerItem.name,
  logo: beerItem.tagline,
  description: beerItem.description,
  img: beerItem.image_url,
  favourite: false,
});

export default (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CONSTANTS.ADD_NEW_ITEMS:
      console.log(payload);
      return {
        ...state,
        beerItems: payload.map(createBeerItem),
      };
    case CONSTANTS.HANDLE_DELETE:
      return {
        ...state,
        beerItems: [],
      };
    case CONSTANTS.ADD_NEW_SEARCH_ITEM:
      return {
        ...state,
        searchItems: state.searchItems.includes(payload)
          ? state.searchItems
          : [...state.searchItems, payload],
      };
    case CONSTANTS.HANDLE_ERROR:
      return {
        ...state,
        err: payload,
      };
    default:
      return state;
  }
};
