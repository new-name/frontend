import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedProperty: "",
  colorPickerVisible: false,
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
  },
});

export const { handleActiveEditor, handleColorModalVisible } =
  editorSlice.actions;
export default editorSlice.reducer;
