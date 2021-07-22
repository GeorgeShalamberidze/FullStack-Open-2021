const filterReducer = (state = "", action) => {
  const { type, data } = action;
  switch (type) {
    case "FILTER":
      return data;
    default:
      return state;
  }
};

export default filterReducer;
