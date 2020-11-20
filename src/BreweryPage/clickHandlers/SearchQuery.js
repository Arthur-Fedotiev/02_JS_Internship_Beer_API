import { getBeers } from "../../../utils/api.js";
import handleServerResponseOnQueryRecall from "./ServerResponseOnQueryRecall.js";

export default async ({ target, store, actionCreators }) => {
  const {
    toggleLoading,
    setSearchQuery,
    handleError,
    handleDelete,
  } = actionCreators;
  const query = target.dataset.searchQuery;

  try {
    store.dispatch(toggleLoading(true));
    store.dispatch(setSearchQuery(query));

    const { beerItems } = store.getState();
    const receivedBeerItems = await getBeers(query);

    const dataToHandleQuery = {
      store,
      actionCreators,
      beerItems,
      receivedBeerItems,
      query,
    };

    handleServerResponseOnQueryRecall(dataToHandleQuery);
  } catch (error) {
    console.log(error);
    store.dispatch(
      handleError({ emptyResponse: "Oops... Something went wrong" })
    );
    store.dispatch(handleDelete([]));
  } finally {
    store.dispatch(toggleLoading(false));
    document.getElementById("searchInput").value = query;
  }
};
