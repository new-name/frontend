import { MaterialCommunityIcons } from "@expo/vector-icons";
import PropTypes from "prop-types";
import React from "react";
import Svg, { Rect, Ellipse, Line } from "react-native-svg";

import { ACTIVE_COLOR } from "../constants/color";
import { ICON, RECTANGLE, ELLIPSE, LINE } from "../constants/property";

export default function ShapeRenderer({ element, isSelected, sizeProperty }) {
  const selectedBorderStyle = isSelected
    ? {
        borderWidth: 2,
        borderColor: ACTIVE_COLOR,
        borderRadius: 10,
      }
    : {};

  switch (element.shapeType) {
    case ICON:
      return (
        <MaterialCommunityIcons
          name={element.name}
          size={sizeProperty || element.size}
          color={element.color}
          style={selectedBorderStyle}
          width={element.size}
        />
      );
    case RECTANGLE:
      return (
        <Svg
          width={sizeProperty * 1.5 || element.width}
          height={sizeProperty * 1.5 || element.height}
          style={selectedBorderStyle}
        >
          <Rect
            width={sizeProperty * 1.5 || element.width}
            height={sizeProperty * 1.5 || element.height}
            stroke={element.stroke}
            strokeWidth={element.strokeWidth}
            fill={element.color}
          />
        </Svg>
      );
    case ELLIPSE:
      return (
        <Svg
          height={sizeProperty * 2 || element.height * 2}
          width={sizeProperty * 2 || element.width * 2}
          style={selectedBorderStyle}
        >
          <Ellipse
            cx={sizeProperty || element.width}
            cy={sizeProperty || element.height}
            rx={sizeProperty * 0.98 || element.width * 0.98}
            ry={sizeProperty * 0.98 || element.height * 0.98}
            stroke={element.stroke}
            strokeWidth={element.strokeWidth}
            fill={element.color}
          />
        </Svg>
      );
    case LINE:
      return (
        <Svg
          height={20}
          width={sizeProperty * 3 || element.x2}
          style={selectedBorderStyle}
        >
          <Line
            x1={element.x1}
            y1={element.y1}
            x2={sizeProperty * 3 || element.x2}
            y2={element.y2}
            stroke={element.stroke}
            strokeWidth={element.strokeWidth}
          />
        </Svg>
      );
    default:
      return null;
  }
}

ShapeRenderer.propTypes = {
  element: PropTypes.object.isRequired,
  isSelected: PropTypes.bool.isRequired,
  sizeProperty: PropTypes.number,
  circSizeProperty: PropTypes.number,
  lineSizeProperty: PropTypes.number,
};
