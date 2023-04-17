import { createSlice } from "@reduxjs/toolkit";

const textProperties = {
  selectedProperty: "",
  selectedIndex: null,
  selectedSize: 0,
};

const elements = {};

const initialState = {
  textProperties,
  elements,
  fontContainerVisible: false,
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
    selectTextContents: (state, action) => {
      const { index, value } = action.payload;

      state.elements[index].isEditable = value;
    },
    changeTextSize: (state, action) => {
      const { textProperties } = state;

      textProperties.selectedSize = action.payload;
    },
    addTextElements: (state, action) => {
      state.elements = action.payload;

      state.textProperties.selectedProperty = "";
    },
    removeTextElements: (state, action) => {
      const selectedTextIndex = String(action.payload);

      const filteredKeys = Object.keys(state.elements).filter(
        (key) => key !== selectedTextIndex,
      );

      const newElements = filteredKeys.reduce((acc, key, newIndex) => {
        acc[newIndex] = state.elements[key];
        return acc;
      }, {});

      state.elements = newElements;

      textProperties.selectedProperty = "";
    },
    changeTextElements: (state, action) => {
      state.elements = action.payload.reduce((acc, el, index) => {
        return { ...acc, [index]: el };
      }, {});
    },
    updateTextPosition: (state, action) => {
      const { index } = action.payload;
      const { x, y } = action.payload;

      state.elements[index].x += x;
      state.elements[index].y += y;
    },
    updateTextColor: (state, action) => {
      const { index, selectedColor } = action.payload;

      state.elements[index].color = selectedColor;
    },
    updateTextContents: (state, action) => {
      const { index, value } = action.payload;
      const { elements } = state;

      elements[index].text = value;
    },
    updateFontContainerVisible: (state, action) => {
      state.fontContainerVisible = action.payload;
      state.textProperties.selectedProperty = "";
    },
    updateTextFontStyle: (state, action) => {
      const { index, font } = action.payload;

      state.elements[index].fontFamily = font;

      state.fontContainerVisible = false;
      state.textProperties.selectedProperty = "";
    },
  },
});

export const {
  selectText,
  selectTextIndex,
  selectTextContents,
  changeTextSize,
  changeTextElements,
  updateTextPosition,
  addTextElements,
  removeTextElements,
  updateTextColor,
  updateTextContents,
  updateFontContainerVisible,
  updateTextFontStyle,
} = textSlice.actions;
export default textSlice.reducer;
