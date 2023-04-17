import { createSlice } from "@reduxjs/toolkit";

import { STROKE } from "../../constants/property";

const shapeProperties = {
  selectedProperty: "",
  selectedIndex: null,
  selectedSize: 0,
};

const elements = {};

const initialState = {
  shapeProperties,
  elements,
  isIconModalVisible: false,
};

export const shapeSlice = createSlice({
  name: "shape",
  initialState,
  reducers: {
    handleSelectProperty: (state, action) => {
      const { shapeProperties } = state;

      shapeProperties.selectedProperty = action.payload;
    },
    handleRenderIcons: (state, action) => {
      state.elements = action.payload;

      state.isIconModalVisible = false;
    },
    handleRenderShapes: (state, action) => {
      state.elements = action.payload;

      state.shapeProperties.selectedProperty = "";
    },
    handleSelectShape: (state, action) => {
      const { shapeProperties } = state;

      shapeProperties.selectedIndex = action.payload;
    },
    updateShapePosition: (state, action) => {
      const { index } = action.payload;
      const { x, y } = action.payload;

      state.elements[index].x += x;
      state.elements[index].y += y;
    },
    updateShapeColor: (state, action) => {
      const { index, selectedColor, mode, strokeWidth } = action.payload;

      if (mode === STROKE) {
        state.elements[index].stroke = selectedColor;
        state.elements[index].strokeWidth = strokeWidth;
      }

      if (mode !== STROKE) {
        state.elements[index].color = selectedColor;
      }
    },
    updateIconModalState: (state, action) => {
      state.isIconModalVisible = action.payload;

      state.shapeProperties.selectedProperty = "";
    },
  },
});

export const {
  handleSelectProperty,
  handleSelectShape,
  handleRenderIcons,
  updateIconModalState,
  updateShapePosition,
  updateShapeColor,
  handleRenderShapes,
} = shapeSlice.actions;
export default shapeSlice.reducer;
