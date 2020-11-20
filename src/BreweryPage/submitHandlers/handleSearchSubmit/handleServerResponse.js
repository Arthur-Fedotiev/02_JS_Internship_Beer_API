import handleBeerItemsSubstitution from "./searchSubmitCases/handleBeerItemsSubstitution.js";
import handleEmptyResponse from "./searchSubmitCases/handleEmptyResponse.js";
import { isEmpty } from "../../../../utils/validate.js";
import { scrollToFirstItem } from "../../../../utils/scroll.js";
import CONSTANT from "../../../constants.js";

const actionOnServerResponse = (receivedBeerItems) => {
  return isEmpty(receivedBeerItems)
    ? CONSTANT.SERVER_RESPONSE_IS_EMPTY
    : CONSTANT.SERVER_RESPONDED_WITH_BEERS;
};

const someBeersWereRendered = (beerItems) => {
  return !isEmpty(beerItems);
};

const handleServerPayloadResponse = (data) => {
  const { store, beerItems, actionCreators, receivedBeerItems, query } = data;

  someBeersWereRendered(beerItems)
    ? handleBeerItemsSubstitution(data)
    : store.dispatch(actionCreators.handleError({ emptyResponse: "" }));

  store.dispatch(actionCreators.addNewItems(receivedBeerItems));
  store.dispatch(actionCreators.addNewSearchItem(query));
  store.dispatch(actionCreators.setSearchQuery(query));
  scrollToFirstItem();
};

export default (data) => {
  const followingActionOnServerResponse = actionOnServerResponse(
    data.receivedBeerItems
  );

  switch (followingActionOnServerResponse) {
    case CONSTANT.SERVER_RESPONSE_IS_EMPTY:
      return handleEmptyResponse(data.store, data.actionCreators);

    case CONSTANT.SERVER_RESPONDED_WITH_BEERS:
      return handleServerPayloadResponse(data);

    default:
      throw new Error(
        "Something went wrong processing server response with payload"
      );
  }
};
