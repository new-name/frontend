import { combineReducers, configureStore } from "@reduxjs/toolkit";

import gifReducer from "../features/reducers/gifSlice";
import shapeReducer from "../features/reducers/shapeSlice";
import textReducer from "../features/reducers/textSlice";

const rootReducer = combineReducers({
  textReducer,
  gifReducer,
  shapeReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
