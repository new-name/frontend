import {
  Entypo,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
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
import { shapeFooter } from "../../constants/footerItems";
import {
  ICON_ENTYPO,
  ICON_FONT,
  ICON_IOS,
  ICON_MATERIAL,
  ICON_MATERIAL_C,
} from "../../constants/icon";
import {
  SHAPE_COLOR,
  SHAPE_ICONS,
  SHAPE_RECT,
  SHAPE_CIRCLE,
  SHAPE_LINE,
  RECTANGLE,
  ELLIPSE,
  LINE,
  SHAPE_SIZE,
  ICON,
} from "../../constants/property";
import {
  APP_FOOTER_HEIGHT,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  SCROLL_HANDLE_HEIGHT,
} from "../../constants/size";
import { handleColorModalVisible } from "../../features/reducers/editorSlice";
import {
  handleRenderShapes,
  handleSelectProperty,
  updateIconModalState,
  updateShapeSize,
} from "../../features/reducers/shapeSlice";
import { handleResize } from "../../utils/handleResize";

export default function ShapeEditor() {
  const dispatch = useDispatch();
  const [scrollPosition, setScrollPosition] = useState(SCREEN_HEIGHT * 0.15);
  const shapeElements = useSelector((state) => state.shapeReducer.elements);
  const selectedShapeProperty = useSelector(
    (state) => state.shapeReducer.shapeProperties.selectedProperty,
  );
  const selectedShapeIndex = useSelector(
    (state) => state.shapeReducer.shapeProperties.selectedIndex,
  );

  const handleSelectedProperty = (name) => {
    const newSelectedProperty = selectedShapeProperty === name ? "" : name;
    dispatch(handleSelectProperty(newSelectedProperty));
  };

  const customScrollbarRef = useRef(null);
  const sizeResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gestureState) => {
        handleResize(
          gestureState.moveY,
          customScrollbarRef,
          setScrollPosition,
          dispatch,
          updateShapeSize,
        );
      },
    }),
  ).current;

  useEffect(() => {
    if (selectedShapeProperty === SHAPE_ICONS) {
      dispatch(updateIconModalState(true));
    }
  }, [selectedShapeProperty]);

  useEffect(() => {
    if (
      selectedShapeProperty === SHAPE_RECT ||
      selectedShapeProperty === SHAPE_CIRCLE ||
      selectedShapeProperty === SHAPE_LINE
    ) {
      const nextIndex = Object.keys(shapeElements).length;

      let property;
      if (selectedShapeProperty === SHAPE_RECT) {
        property = {
          type: RECTANGLE,
          x: 0,
          y: 0,
          width: 200,
          height: 200,
          stroke: UNACTIVE_COLOR,
          strokeWidth: 2,
          color: EDITOR_COLOR,
          zIndex: 0,
        };
      }

      if (selectedShapeProperty === SHAPE_CIRCLE) {
        property = {
          type: ELLIPSE,
          x: 0,
          y: 0,
          width: 100,
          height: 100,
          stroke: UNACTIVE_COLOR,
          strokeWidth: 2,
          color: EDITOR_COLOR,
          zIndex: 0,
        };
      }

      if (selectedShapeProperty === SHAPE_LINE) {
        property = {
          type: LINE,
          x: 0,
          y: 0,
          x1: 0,
          y1: 20,
          x2: SCREEN_WIDTH * 0.7,
          y2: 20,
          stroke: UNACTIVE_COLOR,
          strokeWidth: 3,
          zIndex: 0,
        };
      }

      const updatedShapeElements = {
        ...shapeElements,
        [nextIndex]: property,
      };

      dispatch(handleRenderShapes(updatedShapeElements));
    }
  }, [selectedShapeProperty]);

  useEffect(() => {
    if (selectedShapeProperty === SHAPE_COLOR) {
      if (selectedShapeIndex === null) {
        Alert.alert("원하는 아이콘 또는 모양을 선택해주세요.");
      }

      if (selectedShapeIndex !== null) {
        dispatch(handleColorModalVisible(true));
      }

      dispatch(handleSelectProperty(""));
    }
  }, [selectedShapeProperty]);

  return (
    <View style={styles.container}>
      {selectedShapeProperty === SHAPE_SIZE &&
        (shapeElements[selectedShapeIndex]?.type === ICON ||
          shapeElements[selectedShapeIndex]?.type === LINE) && (
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
        {shapeFooter.map((item) => (
          <TouchableOpacity
            onPress={() => handleSelectedProperty(item.text)}
            key={item.iconName}
            style={styles.iconWithText}
          >
            {item.icon === ICON_MATERIAL && (
              <MaterialIcons
                name={item.iconName}
                size={30}
                color={
                  selectedShapeProperty === item.text
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
                  selectedShapeProperty === item.text
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
                  selectedShapeProperty === item.text
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
                  selectedShapeProperty === item.text
                    ? ACTIVE_COLOR
                    : UNACTIVE_COLOR
                }
              />
            )}
            {item.icon === ICON_FONT && (
              <FontAwesome
                name={item.iconName}
                size={30}
                color={
                  selectedShapeProperty === item.text
                    ? ACTIVE_COLOR
                    : UNACTIVE_COLOR
                }
              />
            )}
            <Text
              style={{
                ...styles.iconText,
                color:
                  selectedShapeProperty === item.text
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
