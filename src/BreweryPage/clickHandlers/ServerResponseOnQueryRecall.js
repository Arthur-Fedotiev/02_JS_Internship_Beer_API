import CONSTANT from "../../constants.js";
import { scrollToFirstItem } from "../../../utils/scroll.js";
import {
  actionOnServerResponse,
  someBeersWereRendered,
} from "../../../utils/api.js";

const handleAllBeersFetchedCase = ({ store, actionCreators }) => {
  store.dispatch(
    actionCreators.handleError({ emptyResponse: CONSTANT.EMPTY_RESPONSE })
  );
  store.dispatch(actionCreators.handleDelete([]));
};

const substituteBeers = ({ store, actionCreators, receivedBeerItems }) => {
  store.dispatch(actionCreators.handleDelete([]));
  store.dispatch(
    actionCreators.handleError({
      searchQuery: "",
      emptyResponse: "",
      allBeersFetched: "",
    })
  );
  store.dispatch(actionCreators.addNewItems(receivedBeerItems));
  scrollToFirstItem();
};

const fetchBeersFirstTime = ({ store, actionCreators, receivedBeerItems }) => {
  store.dispatch(actionCreators.handleError({ emptyResponse: "" }));
  store.dispatch(actionCreators.addNewItems(receivedBeerItems));
  scrollToFirstItem();
};

const handleResponseWithReceivedData = (data) => {
  someBeersWereRendered(data.beerItems)
    ? substituteBeers(data)
    : fetchBeersFirstTime(data);
};

export default (data) => {
  const serverResponseOnQueryRecall = actionOnServerResponse(
    data.receivedBeerItems
  );

  serverResponseOnQueryRecall === CONSTANT.SERVER_RESPONSE_IS_EMPTY
    ? handleAllBeersFetchedCase(data)
    : handleResponseWithReceivedData(data);
};
