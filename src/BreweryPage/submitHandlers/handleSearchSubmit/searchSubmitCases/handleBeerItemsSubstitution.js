import { scrollToFirstItem } from "../../../../../utils/scroll.js";

export default (store, actionCreators, query, receivedBeerItems) => {
  const {
    handleDelete,
    handleError,
    addNewItems,
    addNewSearchItem,
    setSearchQuery,
  } = actionCreators;

  store.dispatch(handleDelete([]));
  store.dispatch(
    handleError({
      searchQuery: "",
      emptyResponse: "",
      allBeersFetched: "",
    })
  );
  store.dispatch(addNewItems(receivedBeerItems));
  store.dispatch(addNewSearchItem(query));
  store.dispatch(setSearchQuery(query));
  scrollToFirstItem();
};
