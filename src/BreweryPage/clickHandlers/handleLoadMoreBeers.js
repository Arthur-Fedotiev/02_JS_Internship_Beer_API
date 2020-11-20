import { getBeers } from "../../../utils/api.js";
import { isEmpty } from "../../../utils/validate.js";
import { scrollToBottom } from "../../../utils/scroll.js";

export default async (store, actionCreators) => {
  const {
    toggleLoading,
    handleError,
    handleDelete,
    addNewItems,
  } = actionCreators;

  try {
    store.dispatch(toggleLoading(true));

    const { searchQuery, currentPage } = store.getState();
    const receivedBeerItems = await getBeers(searchQuery, currentPage);

    if (!isEmpty(receivedBeerItems)) {
      store.dispatch(addNewItems(receivedBeerItems));
      scrollToBottom();
    }

    if (isEmpty(receivedBeerItems)) {
      store.dispatch(
        handleError({ allBeersFetched: "That's all we've got for ya ;)" })
      );
    }
  } catch (error) {
    store.dispatch(
      handleError({ emptyResponse: "Oops... Something went wrong" })
    );
    store.dispatch(handleDelete([]));
  } finally {
    store.dispatch(toggleLoading(false));
  }
};
