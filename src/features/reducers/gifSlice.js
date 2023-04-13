import { createSlice } from "@reduxjs/toolkit";

const gifProperties = {
  selectedProperty: "",
  selectedIndex: null,
  selectedSize: 0,
  gifURLArrays: [],
  gifArray: [],
};

const initialState = {
  gifProperties,
};

export const gifSlice = createSlice({
  name: "gif",
  initialState,
  reducers: {
    getGifURL: (state, action) => {
      const { gifProperties } = state;

      gifProperties.gifURLArrays = action.payload;
    },
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

export const { getGifURL, selectedGifIndex, changeGifSize } = gifSlice.actions;
export default gifSlice.reducer;
