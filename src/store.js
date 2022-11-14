import { applyMiddleware, createStore } from "redux";

import thunk from "redux-thunk";

import rootReducer from "./reducers/index";
import { composeWithDevTools } from "@redux-devtools/extension";

const composeEnhancers = composeWithDevTools({
  // Specify name here, actionsDenylist, actionsCreators and other options if needed
  trace: true,
});
export default createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
