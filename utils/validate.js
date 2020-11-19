import CONSTANT from "../src/constants.js";

export default (data) => {
  const err = {};

  if (!data.value) {
    err[data.name] = CONSTANT.EMPTY_QUERY;
  }

  return err;
};

export const isEmpty = (value) => {
  return value.length === 0;
};
