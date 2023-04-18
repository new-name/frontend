import {
  FontAwesome,
  MaterialCommunityIcons,
  Ionicons,
  Entypo,
} from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  PanResponder,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import {
  ACTIVE_COLOR,
  EDITOR_COLOR,
  SCROLLBAR_COLOR,
  SHADOW_COLOR,
  UNACTIVE_COLOR,
} from "../../constants/color";
import { gifFooter } from "../../constants/footerItems";
import {
  ICON_FONT,
  ICON_IOS,
  ICON_MATERIAL_C,
  ICON_ENTYPO,
} from "../../constants/icon";
import { GIF_LIBRARY, GIF_SIZE } from "../../constants/property";
import {
  APP_FOOTER_HEIGHT,
  MAX_GIF_SIZE,
  MIN_GIF_SIZE,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  SCROLL_HANDLE_HEIGHT,
} from "../../constants/size";
import {
  handleSelectGifProperty,
  updateGifModalState,
  updateGifSize,
} from "../../features/reducers/gifSlice";

export default function GifEditor() {
  const dispatch = useDispatch();
  const [scrollPosition, setScrollPosition] = useState(SCREEN_HEIGHT * 0.15);
  const selectedProperty = useSelector(
    (state) => state.gifReducer.gifProperties.selectedProperty,
  );

  const handleSelectedProperty = (name) => {
    const newSelectedProperty = selectedProperty === name ? "" : name;
    dispatch(handleSelectGifProperty(newSelectedProperty));
  };

  const customScrollbarRef = useRef(null);
  const sizeResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gestureState) => {
        handleResize(gestureState.moveY);
      },
    }),
  ).current;

  const handleResize = async (y) => {
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

      const newSize =
        MIN_GIF_SIZE +
        ((height - SCROLL_HANDLE_HEIGHT - handlerPositionOfY) /
          (height - SCROLL_HANDLE_HEIGHT)) *
          (MAX_GIF_SIZE - MIN_GIF_SIZE);

      dispatch(updateGifSize(newSize));
    });
  };

  useEffect(() => {
    if (selectedProperty === GIF_LIBRARY) {
      dispatch(updateGifModalState(true));
    }
  }, [selectedProperty]);

  return (
    <View>
      <View style={styles.controllerContainer}>
        {selectedProperty === GIF_SIZE && (
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
          {gifFooter.map((item) => (
            <TouchableOpacity
              onPress={() => handleSelectedProperty(item.text)}
              key={item.iconName}
              style={styles.iconWithText}
            >
              {item.icon === ICON_FONT && (
                <FontAwesome
                  name={item.iconName}
                  size={30}
                  color={
                    selectedProperty === item.text
                      ? ACTIVE_COLOR
                      : UNACTIVE_COLOR
                  }
                />
              )}
              {item.icon === ICON_MATERIAL_C && (
                <MaterialCommunityIcons
                  name={item.iconName}
                  size={30}
                  color={
                    selectedProperty === item.text
                      ? ACTIVE_COLOR
                      : UNACTIVE_COLOR
                  }
                />
              )}
              {item.icon === ICON_IOS && (
                <Ionicons
                  name={item.iconName}
                  size={30}
                  color={
                    selectedProperty === item.text
                      ? ACTIVE_COLOR
                      : UNACTIVE_COLOR
                  }
                />
              )}
              {item.icon === ICON_ENTYPO && (
                <Entypo
                  name={item.iconName}
                  size={30}
                  color={
                    selectedProperty === item.text
                      ? ACTIVE_COLOR
                      : UNACTIVE_COLOR
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-around",
    alignItems: "center",
    width: SCREEN_WIDTH,
    height: (SCREEN_HEIGHT * 2) / 3,
    backgroundColor: EDITOR_COLOR,
    shadowColor: SHADOW_COLOR,
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  controllerContainer: {
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
    width: SCREEN_WIDTH * 0.185,
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
