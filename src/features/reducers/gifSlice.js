import { createSlice } from "@reduxjs/toolkit";

const gifProperties = {
  selectedProperty: "",
  selectedIndex: null,
  selectedSize: 0,
  gifArray: [],
};

const initialState = {
  gifProperties,
};

export const gifSlice = createSlice({
  name: "gif",
  initialState,
  reducers: {
    selectedGifIndex: (state, action) => {
      const { gifProperties } = state;

      gifProperties.selectedIndex = action.payload;
    },
    changeGifSize: (state, action) => {
      const { gifProperties } = state;

      gifProperties.selectedSize = action.payload;
    },
  },
});

export const { selectedGifIndex, changeGifSize } = gifSlice.actions;
export default gifSlice.reducer;
