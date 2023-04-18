import { createSlice } from "@reduxjs/toolkit";

import { ICON, STROKE, LINE } from "../../constants/property";
import {
  MAX_ICON_SIZE,
  MAX_LINE_SIZE,
  MIN_ICON_SIZE,
  MIN_LINE_SIZE,
  SCROLL_HANDLE_HEIGHT,
} from "../../constants/size";

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
    updateShapeSize: (state, action) => {
      const index = state.shapeProperties.selectedIndex;
      const { width, height, handlerPositionOfY, scrollHeight } =
        action.payload;

      if (state.elements[index].type === ICON) {
        const iconSize =
          MIN_ICON_SIZE +
          ((scrollHeight - SCROLL_HANDLE_HEIGHT - handlerPositionOfY) /
            (scrollHeight - SCROLL_HANDLE_HEIGHT)) *
            (MAX_ICON_SIZE - MIN_ICON_SIZE);

        state.elements[index].size = iconSize;
      }

      if (state.elements[index].type === LINE) {
        const lineSize =
          MIN_LINE_SIZE +
          ((scrollHeight - SCROLL_HANDLE_HEIGHT - handlerPositionOfY) /
            (scrollHeight - SCROLL_HANDLE_HEIGHT)) *
            (MAX_LINE_SIZE - MIN_LINE_SIZE);

        state.elements[index].x2 = lineSize;
      }

      state.elements[index].width = width;
      state.elements[index].height = height;
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
  updateShapeSize,
} = shapeSlice.actions;
export default shapeSlice.reducer;
