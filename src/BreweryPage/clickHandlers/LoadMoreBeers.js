import { getBeers } from "../../../utils/api.js";
import handleServerResponseOnLoadMore from "./ServerReponseOnLoadMore.js";

export default async ({ store, actionCreators }) => {
  const { toggleLoading, handleError, handleDelete } = actionCreators;

  try {
    store.dispatch(toggleLoading(true));

    const { searchQuery, currentPage } = store.getState();
    const receivedBeerItems = await getBeers(searchQuery, currentPage);
    const dataToHandleLoadMore = {
      store,
      actionCreators,
      receivedBeerItems,
    };

    handleServerResponseOnLoadMore(dataToHandleLoadMore);
  } catch (error) {
    store.dispatch(
      handleError({ emptyResponse: "Oops... Something went wrong" })
    );
    store.dispatch(handleDelete([]));
  } finally {
    store.dispatch(toggleLoading(false));
  }
};
