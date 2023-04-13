import { createSlice } from "@reduxjs/toolkit";

const texts = {
  selectedText: "",
  selectedTextIndex: null,
  textArray: [],
};

const initialState = {
  texts,
};

export const textSlice = createSlice({
  name: "text",
  initialState,
  reducers: {
    updateText: (state, action) => {
      state.texts.push(action.payload);
    },
  },
});

export const { updateText } = textSlice.actions;
export default textSlice.reducer;
