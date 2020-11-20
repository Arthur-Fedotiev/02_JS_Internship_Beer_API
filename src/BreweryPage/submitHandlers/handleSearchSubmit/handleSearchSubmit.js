import { getBeers } from "../../../../utils/api.js";
import { isEmpty } from "../../../../utils/validate.js";
import searchSubmit from "./searchSubmitCases/index.js";
import CONSTANT from "../../../constants.js";

const {
  handleBeerItemsSubstitution,
  handleEmptyResponse,
  handleFinally,
  handleReceivedBeerItems,
  handleServerError,
  initialValidation,
} = searchSubmit;

export default async ({ target, store, actionCreators }) => {
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

        // const actionOnServerResponse = (receivedBeerItems) => {
        //   return isEmpty(receivedBeerItems)
        //     ? CONSTANT.SERVER_RESPONSE_IS_EMPTY
        //     : CONSTANT.SERVER_RESPONDED_WITH_BEERS;
        // };

        // const handleServerPayloadReasponse = (data) => {};

        // const someBeersWereRendered = (beerItems) => {
        //   return !isEmpty(beerItems);
        // };

        // const handleServerResponse = (receivedBeerItems, beerItems) => {
        //   const followingActionOnServerResponse = actionOnServerResponse(
        //     receivedBeerItems
        //   );
        //   switch (followingActionOnServerResponse) {
        //     case CONSTANT.SERVER_RESPONSE_IS_EMPTY:
        //       break;
        //     case CONSTANT.SERVER_RESPONDED_WITH_BEERS:
        //       //------------------NEW ITEMS
        //       someBeersWereRendered(beerItems) &&
        //         //store.dispatch(handleError({ emptyResponse: "" }));
        //         store.dispatch(addNewItems(receivedBeerItems));
        //       store.dispatch(addNewSearchItem(query));
        //       store.dispatch(setSearchQuery(query));
        //       scrollToFirstItem();
        //       //------SUBSTITUTION
        //       // store.dispatch(handleDelete([]));
        //       // store.dispatch(
        //       //   handleError({
        //       //     searchQuery: "",
        //       //     emptyResponse: "",
        //       //     allBeersFetched: "",
        //       //   })
        //       // );
        //       store.dispatch(addNewItems(receivedBeerItems));
        //       store.dispatch(addNewSearchItem(query));
        //       store.dispatch(setSearchQuery(query));
        //       scrollToFirstItem();
        //     default:
        //       break;
        //   }
        // };

        if (!isEmpty(receivedBeerItems) && isEmpty(beerItems)) {
          handleReceivedBeerItems({
            store,
            actionCreators,
            query,
            receivedBeerItems,
          });
        }

        if (!isEmpty(receivedBeerItems) && !isEmpty(beerItems)) {
          handleBeerItemsSubstitution({
            store,
            actionCreators,
            query,
            receivedBeerItems,
          });
        }
      } catch (error) {
        handleServerError(store, actionCreators);
      } finally {
        handleFinally(store, actionCreators);
      }
    }
  }
};
