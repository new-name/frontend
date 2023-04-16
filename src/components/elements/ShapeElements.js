import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import { Animated, PanResponder, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { SHAPE_MOVE } from "../../constants/property";
import {
  handleSelectIcons,
  updateIconPosition,
} from "../../features/reducers/shapeSlice";

export default function ShapeElements() {
  const dispatch = useDispatch();
  const iconElements = useSelector((state) => state.shapeReducer.elements);
  const selectedShapeProperty = useSelector(
    (state) => state.shapeReducer.shapeProperties.selectedProperty,
  );
  const selectedIconIndex = useSelector(
    (state) => state.shapeReducer.shapeProperties.selectedIndex,
  );

  const [moveResponder, setMoveResponder] = useState({});
  const selectedIndexRef = useRef(null);
  const positionRef = useRef({ x: 0, y: 0 });
  const movePan = useRef(new Animated.ValueXY()).current;

  const handleSelectShape = (index) => {
    selectedIndexRef.current = index;
    dispatch(handleSelectIcons(index));
  };

  const renderShapeElements = (element, index) => {
    const isSelected = index === selectedIconIndex;

    const positionStyle = {
      left: element[index]?.x,
      top: element[index]?.y,
    };

    const shapeElements = (
      <MaterialCommunityIcons
        name={iconElements[index].name}
        size={iconElements[index].size}
        color={iconElements[index].color}
      />
    );

    if (isSelected && selectedShapeProperty === SHAPE_MOVE) {
      return (
        <Animated.View
          key={Date.now() + index}
          onPress={() => handleSelectShape(index)}
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
        onPress={() => handleSelectShape(index)}
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
            updateIconPosition({
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
      {Object.keys(iconElements).map((icon, index) =>
        renderShapeElements(iconElements, index),
      )}
    </>
  );
}
