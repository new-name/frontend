import { createSlice } from "@reduxjs/toolkit";

const textProperties = {
  selectedProperty: "",
  selectedIndex: null,
  selectedSize: 0,
};

const elements = {
  0: {
    text: "Sample Text",
    x: 0,
    y: 0,
    size: 20,
    color: "black",
    zIndex: 0,
    isEditable: false,
  },
};

const initialState = {
  textProperties,
  elements,
  colorPickerVisible: false,
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
      state.colorPickerVisible = false;
    },
    updateColorPickerVisible: (state, action) => {
      state.colorPickerVisible = action.payload;
      state.textProperties.selectedProperty = "";
    },
    updateTextContents: (state, action) => {
      const { index, value } = action.payload;

      if (state.elements[index]) {
        state.elements[index].text = value;
      } else {
        console.error(`Element at index ${index} not found.`);
      }
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
  updateColorPickerVisible,
  updateTextContents,
  updateFontContainerVisible,
  updateTextFontStyle,
} = textSlice.actions;
export default textSlice.reducer;
