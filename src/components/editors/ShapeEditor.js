import { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  PanResponder,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { WHITE_COLOR, SHADOW_COLOR } from "../../constants/color";
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
} from "../../features/reducers/shapeSlice";
import { handleResize } from "../../utils/handleResize";
import IconRenderer from "../IconRenderer";
import SizeSlider from "../SizeSlider";

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
      dispatch(renderNewShapes());
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
        (shapeElements[selectedShapeIndex]?.type === ICON ||
          shapeElements[selectedShapeIndex]?.type === LINE) && (
          <SizeSlider
            scrollbarRef={customScrollbarRef}
            sizeResponder={sizeResponder}
            scrollPosition={scrollPosition}
          />
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
    backgroundColor: WHITE_COLOR,
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
    backgroundColor: WHITE_COLOR,
    shadowColor: SHADOW_COLOR,
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
  },
});
