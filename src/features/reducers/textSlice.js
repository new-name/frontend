import { createSlice } from "@reduxjs/toolkit";

const textProperties = {
  selectedProperty: "",
  selectedIndex: null,
  selectedSize: 0,
  textArray: [],
};

const elements = [
  { text: "GIF", size: 16 },
  { text: "ASSETS", size: 16 },
  { text: "IMAGES", size: 16 },
];

const initialState = {
  textProperties,
  elements,
};

export const textSlice = createSlice({
  name: "text",
  initialState,
  reducers: {
    selectText: (state, action) => {
      const { textProperties } = state;

      textProperties.selectedProperty = action.payload;
    },
    selectTextIndex: (state, action) => {
      const { textProperties } = state;

      textProperties.selectedIndex = action.payload;
    },
    changeTextSize: (state, action) => {
      const { textProperties } = state;

      textProperties.selectedSize = action.payload;
    },
    changeTextElements: (state, action) => {
      state.elements = action.payload;
    },
  },
});

export const {
  selectText,
  selectTextIndex,
  changeTextSize,
  changeTextElements,
} = textSlice.actions;
export default textSlice.reducer;
