import CONSTANT from "../../constants.js";

export default ({ target, store, actionCreators }) => {
  const { addToFavorites, deleteFromFavorites } = actionCreators;
  const addItemToFavorites =
    target.dataset.favorite === CONSTANT.ADD_TO_FAVORITES;

  addItemToFavorites
    ? store.dispatch(addToFavorites(target.id))
    : store.dispatch(deleteFromFavorites(target.id));

  document.getElementById("searchInput").value = "";
};
