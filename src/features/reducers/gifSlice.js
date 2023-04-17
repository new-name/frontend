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
      const index = state.gifProperties.selectedIndex;

      state.elements[index].size = action.payload;
    },
    updateGifPosition: (state, action) => {
      const { index, x, y } = action.payload;

      state.elements[index].x += x;
      state.elements[index].y += y;
    },
    updateGifElements: (state, action) => {
      state.elements = action.payload.reduce((acc, el, index) => {
        return { ...acc, [index]: el };
      }, {});
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
  updateGifElements,
} = gifSlice.actions;
export default gifSlice.reducer;
