import Lottie from "lottie-react-native";
import { useEffect, useRef, useState } from "react";
import { Animated, PanResponder, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { GIF_MOVE } from "../../constants/property";
import {
  handleSelectGif,
  updateGifPosition,
} from "../../features/reducers/gifSlice";

export default function GifElements() {
  const dispatch = useDispatch();
  const gifElements = useSelector((state) => state.gifReducer.elements);
  const selectedGifProperty = useSelector(
    (state) => state.gifReducer.gifProperties.selectedProperty,
  );
  const selectedGifIndex = useSelector(
    (state) => state.gifReducer.gifProperties.selectedIndex,
  );

  const [moveResponder, setMoveResponder] = useState({});
  const selectedIndexRef = useRef(null);
  const positionRef = useRef({ x: 0, y: 0 });
  const movePan = useRef(new Animated.ValueXY()).current;

  const handleSelect = (index) => {
    selectedIndexRef.current = index;
    dispatch(handleSelectGif(index));
  };

  const renderGifElements = (element, index) => {
    const isSelected = index === selectedGifIndex;

    const positionStyle = {
      left: element[index]?.x,
      top: element[index]?.y,
    };

    const gifElements = (
      <Lottie
        style={{ width: element[index].size }}
        source={element[index].source}
        autoPlay
        loop
      />
    );

    if (isSelected && selectedGifProperty === GIF_MOVE) {
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
          <TouchableOpacity>{gifElements}</TouchableOpacity>
        </Animated.View>
      );
    }

    return (
      <TouchableOpacity
        key={Date.now() + index}
        onPress={() => handleSelect(index)}
        style={[{ position: "absolute" }, positionStyle]}
      >
        {gifElements}
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
            updateGifPosition({
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
      {Object.keys(gifElements).map((element, index) =>
        renderGifElements(gifElements, index),
      )}
    </>
  );
}
