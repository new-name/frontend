import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import { Animated, PanResponder, TouchableOpacity } from "react-native";
import Svg, { Rect, Ellipse, Line } from "react-native-svg";
import { useDispatch, useSelector } from "react-redux";

import {
  ELLIPSE,
  ICON,
  LINE,
  RECTANGLE,
  SHAPE_MOVE,
} from "../../constants/property";
import {
  handleSelectShape,
  updateShapePosition,
} from "../../features/reducers/shapeSlice";

export default function ShapeElements() {
  const dispatch = useDispatch();
  const shapeElements = useSelector((state) => state.shapeReducer.elements);
  const selectedShapeProperty = useSelector(
    (state) => state.shapeReducer.shapeProperties.selectedProperty,
  );
  const selectedShapeIndex = useSelector(
    (state) => state.shapeReducer.shapeProperties.selectedIndex,
  );

  const [moveResponder, setMoveResponder] = useState({});
  const selectedIndexRef = useRef(null);
  const positionRef = useRef({ x: 0, y: 0 });
  const movePan = useRef(new Animated.ValueXY()).current;

  const handleSelect = (index) => {
    selectedIndexRef.current = index;
    dispatch(handleSelectShape(index));
  };

  const renderShapeElements = (element, index) => {
    const isSelected = index === selectedShapeIndex;

    const positionStyle = {
      left: element[index]?.x,
      top: element[index]?.y,
    };

    let shapeElements;

    if (element[index].type === ICON) {
      shapeElements = (
        <MaterialCommunityIcons
          name={element[index].name}
          size={element[index].size}
          color={element[index].color}
        />
      );
    }

    if (element[index].type === RECTANGLE) {
      shapeElements = (
        <Svg height={element[index].height} width={element[index].width}>
          <Rect
            width={element[index].width}
            height={element[index].height}
            stroke={element[index].stroke}
            strokeWidth={element[index].strokeWidth}
            fill={element[index].color}
          />
        </Svg>
      );
    }

    if (element[index].type === ELLIPSE) {
      shapeElements = (
        <Svg
          height={element[index].height * 2}
          width={element[index].width * 2}
        >
          <Ellipse
            cx={element[index].width}
            cy={element[index].height}
            rx={element[index].width * 0.98}
            ry={element[index].height * 0.98}
            stroke={element[index].stroke}
            strokeWidth={element[index].strokeWidth}
            fill={element[index].color}
          />
        </Svg>
      );
    }

    if (element[index].type === LINE) {
      shapeElements = (
        <Svg height={20} width={element[index].x2}>
          <Line
            x1={element[index].x1}
            y1={element[index].y1}
            x2={element[index].x2}
            y2={element[index].y2}
            stroke={element[index].stroke}
            strokeWidth={element[index].strokeWidth}
          />
        </Svg>
      );
    }

    if (isSelected && selectedShapeProperty === SHAPE_MOVE) {
      return (
        <Animated.View
          key={Date.now() + index}
          onPress={() => handleSelect(index)}
          style={[
            positionStyle,
            {
              transform: [{ translateX: movePan.x }, { translateY: movePan.y }],
            },
          ]}
          {...moveResponder.panHandlers}
        >
          <TouchableOpacity>{shapeElements}</TouchableOpacity>
        </Animated.View>
      );
    }

    return (
      <TouchableOpacity
        key={Date.now() + index}
        onPress={() => handleSelect(index)}
        style={[{ position: "absolute" }, positionStyle]}
      >
        {shapeElements}
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    setMoveResponder(
      PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: (_, gestureState) => {
          positionRef.current = {
            x: gestureState.dx,
            y: gestureState.dy,
          };
          movePan.setOffset(positionRef.current);
          movePan.setValue({ x: 0, y: 0 });
        },
        onPanResponderMove: Animated.event(
          [null, { dx: movePan.x, dy: movePan.y }],
          { useNativeDriver: false },
        ),
        onPanResponderRelease: ({ nativeEvent }, gestureState) => {
          if (selectedIndexRef.current === null) return;

          positionRef.current = {
            x: positionRef.current.x + gestureState.dx,
            y: positionRef.current.y + gestureState.dy,
          };

          dispatch(
            updateShapePosition({
              index: selectedIndexRef.current,
              x: positionRef.current.x,
              y: positionRef.current.y,
            }),
          );

          movePan.setValue({ x: 0, y: 0 });
        },
      }),
    );
  }, [movePan]);

  return (
    <>
      {Object.keys(shapeElements).map((element, index) =>
        renderShapeElements(shapeElements, index),
      )}
    </>
  );
}
