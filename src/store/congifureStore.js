import { combineReducers, configureStore } from "@reduxjs/toolkit";

import gifReducer from "../features/reducers/gifSlice";
import textReducer from "../features/reducers/textSlice";

const rootReducer = combineReducers({
  textReducer,
  gifReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
