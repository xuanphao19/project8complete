const multiUseCheckbox = (prev, reference, id) => {
  const isCheckAll = id === reference;
  const index = isCheckAll ? 0 : parseInt(id.match(/\d+$/)[0], 10);

  const update = prev.map((value, i) => {
    return isCheckAll ? (prev[0] ? "" : reference) : i === index ? (value === "" ? id : "") : value;
  });

  const all = update.slice(1).every((value) => value !== "");
  update[0] = all ? reference : "";

  return update;
};

export { multiUseCheckbox };
