import validate from "../../../../../utils/validate.js";

export default (target, store, actionCreators) => {
  const { handleError, setSearchQuery } = actionCreators;
  const err = validate({
    name: "searchQuery",
    value: target.searchInput.value,
  });

  store.dispatch(handleError({ ...err, emptyResponse: "" }));

  if (err["searchQuery"]) {
    store.dispatch(setSearchQuery(""));
  }
  return err;
};
