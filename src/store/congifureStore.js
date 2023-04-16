import { combineReducers, configureStore } from "@reduxjs/toolkit";

import editorReducer from "../features/reducers/editorSlice";
import gifReducer from "../features/reducers/gifSlice";
import shapeReducer from "../features/reducers/shapeSlice";
import textReducer from "../features/reducers/textSlice";

const rootReducer = combineReducers({
  editorReducer,
  gifReducer,
  shapeReducer,
  textReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
