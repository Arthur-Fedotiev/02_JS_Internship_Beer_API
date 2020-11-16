export default (data) => {
  const err = {};
  if (!data.value) err[data.name] = "Must be filled up!";
  return err;
};

export const isEmpty = (value) => {
  return value.length === 0;
};
