import { createSlice } from "@reduxjs/toolkit";

const allElements = {};

const initialState = {
  allElements,
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
    updateAllElements: (state, action) => {
      const elements = action.payload;
      const allElements = Object.keys(elements).map(
        (value, index) => elements[value],
      );
      const lastObject = allElements.length - 1;

      if (allElements[lastObject]) {
        state.allElements[allElements[lastObject].zIndex] =
          allElements[lastObject];
      }

      console.log(state.allElements, "why?");
    },
  },
});

export const {
  handleActiveEditor,
  handleColorModalVisible,
  handleLayerModalVisible,
  updateAllElements,
} = editorSlice.actions;
export default editorSlice.reducer;
