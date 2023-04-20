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

import { HEADER, ACTIVE_COLOR } from "../../constants/color";
import { TEXT, EDIT, MOVE } from "../../constants/property";
import { SCREEN_HEIGHT, SCREEN_WIDTH, Z_INDEX_100 } from "../../constants/size";
import {
  handleSelectTextProperty,
  selectTextContents,
  selectTextIndex,
  updateTextContents,
  updateTextPosition,
} from "../../features/reducers/textSlice";

export default function TextElements() {
  const dispatch = useDispatch();
  const activeEditor = useSelector(
    (state) => state.editorReducer.selectedProperty,
  );
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
    if (activeEditor !== TEXT) return;

    selectedIndexRef.current = index;
    dispatch(selectTextIndex(index));
  };

  const renderTextElement = (element, index) => {
    const isSelected = index === selectedTextIndex;
    const isEditable = element[index]?.isEditable;

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

    const textElement = (
      <Text
        style={[
          selectedBorderStyle,
          {
            fontSize: element[index]?.size,
            color: element[index]?.color,
            fontFamily: element[index]?.fontFamily,
          },
        ]}
      >
        {element[index]?.text}
      </Text>
    );

    if (isSelected && selectedTextProperty === MOVE) {
      return (
        <Animated.View
          key={element[index]?.id}
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

    if (isSelected && selectedTextProperty === EDIT && isEditable) {
      return (
        <KeyboardAvoidingView
          style={{ flex: 1, zIndex: Z_INDEX_100 }}
          behavior={Platform.OS === "ios" ? "padding" : null}
          key={element[index]?.id}
        >
          <TouchableOpacity
            onPress={() => handleSelectText(index)}
            style={[{ position: "absolute" }, positionStyle]}
          >
            <TextInput
              multiline
              style={[
                {
                  fontSize: element[index]?.size,
                  color: element[index]?.color,
                  fontFamily: element[index]?.fontFamily,
                },
                selectedBorderStyle,
              ]}
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
                  dispatch(handleSelectTextProperty(""));
                }}
                style={{ padding: 10, paddingHorizontal: 20 }}
              >
                <Text style={{ fontSize: 16, color: ACTIVE_COLOR }}>Done</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAccessoryView>
        </KeyboardAvoidingView>
      );
    }

    return (
      <View
        key={element[index]?.id}
        style={[{ position: "absolute" }, positionStyle]}
      >
        <TouchableOpacity onPress={() => handleSelectText(index)}>
          {textElement}
        </TouchableOpacity>
      </View>
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
    backgroundColor: HEADER,
  },
});
