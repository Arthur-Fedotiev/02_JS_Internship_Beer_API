import CONSTANT from "../src/constants.js";

export default (description) => {
  return `${description.substring(
    0,
    CONSTANT.DESCRIPTION_TRUNCATION_NUMBER
  )}...`;
};
