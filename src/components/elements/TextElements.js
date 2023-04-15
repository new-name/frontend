import React, { useEffect, useRef, useState } from "react";
import {
  TouchableOpacity,
  Animated,
  TextInput,
  Text,
  KeyboardAvoidingView,
  Platform,
  View,
  PanResponder,
  Keyboard,
  StyleSheet,
} from "react-native";
import { KeyboardAccessoryView } from "react-native-keyboard-accessory";
import { useDispatch, useSelector } from "react-redux";

import { TEXT_EDIT, TEXT_MOVE } from "../../constants/property";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../constants/size";
import {
  selectText,
  selectTextContents,
  selectTextIndex,
  updateTextContents,
  updateTextPosition,
} from "../../features/reducers/textSlice";

export default function TextElement() {
  const dispatch = useDispatch();

  const [moveResponder, setMoveResponder] = useState({});
  const selectedTextProperty = useSelector(
    (state) => state.textReducer.textProperties.selectedProperty,
  );
  const selectedTextIndex = useSelector(
    (state) => state.textReducer.textProperties.selectedIndex,
  );
  const textElements = useSelector((state) => state.textReducer.elements);

  const selectedIndexRef = useRef(null);
  const positionRef = useRef({ x: 0, y: 0 });
  const movePan = useRef(new Animated.ValueXY()).current;

  const handleSelectText = (index) => {
    selectedIndexRef.current = index;
    dispatch(selectTextIndex(index));
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
            updateTextPosition({
              index: selectedIndexRef.current,
              x: positionRef.current.x,
              y: positionRef.current.y,
            }),
          );

          movePan.setValue({ x: 0, y: 0 });
        },
      }),
    );
  }, [movePan.x, movePan.y]);

  const renderTextElement = (element, index) => {
    const isSelected = index === selectedTextIndex;
    const isEditable = element[index]?.isEditable;

    const positionStyle = {
      left: element[index]?.x,
      top: element[index]?.y,
    };

    const textElement = (
      <Text
        style={{
          fontSize: element[index]?.size,
          color: element[index]?.color,
          fontFamily: element[index]?.fontFamily,
        }}
      >
        {element[index]?.text}
      </Text>
    );

    if (isSelected && selectedTextProperty === TEXT_MOVE) {
      return (
        <Animated.View
          key={Date.now() + index}
          onPress={() => handleSelectText(index)}
          style={[
            positionStyle,
            {
              transform: [{ translateX: movePan.x }, { translateY: movePan.y }],
            },
          ]}
          {...moveResponder.panHandlers}
        >
          <TouchableOpacity>{textElement}</TouchableOpacity>
        </Animated.View>
      );
    }

    if (isSelected && selectedTextProperty === TEXT_EDIT && isEditable) {
      return (
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : null}
          key={element[index]?.x + element[index].y}
        >
          <TouchableOpacity
            onPress={() => handleSelectText(index)}
            style={[{ position: "absolute" }, positionStyle]}
          >
            <TextInput
              multiline
              style={{
                fontSize: element[index]?.size,
                color: element[index]?.color,
                fontFamily: element[index]?.fontFamily,
              }}
              value={element[index]?.text}
              onChangeText={(newText) => {
                dispatch(
                  updateTextContents({
                    index: selectedTextIndex,
                    value: newText,
                  }),
                );
              }}
              onBlur={() => {
                dispatch(
                  selectTextContents({
                    index: selectedTextIndex,
                    value: false,
                  }),
                );
              }}
            />
          </TouchableOpacity>
          <KeyboardAccessoryView>
            <View style={styles.keyboardAccesoryView}>
              <TouchableOpacity
                onPress={() => {
                  Keyboard.dismiss();
                  dispatch(selectText(""));
                }}
                style={{ padding: 10, paddingHorizontal: 20 }}
              >
                <Text style={{ fontSize: 16 }}>Done</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAccessoryView>
        </KeyboardAvoidingView>
      );
    }

    return (
      <TouchableOpacity
        key={Date.now() + index}
        onPress={() => handleSelectText(index)}
        style={[{ position: "absolute" }, positionStyle]}
      >
        {textElement}
      </TouchableOpacity>
    );
  };

  return (
    <>
      {Object.keys(textElements).map((element, index) =>
        renderTextElement(textElements, index),
      )}
    </>
  );
}

const styles = StyleSheet.create({
  keyboardAccesoryView: {
    flexDirection: "row",
    justifyContent: "flex-end",
    top: SCREEN_HEIGHT * 0.795,
    marginLeft: -SCREEN_WIDTH * 0.05,
    width: SCREEN_WIDTH,
    borderTopWidth: 1,
    borderColor: "#e5e5e5",
    backgroundColor: "#f5f5f5",
  },
});
