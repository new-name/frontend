import { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  PanResponder,
  ScrollView,
  Alert,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { SHADOW_COLOR, EDITOR_COLOR } from "../../constants/color";
import { textFooter } from "../../constants/footerItems";
import {
  ADD,
  COLOR,
  EDIT,
  REMOVE,
  SIZE,
  FONT_STYLE,
} from "../../constants/property";
import {
  APP_FOOTER_HEIGHT,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from "../../constants/size";
import { handleColorModalVisible } from "../../features/reducers/editorSlice";
import {
  renderNewTextElement,
  updateTextSize,
  removeTextElements,
  handleSelectTextProperty,
  selectTextContents,
  updateFontContainerVisible,
} from "../../features/reducers/textSlice";
import { handleResize } from "../../utils/handleResize";
import IconRenderer from "../IconRenderer";
import SizeSlider from "../SizeSlider";

export default function TextEditor() {
  const dispatch = useDispatch();
  const [scrollPosition, setScrollPosition] = useState(SCREEN_HEIGHT * 0.15);
  const selectedProperty = useSelector(
    (state) => state.textReducer.textProperties.selectedProperty,
  );
  const selectedTextIndex = useSelector(
    (state) => state.textReducer.textProperties.selectedIndex,
  );
  const textElements = useSelector((state) => state.textReducer.elements);
  const allElements = useSelector((state) => state.editorReducer.allElements);

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
          updateTextSize,
        );
      },
    }),
  ).current;

  const handleSelectedProperty = (name) => {
    const newSelectedProperty = selectedProperty === name ? "" : name;
    dispatch(handleSelectTextProperty(newSelectedProperty));
  };

  useEffect(() => {
    const layerNumber = Object.keys(allElements).length;

    if (selectedProperty === ADD) {
      dispatch(renderNewTextElement({ layerNumber }));
    }

    if (selectedProperty === REMOVE) {
      if (selectedTextIndex === null) {
        Alert.alert("제거를 원하는 텍스트를 선택해주세요.");
        dispatch(handleSelectTextProperty(""));
      }

      if (selectedTextIndex !== null) {
        Alert.alert(
          "선택한 텍스트를 제거하시겠습니까?",
          `${textElements[selectedTextIndex]?.text}`,
          [
            {
              text: "Cancel",
              onPress: () => dispatch(handleSelectTextProperty("")),
              style: "cancel",
            },
            {
              text: "OK",
              onPress: () => dispatch(removeTextElements(selectedTextIndex)),
            },
          ],
        );
      }
    }
  }, [selectedProperty]);

  useEffect(() => {
    if (selectedProperty === COLOR) {
      if (selectedTextIndex === null) {
        Alert.alert("원하는 텍스트를 선택해주세요.");
      }

      if (selectedTextIndex !== null) {
        dispatch(handleColorModalVisible(true));
      }

      dispatch(handleSelectTextProperty(""));
    }
  }, [selectedProperty]);

  useEffect(() => {
    if (selectedProperty === EDIT) {
      if (selectedTextIndex === null) {
        Alert.alert("원하는 텍스트를 선택해주세요.");
        dispatch(handleSelectTextProperty(""));
      }

      if (selectedTextIndex !== null) {
        dispatch(selectTextContents({ index: selectedTextIndex, value: true }));
      }
    }
  }, [selectedProperty]);

  useEffect(() => {
    if (selectedProperty === FONT_STYLE) {
      if (selectedTextIndex === null) {
        Alert.alert("원하는 텍스트를 선택해주세요.");
        dispatch(handleSelectTextProperty(""));
      }

      if (selectedTextIndex !== null) {
        dispatch(updateFontContainerVisible(true));
      }
    }
  }, [selectedProperty]);

  return (
    <View style={styles.container}>
      {selectedProperty === SIZE && (
        <SizeSlider
          scrollbarRef={customScrollbarRef}
          sizeResponder={sizeResponder}
          scrollPosition={scrollPosition}
        />
      )}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {textFooter.map((item) => (
          <IconRenderer
            element={item}
            selectedProperty={selectedProperty}
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
    shadowColor: SHADOW_COLOR,
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
  },
});
