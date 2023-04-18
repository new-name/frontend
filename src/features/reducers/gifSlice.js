import { createSlice } from "@reduxjs/toolkit";

import {
  MAX_GIF_SIZE,
  MIN_GIF_SIZE,
  SCROLL_HANDLE_HEIGHT,
} from "../../constants/size";

const gifProperties = {
  selectedProperty: "",
  selectedIndex: null,
};

const elements = {};

const initialState = {
  elements,
  gifProperties,
  gifModalVisible: false,
};

export const gifSlice = createSlice({
  name: "gif",
  initialState,
  reducers: {
    handleSelectGifProperty: (state, action) => {
      const { gifProperties } = state;

      gifProperties.selectedProperty = action.payload;
    },
    handleSelectGif: (state, action) => {
      const { gifProperties } = state;

      gifProperties.selectedIndex = action.payload;
    },
    handleResetGif: (state) => {
      const { gifProperties } = state;

      gifProperties.selectedIndex = null;
      gifProperties.selectedProperty = "";
    },
    updateGifModalState: (state, action) => {
      state.gifModalVisible = action.payload;

      state.gifProperties.selectedProperty = "";
    },
    handleRenderGif: (state, action) => {
      state.elements = action.payload;

      state.gifModalVisible = false;
    },
    updateGifSize: (state, action) => {
      const index = state.gifProperties.selectedIndex;
      const { handlerPositionOfY, scrollHeight } = action.payload;

      const updatedSize =
        MIN_GIF_SIZE +
        ((scrollHeight - SCROLL_HANDLE_HEIGHT - handlerPositionOfY) /
          (scrollHeight - SCROLL_HANDLE_HEIGHT)) *
          (MAX_GIF_SIZE - MIN_GIF_SIZE);

      state.elements[index].size = updatedSize;
    },
    updateGifPosition: (state, action) => {
      const { index, x, y } = action.payload;

      state.elements[index].x += x;
      state.elements[index].y += y;
    },
  },
});

export const {
  handleSelectGifProperty,
  handleSelectGif,
  handleRenderGif,
  updateGifSize,
  updateGifPosition,
  updateGifModalState,
  handleResetGif,
} = gifSlice.actions;
export default gifSlice.reducer;
