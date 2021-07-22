const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case "NOTIFICATION":
      return action.data;
    default:
      return state;
  }
};

export const showNotification = (content) => {
  return {
    type: "NOTIFICATION",
    data: content,
  };
};

export default notificationReducer;
