import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { loadJobReducer } from "./reducers/jobReducer";
import { loadJobTypeReducer } from "./reducers/jobTypeReducer";
import {
  userLogoutReducer,
  userReducerProfile,
  userSignInReducer,
} from "./reducers/userReducer";

//combine reducers
const reducer = combineReducers({
  loadJob: loadJobReducer,
  jobtype: loadJobTypeReducer,
  signIn: userSignInReducer,
  loguOut: userLogoutReducer,
  userProfile: userReducerProfile,
});

//initial state
let initialState = {
  signIn: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
};
const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
