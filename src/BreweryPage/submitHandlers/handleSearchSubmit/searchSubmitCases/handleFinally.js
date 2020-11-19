export default (store, actionCreators) => {
  store.dispatch(actionCreators.toggleLoading(false));
  document.getElementById("searchInput").value = "";
};
