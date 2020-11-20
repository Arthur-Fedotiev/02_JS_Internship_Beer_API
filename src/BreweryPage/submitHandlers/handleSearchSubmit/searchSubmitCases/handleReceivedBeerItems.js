import { scrollToFirstItem } from "../../../../../utils/scroll.js";

export default ({ store, actionCreators, query, receivedBeerItems }) => {
  const {
    handleError,
    addNewItems,
    addNewSearchItem,
    setSearchQuery,
  } = actionCreators;

  store.dispatch(handleError({ emptyResponse: "" }));
  store.dispatch(addNewItems(receivedBeerItems));
  store.dispatch(addNewSearchItem(query));
  store.dispatch(setSearchQuery(query));
  scrollToFirstItem();
};
