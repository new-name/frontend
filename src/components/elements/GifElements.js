import Lottie from "lottie-react-native";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { Animated, PanResponder, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { ACTIVE_COLOR } from "../../constants/color";
import { GIF, MOVE } from "../../constants/property";
import {
  handleSelectGif,
  updateGifPosition,
} from "../../features/reducers/gifSlice";

export default function GifElements({ updateLongestLottieRef }) {
  const dispatch = useDispatch();
  const activeEditor = useSelector(
    (state) => state.editorReducer.selectedProperty,
  );
  const gifElements = useSelector((state) => state.gifReducer.elements);
  const selectedGifProperty = useSelector(
    (state) => state.gifReducer.gifProperties.selectedProperty,
  );
  const selectedGifIndex = useSelector(
    (state) => state.gifReducer.gifProperties.selectedIndex,
  );

  const animationRefs = useRef({});
  const [moveResponder, setMoveResponder] = useState({});
  const selectedIndexRef = useRef(null);
  const positionRef = useRef({ x: 0, y: 0 });
  const movePan = useRef(new Animated.ValueXY()).current;

  const handleSelect = (index) => {
    if (activeEditor !== GIF) return;

    selectedIndexRef.current = index;
    dispatch(handleSelectGif(index));
  };

  const renderGifElements = (element, index) => {
    const isSelected = index === selectedGifIndex;

    const positionStyle = {
      left: element[index]?.x,
      top: element[index]?.y,
      zIndex: element[index].zIndex,
    };

    const selectedBorderStyle = isSelected
      ? {
          borderWidth: 1,
          borderColor: ACTIVE_COLOR,
          borderRadius: 10,
        }
      : {};

    const gifElements = (
      <Lottie
        ref={(element) => (animationRefs.current[index] = element)}
        onLayout={() => animationRefs.current[index]?.play()}
        style={[selectedBorderStyle, { width: element[index].size }]}
        source={element[index].source}
        autoPlay
        loop
      />
    );

    if (isSelected && selectedGifProperty === MOVE) {
      return (
        <Animated.View
          key={element[index]?.id}
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
      <View
        key={element[index]?.id}
        style={[{ position: "absolute" }, positionStyle, selectedBorderStyle]}
      >
        <TouchableOpacity onPress={() => handleSelect(index)}>
          {gifElements}
        </TouchableOpacity>
      </View>
    );
  };

  const findLongestLottieDuration = (lottieDataArray) => {
    const longestLottie = { duration: 0, index: 0 };

    lottieDataArray.forEach((lottieData, index) => {
      const frameRate = lottieData.source.fr;
      const inPoint = lottieData.source.ip;
      const outPoint = lottieData.source.op;
      const duration = (outPoint - inPoint) / frameRate;

      if (duration > longestLottie.duration) {
        longestLottie.duration = duration;
        longestLottie.index = index;
      }
    });

    return longestLottie;
  };

  useEffect(() => {
    const lottieArray = Object.keys(gifElements).map(
      (element) => gifElements[element],
    );
    const longestLottie = findLongestLottieDuration(lottieArray);

    updateLongestLottieRef({
      ref: animationRefs.current[longestLottie.index],
      duration: longestLottie.duration,
    });
  }, [gifElements]);

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

GifElements.propTypes = {
  updateLongestLottieRef: PropTypes.func.isRequired,
};
