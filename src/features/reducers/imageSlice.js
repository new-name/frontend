import { createSlice } from "@reduxjs/toolkit";

const imageProperties = {
  selectedProperty: "",
  selectedIndex: null,
};

const elements = {};

const initialState = {
  elements,
  imageProperties,
  imageModalVisible: false,
};

export const imageSlice = createSlice({
  name: "image",
  initialState,
  reducers: {
    handleSelectImageProperty: (state, action) => {
      const { imageProperties } = state;

      imageProperties.selectedProperty = action.payload;
    },
    handleSelectImage: (state, action) => {
      const { imageProperties } = state;

      imageProperties.selectedIndex = action.payload;
    },
    handleRenderImage: (state, action) => {
      const property = action.payload;
      const nextIndex = Object.keys(state.elements).length;

      state.elements[nextIndex] = property;

      state.imageModalVisible = false;
    },
    handleResetImage: (state) => {
      const { imageProperties } = state;

      imageProperties.selectedIndex = null;
      imageProperties.selectedProperty = "";
    },
    updateImageModalState: (state, action) => {
      state.imageModalVisible = action.payload;

      state.imageProperties.selectedProperty = "";
    },
    updateImageSize: (state, action) => {
      const { width, height, index } = action.payload;

      state.elements[index].width = width;
      state.elements[index].height = height;

      state.imageProperties.selectedIndex = null;
    },
    updateImagePosition: (state, action) => {
      const { index, x, y } = action.payload;
      if (isNaN(x) || isNaN(y)) return;

      state.elements[index].x += x;
      state.elements[index].y += y;
    },
    updateImageElements: (state, action) => {
      state.elements = action.payload.reduce((acc, el, index) => {
        return { ...acc, [index]: el };
      }, {});
    },
    updateAllImages: (state, action) => {
      const updatedArray = action.payload;
      const sortedArray = updatedArray.sort((a, b) => a.zIndex - b.zIndex);
      const newElements = sortedArray.reduce((acc, element, index) => {
        acc[index] = { ...element };
        return acc;
      }, {});

      state.elements = newElements;
    },
    resetImages: () => initialState,
  },
});

export const {
  handleSelectImageProperty,
  handleSelectImage,
  updateImageSize,
  updateImagePosition,
  updateImageModalState,
  handleRenderImage,
  updateImageElements,
  handleResetImage,
  updateAllImages,
  resetImages,
} = imageSlice.actions;
export default imageSlice.reducer;
