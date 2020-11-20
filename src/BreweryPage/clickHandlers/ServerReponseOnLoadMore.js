import CONSTANT from "../../constants.js";
import { scrollToBottom } from "../../../utils/scroll.js";
import { actionOnServerResponse } from "../../../utils/api.js";

const handleEmptyResponse = ({ store, actionCreators }) => {
  store.dispatch(
    actionCreators.handleError({
      allBeersFetched: "That's all we've got for ya ;)",
    })
  );
};

const handleResponseWithPayload = ({
  store,
  receivedBeerItems,
  actionCreators,
}) => {
  store.dispatch(actionCreators.addNewItems(receivedBeerItems));
  scrollToBottom();
};

export default (data) => {
  const serverResponseOnLoadMore = actionOnServerResponse(
    data.receivedBeerItems
  );

  serverResponseOnLoadMore === CONSTANT.SERVER_RESPONSE_IS_EMPTY
    ? handleEmptyResponse(data)
    : handleResponseWithPayload(data);
};
