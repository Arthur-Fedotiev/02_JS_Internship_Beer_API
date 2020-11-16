import CONSTANTS from "./constants.js";

//----------HELPERS

export const createBeerItem = ({
  id,
  name,
  tagline,
  description,
  image_url,
}) => ({
  id,
  name,
  logo: tagline,
  description,
  img: image_url,
  favourite: false,
});

export default (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CONSTANTS.ADD_NEW_ITEMS:
      return {
        ...state,
        beerItems: [...state.beerItems, ...payload.map(createBeerItem)],
        currentPage: ++state.currentPage,
      };
    case CONSTANTS.HANDLE_DELETE:
      return {
        ...state,
        beerItems: [],
        currentPage: 1,
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
        err: { ...state.err, ...payload },
      };
    case CONSTANTS.SET_SEARCH_QUERY:
      return {
        ...state,
        searchQuery: payload,
      };
    case CONSTANTS.TOGGLE_LOADING:
      return {
        ...state,
        loading: payload,
      };
    default:
      return state;
  }
};
