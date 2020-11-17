export default (data) => {
  const err = {};
  if (!data.value) err[data.name] = "Must be filled up!";
  return err;
};
