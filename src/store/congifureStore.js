import { combineReducers, configureStore } from "@reduxjs/toolkit";

import textReducer from "../features/reducers/textSlice";

const rootReducer = combineReducers({
  text: textReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
