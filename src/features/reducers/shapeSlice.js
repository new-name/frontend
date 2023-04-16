import { createSlice } from "@reduxjs/toolkit";

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
    handleSelectIcons: (state, action) => {
      const { shapeProperties } = state;

      shapeProperties.selectedIndex = action.payload;
    },
    updateIconModalState: (state, action) => {
      state.isIconModalVisible = action.payload;

      state.shapeProperties.selectedProperty = "";
    },
    updateIconPosition: (state, action) => {
      const { index } = action.payload;
      const { x, y } = action.payload;

      state.elements[index].x += x;
      state.elements[index].y += y;
    },
  },
});

export const {
  handleSelectProperty,
  handleRenderIcons,
  updateIconModalState,
  handleSelectIcons,
  updateIconPosition,
} = shapeSlice.actions;
export default shapeSlice.reducer;
