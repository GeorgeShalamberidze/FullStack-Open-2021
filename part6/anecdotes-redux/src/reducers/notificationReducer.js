const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case "NOTIFICATION":
      return action.data;
    default:
      return state;
  }
};

export const showNotification = (content, time) => {
  return async (dispatch) => {
    dispatch({
      type: "NOTIFICATION",
      data: content,
    });
    setTimeout(() => {
      dispatch({
        type: "NOTIFICATION",
        data: null,
      });
    }, time * 1000);
  };
};

export default notificationReducer;
