import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import PropTypes from "prop-types";
import { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  PanResponder,
} from "react-native";

import {
  ACTIVE_COLOR,
  EDITOR_COLOR,
  SCROLLBAR_COLOR,
  SHADOW_COLOR,
  UNACTIVE_COLOR,
} from "../constants/color";
import { textEditor } from "../constants/footerItems";
import {
  APP_FOOTER_HEIGHT,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  SCROLL_HANDLE_HEIGHT,
  MIN_TEXT_SIZE,
  MAX_TEXT_SIZE,
} from "../constants/size";

export default function TextEditor({
  setSelectedTextSize,
  selectedProperty,
  setSelectedProperty,
}) {
  const [scrollPosition, setScrollPosition] = useState(SCREEN_HEIGHT * 0.15);
  const customScrollbarRef = useRef(null);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gestureState) => {
        handleTouch(gestureState.moveY);
      },
    }),
  ).current;

  const handleTouch = async (y) => {
    if (!customScrollbarRef.current) return;

    customScrollbarRef.current.measure((fx, fy, width, height, px, py) => {
      y = Math.max(
        0,
        Math.min(
          y - py - SCROLL_HANDLE_HEIGHT / 2,
          height - SCROLL_HANDLE_HEIGHT,
        ),
      );

      if (isNaN(y)) return;
      setScrollPosition(y);

      const textSize =
        MIN_TEXT_SIZE +
        ((height - SCROLL_HANDLE_HEIGHT - y) /
          (height - SCROLL_HANDLE_HEIGHT)) *
          (MAX_TEXT_SIZE - MIN_TEXT_SIZE);
      setSelectedTextSize(textSize);
    });
  };

  const handleSelectedProperty = (name) => {
    if (selectedProperty === name) {
      setSelectedProperty("");
    }

    if (!selectedProperty) {
      setSelectedProperty(name);
    }
  };

  return (
    <View style={styles.container}>
      {selectedProperty === "Size" && (
        <View style={styles.size}>
          <View
            ref={customScrollbarRef}
            style={styles.customScrollbar}
            {...panResponder.panHandlers}
          >
            <View
              style={[
                styles.scrollHandle,
                { top: scrollPosition - styles.scrollHandle.height / 2 },
              ]}
            />
          </View>
        </View>
      )}
      {textEditor.map((item) => (
        <TouchableOpacity
          onPress={() => handleSelectedProperty(item.text)}
          key={item.iconName}
          style={styles.iconWithText}
        >
          {item.icon === "FontAwesome" && (
            <FontAwesome
              name={item.iconName}
              size={30}
              color={
                selectedProperty === item.text ? ACTIVE_COLOR : UNACTIVE_COLOR
              }
            />
          )}
          {item.icon === "MaterialIcons" && (
            <MaterialIcons
              name={item.iconName}
              size={30}
              color={
                selectedProperty === item.text ? ACTIVE_COLOR : UNACTIVE_COLOR
              }
            />
          )}
          <Text
            style={{
              ...styles.iconText,
              color:
                selectedProperty === item.text ? ACTIVE_COLOR : UNACTIVE_COLOR,
            }}
          >
            {item.text}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

TextEditor.propTypes = {
  setSelectedTextSize: PropTypes.func.isRequired,
  selectedProperty: PropTypes.string.isRequired,
  setSelectedProperty: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: SCREEN_WIDTH,
    height: APP_FOOTER_HEIGHT,
    backgroundColor: EDITOR_COLOR,
    shadowColor: SHADOW_COLOR,
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
  },
  iconWithText: {
    flex: 1,
    alignItems: "center",
  },
  iconText: {
    marginTop: 5,
    fontSize: 12,
    color: UNACTIVE_COLOR,
  },
  size: {
    position: "absolute",
    bottom: SCREEN_HEIGHT * 0.55,
    left: 20,
  },
  customScrollbar: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    width: 30,
    height: SCREEN_HEIGHT * 0.3,
    borderRadius: 15,
    backgroundColor: SCROLLBAR_COLOR,
    left: 20,
  },
  scrollHandle: {
    position: "absolute",
    width: 20,
    height: SCROLL_HANDLE_HEIGHT,
    borderRadius: 10,
    backgroundColor: UNACTIVE_COLOR,
  },
});
