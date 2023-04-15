import { createSlice } from "@reduxjs/toolkit";

const shapeProperties = {};
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
    getIcons: (state, action) => {
      state.elements = action.payload;
      state.isIconModalVisible = false;
    },
    updateIconModalState: (state, action) => {
      state.isIconModalVisible = action.payload;
    },
  },
});

export const { getIcons, updateIconModalState } = shapeSlice.actions;
export default shapeSlice.reducer;
