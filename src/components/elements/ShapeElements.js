import { useEffect, useRef, useState } from "react";
import { Animated, PanResponder, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { MOVE, SIZE, SHAPE, ROTATE } from "../../constants/property";
import {
  handleSelectShape,
  updateShapePosition,
  updateShapeRotation,
  updateShapeSize,
} from "../../features/reducers/shapeSlice";
import ShapeRenderer from "../ShapeRenderer";

export default function ShapeElements() {
  const dispatch = useDispatch();
  const activeEditor = useSelector(
    (state) => state.editorReducer.selectedProperty,
  );
  const shapeElements = useSelector((state) => state.shapeReducer.elements);
  const selectedShapeProperty = useSelector(
    (state) => state.shapeReducer.shapeProperties.selectedProperty,
  );
  const selectedShapeIndex = useSelector(
    (state) => state.shapeReducer.shapeProperties.selectedIndex,
  );
  const sizeProportionMode = useSelector(
    (state) => state.shapeReducer.isSizeProportionMode,
  );

  const [moveResponder, setMoveResponder] = useState({});
  const selectedIndexRef = useRef(null);
  const positionRef = useRef({ x: 0, y: 0 });
  const movePan = useRef(new Animated.ValueXY()).current;

  const handleSelect = (index) => {
    if (activeEditor !== SHAPE) return;

    selectedIndexRef.current = index;
    shapeRef.current = shapeElements;
    dispatch(handleSelectShape(index));
  };

  const [resizeResponder, setResizeResponder] = useState({});
  const shapeRef = useRef({});
  const scaleRef = useRef(new Animated.ValueXY({ x: 1, y: 1 })).current;
  const scaleRefXY = useRef(new Animated.Value(1)).current;
  const sizePositionRef = useRef(0);

  const rotationRef = useRef(0);
  const rotation = useRef(new Animated.Value(0)).current;
  const [rotateResponder, setRotateResponder] = useState({});

  const getDistance = (touch1, touch2) => {
    const dx = touch1.pageX - touch2.pageX;
    const dy = touch1.pageY - touch2.pageY;

    return Math.sqrt(dx * dx + dy * dy);
  };

  const renderShapeElements = (element, index) => {
    const isSelected = index === selectedShapeIndex;

    const positionStyle = {
      left: element[index]?.x,
      top: element[index]?.y,
      zIndex: element[index]?.zIndex,
    };

    const rotationStyle = {
      transform: [
        {
          rotate: element[index]?.rotation
            ? `${element[index].rotation}deg`
            : "0deg",
        },
      ],
    };

    const shapeElements = (
      <ShapeRenderer element={element[index]} isSelected={isSelected} />
    );

    if (isSelected && selectedShapeProperty === ROTATE) {
      return (
        <Animated.View
          key={element[index]?._id}
          onPress={() => handleSelect(index)}
          style={[
            { position: "absolute" },
            positionStyle,
            {
              transform: [
                {
                  rotate: rotation.interpolate({
                    inputRange: [0, 360],
                    outputRange: ["0deg", "360deg"],
                  }),
                },
              ],
            },
          ]}
          {...rotateResponder.panHandlers}
        >
          <TouchableOpacity>{shapeElements}</TouchableOpacity>
        </Animated.View>
      );
    }

    if (isSelected && selectedShapeProperty === SIZE) {
      const transform = [{ rotate: `${element[index].rotation}deg` }];

      if (sizeProportionMode) {
        transform.push({ scale: scaleRefXY });
      } else {
        transform.push({ scaleX: scaleRef.x });
        transform.push({ scaleY: scaleRef.y });
      }

      return (
        <Animated.View
          key={element[index]?._id}
          onPress={() => handleSelect(index)}
          style={[{ position: "absolute" }, positionStyle, { transform }]}
          {...resizeResponder.panHandlers}
        >
          <TouchableOpacity>{shapeElements}</TouchableOpacity>
        </Animated.View>
      );
    }

    if (isSelected && selectedShapeProperty === MOVE) {
      return (
        <Animated.View
          key={element[index]?._id}
          onPress={() => handleSelect(index)}
          style={[
            { position: "absolute" },
            positionStyle,
            {
              transform: [
                { translateX: movePan.x },
                { translateY: movePan.y },
                { rotate: `${element[index].rotation}deg` },
              ],
            },
          ]}
          {...moveResponder.panHandlers}
        >
          <TouchableOpacity>{shapeElements}</TouchableOpacity>
        </Animated.View>
      );
    }

    return (
      <View
        key={element[index]?._id}
        style={[{ position: "absolute" }, positionStyle, rotationStyle]}
      >
        <TouchableOpacity onPress={() => handleSelect(index)}>
          {shapeElements}
        </TouchableOpacity>
      </View>
    );
  };

  useEffect(() => {
    setRotateResponder(
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: ({ nativeEvent }) => {
          const { touches } = nativeEvent;
          if (selectedIndexRef.current === null || touches.length !== 2) return;

          if (touches.length === 2) {
            const [touch1, touch2] = touches;
            const angle = Math.atan2(
              touch2.pageY - touch1.pageY,
              touch2.pageX - touch1.pageX,
            );

            rotationRef.current = rotation._value;
            rotationRef.startingAngle = angle;
          }
        },
        onPanResponderMove: (_, gestureState) => {
          const angle =
            Math.atan2(gestureState.dy, gestureState.dx) * (180 / Math.PI);

          const snappedRotation = Math.round(angle / 45) * 45;
          rotation.setValue(snappedRotation);
        },
        onPanResponderRelease: () => {
          if (selectedIndexRef.current === null) return;

          dispatch(
            updateShapeRotation({
              index: selectedIndexRef.current,
              rotation: rotation._value,
            }),
          );
        },
      }),
    );
  }, [rotation]);

  useEffect(() => {
    setResizeResponder(
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: ({ nativeEvent }) => {
          const { touches } = nativeEvent;
          if (selectedIndexRef.current === null || touches.length !== 2) return;

          if (touches.length === 2) {
            const [touch1, touch2] = touches;
            const distance = getDistance(touch1, touch2);
            const distanceX = Math.abs(touch1.pageX - touch2.pageX);
            const distanceY = Math.abs(touch1.pageY - touch2.pageY);

            sizePositionRef.current = {
              xy: distance,
              x: distanceX,
              y: distanceY,
            };

            scaleRef._startingDistance = {
              x: distanceX,
              y: distanceY,
            };
            scaleRefXY._startingDistance = distance;
          }
        },
        onPanResponderMove: ({ nativeEvent }) => {
          const { touches } = nativeEvent;
          if (selectedIndexRef.current === null || touches.length !== 2) return;

          if (touches.length === 2) {
            const [touch1, touch2] = touches;
            const distance = getDistance(touch1, touch2);
            const distanceX = Math.abs(touch1.pageX - touch2.pageX);
            const distanceY = Math.abs(touch1.pageY - touch2.pageY);

            const scaleFactorAll = distance / scaleRefXY._startingDistance;
            const scaleFactorX = distanceX / scaleRef._startingDistance.x;
            const scaleFactorY = distanceY / scaleRef._startingDistance.y;

            scaleRefXY.setValue(scaleFactorAll);

            if (scaleFactorX > scaleFactorY && !sizeProportionMode) {
              scaleRef.setValue({
                x: scaleFactorX,
                y: 1,
              });
            }

            if (scaleFactorX < scaleFactorY && !sizeProportionMode) {
              scaleRef.setValue({
                x: 1,
                y: scaleFactorY,
              });
            }
          }
        },
        onPanResponderRelease: ({ nativeEvent }) => {
          if (selectedIndexRef.current === null) return;

          const newWidthX =
            shapeRef.current[selectedIndexRef.current]?.width *
            scaleRef.x._value;
          const newHeightY =
            shapeRef.current[selectedIndexRef.current]?.height *
            scaleRef.y._value;

          const proportionX =
            shapeRef.current[selectedIndexRef.current]?.width *
            scaleRefXY._value;
          const proportionY =
            shapeRef.current[selectedIndexRef.current]?.height *
            scaleRefXY._value;

          dispatch(
            updateShapeSize({
              index: selectedIndexRef.current,
              width: newWidthX,
              height: newHeightY,
              proportionX,
              proportionY,
            }),
          );

          scaleRef.setValue({ x: 1, y: 1 });
          scaleRefXY.setValue(1);
        },
      }),
    );
  }, [scaleRef]);

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
