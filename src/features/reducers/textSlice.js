import { createSlice } from "@reduxjs/toolkit";

import {
  MAX_TEXT_SIZE,
  MIN_TEXT_SIZE,
  SCROLL_HANDLE_HEIGHT,
} from "../../constants/size";

const textProperties = {
  selectedProperty: "",
  selectedIndex: null,
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
    handleSelectTextProperty: (state, action) => {
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

      state.textProperties.selectedProperty = "";
    },
    renderNewTextElement: (state) => {
      const nextIndex = Object.keys(state.elements).length;
      const newTextModel = {
        text: "Sample Text",
        x: 0,
        y: 0,
        size: 20,
        color: "black",
        fontStyle: "",
        rotate: 0,
        zIndex: 0,
      };

      const updatedTextElements = {
        ...state.elements,
        [nextIndex]: newTextModel,
      };

      state.elements = updatedTextElements;

      state.textProperties.selectedProperty = "";
    },
    updateTextPosition: (state, action) => {
      const { index } = action.payload;
      const { x, y } = action.payload;

      state.elements[index].x += x;
      state.elements[index].y += y;
    },
    updateTextSize: (state, action) => {
      const index = state.textProperties.selectedIndex;
      const { handlerPositionOfY, scrollHeight } = action.payload;

      const updatedSize =
        MIN_TEXT_SIZE +
        ((scrollHeight - SCROLL_HANDLE_HEIGHT - handlerPositionOfY) /
          (scrollHeight - SCROLL_HANDLE_HEIGHT)) *
          (MAX_TEXT_SIZE - MIN_TEXT_SIZE);

      state.elements[index].size = updatedSize;
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
  handleSelectTextProperty,
  selectTextIndex,
  selectTextContents,
  updateTextSize,
  changeTextElements,
  updateTextPosition,
  renderNewTextElement,
  removeTextElements,
  updateTextColor,
  updateTextContents,
  updateFontContainerVisible,
  updateTextFontStyle,
} = textSlice.actions;
export default textSlice.reducer;
