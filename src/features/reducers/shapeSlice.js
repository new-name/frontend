import { createSlice } from "@reduxjs/toolkit";

import { UNACTIVE_COLOR, WHITE_COLOR } from "../../constants/color";
import {
  ICON,
  STROKE,
  LINE,
  RECTANGLE,
  CIRCLE,
  ELLIPSE,
  SHAPE,
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
  isSizeProportionMode: false,
};

export const shapeSlice = createSlice({
  name: "shape",
  initialState,
  reducers: {
    renderNewShapes: (state, action) => {
      const { layerNumber } = action.payload;
      const nextIndex = Object.keys(state.elements).length;
      const selectedShapeProperty = state.shapeProperties.selectedProperty;

      let property;
      if (selectedShapeProperty === RECTANGLE) {
        property = {
          type: SHAPE,
          shapeType: RECTANGLE,
          x: 0,
          y: 0,
          width: 200,
          height: 200,
          stroke: UNACTIVE_COLOR,
          strokeWidth: 3,
          color: WHITE_COLOR,
          rotation: 0,
          zIndex: layerNumber,
          id: Date.now(),
        };
      }

      if (selectedShapeProperty === CIRCLE) {
        property = {
          type: SHAPE,
          shapeType: ELLIPSE,
          x: 0,
          y: 0,
          width: 100,
          height: 100,
          stroke: UNACTIVE_COLOR,
          strokeWidth: 2,
          color: WHITE_COLOR,
          rotation: 0,
          zIndex: layerNumber,
          id: Date.now(),
        };
      }

      if (selectedShapeProperty === LINE) {
        property = {
          type: SHAPE,
          shapeType: LINE,
          x: 0,
          y: 0,
          x1: 0,
          y1: 10,
          x2: SCREEN_WIDTH * 0.7,
          y2: 10,
          stroke: UNACTIVE_COLOR,
          strokeWidth: 2,
          rotation: 0,
          zIndex: layerNumber,
          id: Date.now(),
        };
      }

      state.elements[nextIndex] = property;

      state.shapeProperties.selectedProperty = "";
    },
    handleSelectShapeProperty: (state, action) => {
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
    handleResetShape: (state) => {
      const { shapeProperties } = state;

      shapeProperties.selectedIndex = null;
      shapeProperties.selectedProperty = "";
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
      const {
        width,
        height,
        handlerPositionOfY,
        scrollHeight,
        proportionX,
        proportionY,
      } = action.payload;

      if (state.elements[index].shapeType === ICON) {
        const iconSize =
          MIN_ICON_SIZE +
          ((scrollHeight - SCROLL_HANDLE_HEIGHT - handlerPositionOfY) /
            (scrollHeight - SCROLL_HANDLE_HEIGHT)) *
            (MAX_ICON_SIZE - MIN_ICON_SIZE);

        state.elements[index].size = iconSize;
        return;
      }

      if (state.elements[index].shapeType === LINE) {
        const lineSize =
          MIN_LINE_SIZE +
          ((scrollHeight - SCROLL_HANDLE_HEIGHT - handlerPositionOfY) /
            (scrollHeight - SCROLL_HANDLE_HEIGHT)) *
            (MAX_LINE_SIZE - MIN_LINE_SIZE);

        state.elements[index].x2 = lineSize;
        return;
      }

      if (state.isSizeProportionMode) {
        state.elements[index].width = proportionX;
        state.elements[index].height = proportionY;
      } else {
        state.elements[index].width = width;
        state.elements[index].height = height;
      }

      state.shapeProperties.selectedIndex = null;
    },
    updateShapeRotation: (state, action) => {
      const { index, rotation } = action.payload;
      state.elements[index].rotation = rotation;
    },
    updateIconModalState: (state, action) => {
      state.isIconModalVisible = action.payload;

      state.shapeProperties.selectedProperty = "";
    },
    updateSizeProportionMode: (state, action) => {
      state.isSizeProportionMode = action.payload;
    },
    updateAllShapes: (state, action) => {
      const updatedArray = action.payload;
      const sortedArray = updatedArray.sort((a, b) => a.zIndex - b.zIndex);
      const newElements = sortedArray.reduce((acc, element, index) => {
        acc[index] = { ...element };
        return acc;
      }, {});

      state.elements = newElements;
    },
  },
});

export const {
  renderNewShapes,
  handleSelectShapeProperty,
  handleSelectShape,
  handleRenderIcons,
  updateIconModalState,
  updateShapePosition,
  updateShapeColor,
  updateShapeSize,
  updateShapeRotation,
  handleResetShape,
  updateSizeProportionMode,
  updateAllShapes,
} = shapeSlice.actions;
export default shapeSlice.reducer;
