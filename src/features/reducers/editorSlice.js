import { createSlice } from "@reduxjs/toolkit";

const allElements = {};
const layerElements = {};

const initialState = {
  allElements,
  layerElements,
  selectedProperty: "",
  colorPickerVisible: false,
  layerModalVisible: false,
};

export const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    handleActiveEditor: (state, action) => {
      state.selectedProperty = action.payload;
    },
    handleColorModalVisible: (state, action) => {
      state.colorPickerVisible = action.payload;
    },
    handleLayerModalVisible: (state, action) => {
      state.layerModalVisible = action.payload;
      state.selectedProperty = "";
    },
    updateNewElements: (state, action) => {
      const elements = action.payload;

      Object.keys(elements).forEach((key) => {
        const element = elements[key];
        state.allElements[element.zIndex] = element;
      });
    },
    updateAllElements: (state, action) => {
      const updatedArray = action.payload;

      const newElements = updatedArray.reduce((acc, element, index) => {
        acc[index] = { ...element };
        return acc;
      }, {});

      state.allElements = newElements;
    },
    updateLayer: (state, action) => {
      const updatedArray = action.payload;
      const newElements = updatedArray.reduce((acc, element, index) => {
        acc[index] = { ...element };
        return acc;
      }, {});

      state.layerElements = newElements;
      state.layerModalVisible = false;
    },
  },
});

export const {
  handleActiveEditor,
  handleColorModalVisible,
  handleLayerModalVisible,
  updateNewElements,
  updateAllElements,
  updateLayer,
} = editorSlice.actions;
export default editorSlice.reducer;
