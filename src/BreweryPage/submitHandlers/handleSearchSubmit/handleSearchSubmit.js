import { getBeers } from "../../../../utils/api.js";
import searchSubmit from "./searchSubmitCases/index.js";
import handleServerResponse from "./handleServerResponse.js";
import CONSTANT from "../../../constants.js";

const { handleFinally, handleServerError, initialValidation } = searchSubmit;

export default async (data) => {
  const { actionCreators, store, target } = data;
  const { beerItems } = store.getState();

  if (target.name === CONSTANT.SEARCH_FORM) {
    const err = initialValidation(data);

    if (!err["searchQuery"]) {
      try {
        const query = target.searchInput.value.trim();
        const receivedBeerItems = await getBeers(query);
        const handleResponseData = {
          ...data,
          beerItems,
          receivedBeerItems,
          query,
        };

        store.dispatch(actionCreators.toggleLoading(true));
        handleServerResponse(handleResponseData);
      } catch (error) {
        handleServerError(store, actionCreators);
      } finally {
        handleFinally(store, actionCreators);
      }
    }
  }
};
