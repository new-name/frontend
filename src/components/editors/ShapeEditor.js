import { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  PanResponder,
  TouchableOpacity,
  Text,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import {
  WHITE_COLOR,
  ACTIVE_COLOR,
  UNACTIVE_COLOR,
  EDITOR_COLOR,
} from "../../constants/color";
import { shapeFooter } from "../../constants/footerItems";
import {
  COLOR,
  ICONS,
  RECTANGLE,
  CIRCLE,
  LINE,
  SIZE,
  ICON,
} from "../../constants/property";
import {
  APP_FOOTER_HEIGHT,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from "../../constants/size";
import { handleColorModalVisible } from "../../features/reducers/editorSlice";
import {
  renderNewShapes,
  handleSelectShapeProperty,
  updateIconModalState,
  updateShapeSize,
  updateSizeProportionMode,
} from "../../features/reducers/shapeSlice";
import { handleResize } from "../../utils/handleResize";
import IconRenderer from "../IconRenderer";
import SizeSlider from "../SizeSlider";

export default function ShapeEditor() {
  const dispatch = useDispatch();
  const [scrollPosition, setScrollPosition] = useState(SCREEN_HEIGHT * 0.15);
  const shapeElements = useSelector((state) => state.shapeReducer.elements);
  const allElements = useSelector((state) => state.editorReducer.allElements);

  const selectedShapeProperty = useSelector(
    (state) => state.shapeReducer.shapeProperties.selectedProperty,
  );

  const selectedShapeIndex = useSelector(
    (state) => state.shapeReducer.shapeProperties.selectedIndex,
  );
  const sizeProportionMode = useSelector(
    (state) => state.shapeReducer.isSizeProportionMode,
  );

  const handleSelectedProperty = (name) => {
    const newSelectedProperty = selectedShapeProperty === name ? "" : name;
    dispatch(handleSelectShapeProperty(newSelectedProperty));
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
    if (selectedShapeProperty === ICONS) {
      dispatch(updateIconModalState(true));
    }

    if (
      selectedShapeProperty === RECTANGLE ||
      selectedShapeProperty === CIRCLE ||
      selectedShapeProperty === LINE
    ) {
      const layerNumber = Object.keys(allElements).length;

      dispatch(renderNewShapes({ layerNumber }));
    }
  }, [selectedShapeProperty]);

  useEffect(() => {
    if (selectedShapeProperty === SIZE && selectedShapeIndex === null) {
      Alert.alert("원하는 아이콘 또는 모양을 선택해주세요.");
      dispatch(handleSelectShapeProperty(""));
    }
  }, [selectedShapeProperty]);

  useEffect(() => {
    if (selectedShapeProperty === COLOR) {
      if (selectedShapeIndex === null) {
        Alert.alert("원하는 아이콘 또는 모양을 선택해주세요.");
      } else {
        dispatch(handleColorModalVisible(true));
      }

      dispatch(handleSelectShapeProperty(""));
    }
  }, [selectedShapeProperty]);

  return (
    <View style={styles.container}>
      {selectedShapeProperty === SIZE &&
        (shapeElements[selectedShapeIndex]?.shapeType === ICON ||
          shapeElements[selectedShapeIndex]?.shapeType === LINE) && (
          <SizeSlider
            scrollbarRef={customScrollbarRef}
            sizeResponder={sizeResponder}
            scrollPosition={scrollPosition}
          />
        )}
      {selectedShapeProperty === SIZE &&
        shapeElements[selectedShapeIndex]?.shapeType !== ICON &&
        shapeElements[selectedShapeIndex]?.shapeType !== LINE && (
          <TouchableOpacity
            onPress={() =>
              dispatch(updateSizeProportionMode(!sizeProportionMode))
            }
            style={{
              ...styles.sizeMode,
              borderColor: sizeProportionMode ? ACTIVE_COLOR : UNACTIVE_COLOR,
            }}
          >
            <Text
              style={{
                color: sizeProportionMode ? ACTIVE_COLOR : UNACTIVE_COLOR,
              }}
            >
              Proportional
            </Text>
          </TouchableOpacity>
        )}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {shapeFooter.map((item) => (
          <IconRenderer
            element={item}
            selectedProperty={selectedShapeProperty}
            handleSelectedProperty={handleSelectedProperty}
            key={item.iconName}
          />
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
  },
  controllerContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: SCREEN_WIDTH,
    height: APP_FOOTER_HEIGHT,
    backgroundColor: WHITE_COLOR,
  },
  sizeMode: {
    position: "absolute",
    top: -SCREEN_HEIGHT * 0.065,
    left: SCREEN_WIDTH * 0.365,
    borderWidth: 2,
    borderRadius: 20,
    padding: 10,
  },
});
