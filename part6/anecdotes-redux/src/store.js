import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import anecdoteReducer from "./reducers/anecdoteReducer";
import notificationReducer from "./reducers/notificationReducer";
import filterReducer from "./reducers/filterReducer";

import { composeWithDevTools } from "redux-devtools-extension";

const reducer = combineReducers({
  anecdote: anecdoteReducer,
  notification: notificationReducer,
  filter: filterReducer,
});

export const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk))
);

store.subscribe(() => {
  console.log("WHOLE STORE: ", store.getState());
});
