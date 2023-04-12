import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import PropTypes from "prop-types";
import { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  PanResponder,
} from "react-native";

import { ACTIVE_COLOR, EDITOR_COLOR } from "../constants/color";
import { textEditor } from "../constants/footerItems";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const appFooterHeight = screenHeight / 12;
const scrollHandleHeight = 20;

export default function TextEditor({
  setSelectedTextSize,
  selectedProperty,
  setSelectedProperty,
}) {
  const [scrollPosition, setScrollPosition] = useState(screenHeight * 0.15);
  const customScrollbarRef = useRef(null);

  const minTextSize = 10;
  const maxTextSize = 100;

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
        Math.min(y - py - scrollHandleHeight / 2, height - scrollHandleHeight),
      );

      if (isNaN(y)) return;
      setScrollPosition(y);

      const textSize =
        minTextSize +
        ((height - scrollHandleHeight - y) / (height - scrollHandleHeight)) *
          (maxTextSize - minTextSize);
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
              color={selectedProperty === item.text ? ACTIVE_COLOR : "gray"}
            />
          )}
          {item.icon === "MaterialIcons" && (
            <MaterialIcons
              name={item.iconName}
              size={30}
              color={selectedProperty === item.text ? ACTIVE_COLOR : "gray"}
            />
          )}
          <Text
            style={{
              ...styles.iconText,
              color: selectedProperty === item.text ? ACTIVE_COLOR : "gray",
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
    width: screenWidth,
    height: appFooterHeight,
    backgroundColor: EDITOR_COLOR,
    shadowColor: "#000",
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
    color: "gray",
  },
  size: {
    position: "absolute",
    bottom: screenHeight * 0.55,
    left: 20,
  },
  customScrollbar: {
    position: "absolute",
    height: screenHeight * 0.3,
    width: 30,
    backgroundColor: "#eee",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    left: 20,
  },
  scrollHandle: {
    position: "absolute",
    height: scrollHandleHeight,
    width: 20,
    backgroundColor: "gray",
    borderRadius: 10,
  },
});
