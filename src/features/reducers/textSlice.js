import { createSlice } from "@reduxjs/toolkit";

const textProperties = {
  selectedProperty: "",
  selectedIndex: null,
  selectedSize: 0,
  textArray: [],
};

const elements = {
  0: {
    text: "Sample Text",
    x: 0,
    y: 0,
    size: 20,
    color: "black",
    fontStyle: "",
    rotate: 0,
    zIndex: 0,
  },
  1: {
    text: "Sample Text",
    x: 0,
    y: 0,
    size: 40,
    color: "red",
    fontStyle: "",
    rotate: 0,
    zIndex: 0,
  },
};

const initialState = {
  textProperties,
  elements,
  colorpickerVisible: false,
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
    addTextElements: (state, action) => {
      state.elements = action.payload;
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
    updateColorpickerVisible: (state, action) => {
      state.colorpickerVisible = action.payload;
      state.textProperties.selectedProperty = "";
    },
  },
});

export const {
  selectText,
  selectTextIndex,
  changeTextSize,
  changeTextElements,
  updateTextPosition,
  addTextElements,
  removeTextElements,
  updateTextColor,
  updateColorpickerVisible,
} = textSlice.actions;
export default textSlice.reducer;
