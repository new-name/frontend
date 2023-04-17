import { createSlice } from "@reduxjs/toolkit";

const gifProperties = {
  selectedProperty: "",
  selectedIndex: null,
  selectedSize: 0,
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
    updateGifModalState: (state, action) => {
      state.gifModalVisible = action.payload;

      state.gifProperties.selectedProperty = "";
    },
    updateGifSize: (state, action) => {
      const { gifProperties } = state;

      gifProperties.selectedSize = action.payload;
    },
    updateGifPosition: (state, action) => {
      const { index, x, y } = action.payload;

      state.elements[index].x += x;
      state.elements[index].y += y;
    },
    handleRenderGif: (state, action) => {
      state.elements = action.payload;

      state.gifModalVisible = false;
    },
  },
});

export const {
  handleSelectGifProperty,
  handleSelectGif,
  updateGifSize,
  updateGifPosition,
  updateGifModalState,
  handleRenderGif,
} = gifSlice.actions;
export default gifSlice.reducer;
