export default ({ store, actionCreators }) => {
  const { handleDelete, handleError } = actionCreators;

  store.dispatch(handleDelete([]));
  store.dispatch(
    handleError({
      searchQuery: "",
      emptyResponse: "",
      allBeersFetched: "",
    })
  );
};
