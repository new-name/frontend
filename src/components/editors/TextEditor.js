import { FontAwesome, MaterialIcons, Ionicons } from "@expo/vector-icons";
import { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  PanResponder,
  ScrollView,
  Animated,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import {
  ACTIVE_COLOR,
  EDITOR_COLOR,
  SCROLLBAR_COLOR,
  SHADOW_COLOR,
  UNACTIVE_COLOR,
} from "../../constants/color";
import { textEditor } from "../../constants/footerItems";
import { ICON_FONT, ICON_MATERIAL, ICON_IOS } from "../../constants/icon";
import { TEXT_SIZE } from "../../constants/property";
import {
  APP_FOOTER_HEIGHT,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  SCROLL_HANDLE_HEIGHT,
  MIN_TEXT_SIZE,
  MAX_TEXT_SIZE,
} from "../../constants/size";
import { changeTextSize, selectText } from "../../features/reducers/textSlice";

export default function TextEditor() {
  const dispatch = useDispatch();
  const [scrollPosition, setScrollPosition] = useState(SCREEN_HEIGHT * 0.15);
  const selectedProperty = useSelector(
    (state) => state.textReducer.textProperties.selectedProperty,
  );
  const customScrollbarRef = useRef(null);
  const sizeResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gestureState) => {
        handleResizeOfText(gestureState.moveY);
      },
    }),
  ).current;

  const handleResizeOfText = async (y) => {
    if (!customScrollbarRef.current) return;

    customScrollbarRef.current.measure((fx, fy, width, height, px, py) => {
      const handlerPositionOfY = Math.max(
        0,
        Math.min(
          y - py - SCROLL_HANDLE_HEIGHT / 2,
          height - SCROLL_HANDLE_HEIGHT,
        ),
      );

      if (isNaN(handlerPositionOfY)) return;
      setScrollPosition(handlerPositionOfY);

      const textSize =
        MIN_TEXT_SIZE +
        ((height - SCROLL_HANDLE_HEIGHT - handlerPositionOfY) /
          (height - SCROLL_HANDLE_HEIGHT)) *
          (MAX_TEXT_SIZE - MIN_TEXT_SIZE);

      dispatch(changeTextSize(textSize));
    });
  };

  const handleSelectTextEditorProperty = (name) => {
    const newSelectedProperty = selectedProperty === name ? "" : name;
    dispatch(selectText(newSelectedProperty));
  };

  return (
    <View style={styles.container}>
      {selectedProperty === TEXT_SIZE && (
        <View style={styles.size}>
          <View
            ref={customScrollbarRef}
            style={styles.customScrollbar}
            {...sizeResponder.panHandlers}
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
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {textEditor.map((item) => (
          <TouchableOpacity
            onPress={() => handleSelectTextEditorProperty(item.text)}
            key={item.iconName}
            style={styles.iconWithText}
          >
            {item.icon === ICON_FONT && (
              <FontAwesome
                name={item.iconName}
                size={30}
                color={
                  selectedProperty === item.text ? ACTIVE_COLOR : UNACTIVE_COLOR
                }
              />
            )}
            {item.icon === ICON_MATERIAL && (
              <MaterialIcons
                name={item.iconName}
                size={30}
                color={
                  selectedProperty === item.text ? ACTIVE_COLOR : UNACTIVE_COLOR
                }
              />
            )}
            {item.icon === ICON_IOS && (
              <Ionicons
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
                  selectedProperty === item.text
                    ? ACTIVE_COLOR
                    : UNACTIVE_COLOR,
              }}
            >
              {item.text}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

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
    width: SCREEN_WIDTH * 0.185,
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
