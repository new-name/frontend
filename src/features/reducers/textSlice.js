import { createSlice } from "@reduxjs/toolkit";

const textProperties = {
  selectedProperty: "",
  selectedIndex: null,
  selectedSize: 0,
  textArray: [],
};

const initialState = {
  textProperties,
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
  },
});

export const { selectText, selectTextIndex, changeTextSize } =
  textSlice.actions;
export default textSlice.reducer;
