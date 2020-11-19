import CONSTANT from "../../../../constants.js";

export default (store, actionCreators) => {
  const { handleError, handleDelete } = actionCreators;
  store.dispatch(handleError({ emptyResponse: CONSTANT.EMPTY_RESPONSE }));
  store.dispatch(handleDelete([]));
};
