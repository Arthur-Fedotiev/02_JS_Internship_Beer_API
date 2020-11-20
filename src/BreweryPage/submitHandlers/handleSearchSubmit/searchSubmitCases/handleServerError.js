export default (store, actionCreators) => {
  const { handleError, handleDelete, setSearchQuery } = actionCreators;

  store.dispatch(
    handleError({
      emptyResponse: "Oops... Something went wrong",
      searchQuery: "",
    })
  );
  store.dispatch(handleDelete([]));
  store.dispatch(setSearchQuery(""));
};
