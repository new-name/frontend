import { createSlice } from "@reduxjs/toolkit";

const shapeProperties = {};
const elements = {};
const iconArrays = [];

const initialState = {
  shapeProperties,
  elements,
  iconArrays,
  isIconModalVisible: false,
};

export const shapeSlice = createSlice({
  name: "shape",
  initialState,
  reducers: {
    getIcons: (state, action) => {
      state.iconArrays.push(action.payload);
      state.isIconModalVisible = false;
    },
    updateIconModalState: (state, action) => {
      state.isIconModalVisible = action.payload;
    },
  },
});

export const { getIcons, updateIconModalState } = shapeSlice.actions;
export default shapeSlice.reducer;
