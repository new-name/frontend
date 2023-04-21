import { combineReducers, configureStore } from "@reduxjs/toolkit";

import editorReducer from "../features/reducers/editorSlice";
import gifReducer from "../features/reducers/gifSlice";
import imageReducer from "../features/reducers/imageSlice";
import shapeReducer from "../features/reducers/shapeSlice";
import textReducer from "../features/reducers/textSlice";

const rootReducer = combineReducers({
  editorReducer,
  gifReducer,
  shapeReducer,
  textReducer,
  imageReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
