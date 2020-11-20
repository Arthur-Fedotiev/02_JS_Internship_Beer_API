export default ({ target, store, actionCreators }) => {
  const { addToFavorites, deleteFromFavorites } = actionCreators;
  const addItemToFavorites = target.dataset.favorite === "add";

  if (addItemToFavorites) {
    store.dispatch(addToFavorites(target.id));
  }

  if (!addItemToFavorites) {
    store.dispatch(deleteFromFavorites(target.id));
  }

  document.getElementById("searchInput").value = "";
};
