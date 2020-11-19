import { getBeers } from "../../../../utils/api.js";
import { isEmpty } from "../../../../utils/validate.js";
import searchSubmit from "./searchSubmitCases/index.js";

const {
  handleBeerItemsSubstitution,
  handleEmptyResponse,
  handleFinally,
  handleReceivedBeerItems,
  handleServerError,
  initialValidation,
} = searchSubmit;

export default async (target, store, actionCreators) => {
  const { beerItems } = store.getState();
  const { toggleLoading } = actionCreators;

  if (target.name === "searchForm") {
    const err = initialValidation(target, store, actionCreators);

    if (!err["searchQuery"]) {
      try {
        const query = target.searchInput.value.trim();
        const receivedBeerItems = await getBeers(query);

        store.dispatch(toggleLoading(true));

        if (isEmpty(receivedBeerItems)) {
          handleEmptyResponse(store, actionCreators);
        }

        if (!isEmpty(receivedBeerItems) && isEmpty(beerItems)) {
          handleReceivedBeerItems(
            store,
            actionCreators,
            query,
            receivedBeerItems
          );
        }

        if (!isEmpty(receivedBeerItems) && !isEmpty(beerItems)) {
          handleBeerItemsSubstitution(
            store,
            actionCreators,
            query,
            receivedBeerItems
          );
        }
      } catch (error) {
        handleServerError(store, actionCreators);
      } finally {
        handleFinally(store, actionCreators);
      }
    }
  }
};
