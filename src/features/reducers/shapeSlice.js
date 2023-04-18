import { createSlice } from "@reduxjs/toolkit";

import { UNACTIVE_COLOR, WHITE_COLOR } from "../../constants/color";
import {
  ICON,
  STROKE,
  LINE,
  RECTANGLE,
  CIRCLE,
  ELLIPSE,
} from "../../constants/property";
import {
  MAX_ICON_SIZE,
  MAX_LINE_SIZE,
  MIN_ICON_SIZE,
  MIN_LINE_SIZE,
  SCREEN_WIDTH,
  SCROLL_HANDLE_HEIGHT,
} from "../../constants/size";

const shapeProperties = {
  selectedProperty: "",
  selectedIndex: null,
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
    renderNewShapes: (state, action) => {
      const nextIndex = Object.keys(state.elements).length;
      const selectedShapeProperty = state.shapeProperties.selectedProperty;

      let property;
      if (selectedShapeProperty === RECTANGLE) {
        property = {
          type: RECTANGLE,
          x: 0,
          y: 0,
          width: 200,
          height: 200,
          stroke: UNACTIVE_COLOR,
          strokeWidth: 2,
          color: WHITE_COLOR,
          zIndex: 0,
        };
      }

      if (selectedShapeProperty === CIRCLE) {
        property = {
          type: ELLIPSE,
          x: 0,
          y: 0,
          width: 100,
          height: 100,
          stroke: UNACTIVE_COLOR,
          strokeWidth: 2,
          color: WHITE_COLOR,
          zIndex: 0,
        };
      }

      if (selectedShapeProperty === LINE) {
        property = {
          type: LINE,
          x: 0,
          y: 0,
          x1: 0,
          y1: 20,
          x2: SCREEN_WIDTH * 0.7,
          y2: 20,
          stroke: UNACTIVE_COLOR,
          strokeWidth: 3,
          zIndex: 0,
        };
      }

      const updatedShapeElements = {
        ...state.elements,
        [nextIndex]: property,
      };

      state.elements = updatedShapeElements;

      state.shapeProperties.selectedProperty = "";
    },
    handleSelectProperty: (state, action) => {
      const { shapeProperties } = state;

      shapeProperties.selectedProperty = action.payload;
    },
    handleRenderIcons: (state, action) => {
      state.elements = action.payload;

      state.isIconModalVisible = false;
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
  renderNewShapes,
  handleSelectProperty,
  handleSelectShape,
  handleRenderIcons,
  updateIconModalState,
  updateShapePosition,
  updateShapeColor,
  updateShapeSize,
} = shapeSlice.actions;
export default shapeSlice.reducer;
