import CONSTANT from "../../constants.js";
import { getBeers } from "../../../utils/api.js";
import { isEmpty } from "../../../utils/validate.js";
import { scrollToFirstItem } from "../../../utils/scroll.js";

export default async ({ target, store, actionCreators }) => {
  const {
    toggleLoading,
    setSearchQuery,
    handleError,
    handleDelete,
    addNewItems,
  } = actionCreators;
  const query = target.dataset.searchQuery;

  try {
    store.dispatch(toggleLoading(true));
    store.dispatch(setSearchQuery(query));

    const { beerItems } = store.getState();
    const receivedBeerItems = await getBeers(query);

    if (isEmpty(receivedBeerItems)) {
      store.dispatch(handleError({ emptyResponse: CONSTANT.EMPTY_RESPONSE }));
      store.dispatch(handleDelete([]));
    }

    if (!isEmpty(receivedBeerItems) && isEmpty(beerItems)) {
      store.dispatch(handleError({ emptyResponse: "" }));
      store.dispatch(addNewItems(receivedBeerItems));
      scrollToFirstItem();
    }

    if (!isEmpty(receivedBeerItems) && !isEmpty(beerItems)) {
      store.dispatch(handleDelete([]));
      store.dispatch(
        handleError({
          searchQuery: "",
          emptyResponse: "",
          allBeersFetched: "",
        })
      );
      store.dispatch(addNewItems(receivedBeerItems));
      scrollToFirstItem();
    }
  } catch (error) {
    store.dispatch(
      handleError({ emptyResponse: "Oops... Something went wrong" })
    );
    store.dispatch(handleDelete([]));
  } finally {
    store.dispatch(toggleLoading(false));
    document.getElementById("searchInput").value = query;
  }
};
