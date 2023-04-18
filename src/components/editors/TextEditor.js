import { FontAwesome, MaterialIcons, Ionicons } from "@expo/vector-icons";
import { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  PanResponder,
  ScrollView,
  Alert,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import {
  ACTIVE_COLOR,
  WHITE_COLOR,
  SHADOW_COLOR,
  UNACTIVE_COLOR,
} from "../../constants/color";
import { textFooter } from "../../constants/footerItems";
import {
  ADD,
  COLOR,
  EDIT,
  REMOVE,
  SIZE,
  FONT_STYLE,
  ICON_FONT,
  ICON_MATERIAL,
  ICON_IOS,
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
  selectText,
  selectTextContents,
  updateFontContainerVisible,
} from "../../features/reducers/textSlice";
import { handleResize } from "../../utils/handleResize";
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

  const handleSelectTextEditorProperty = (name) => {
    const newSelectedProperty = selectedProperty === name ? "" : name;
    dispatch(selectText(newSelectedProperty));
  };

  useEffect(() => {
    if (selectedProperty === ADD) {
      dispatch(renderNewTextElement());
    }

    if (selectedProperty === REMOVE) {
      if (selectedTextIndex === null) {
        Alert.alert("제거를 원하는 텍스트를 선택해주세요.");
        dispatch(selectText(""));
      }

      if (selectedTextIndex !== null) {
        Alert.alert(
          "선택한 텍스트를 제거하시겠습니까?",
          `${textElements[selectedTextIndex]?.text}`,
          [
            {
              text: "Cancel",
              onPress: () => dispatch(selectText("")),
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

      dispatch(selectText(""));
    }
  }, [selectedProperty]);

  useEffect(() => {
    if (selectedProperty === EDIT) {
      if (selectedTextIndex === null) {
        Alert.alert("원하는 텍스트를 선택해주세요.");
        dispatch(selectText(""));
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
        dispatch(selectText(""));
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
          <TouchableOpacity
            onPress={() => handleSelectTextEditorProperty(item.text)}
            key={item.iconName}
            style={styles.iconContainer}
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
    backgroundColor: WHITE_COLOR,
    shadowColor: SHADOW_COLOR,
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
  },
  iconContainer: {
    width: SCREEN_WIDTH * 0.185,
    alignItems: "center",
  },
  iconText: {
    marginTop: 5,
    fontSize: 12,
    color: UNACTIVE_COLOR,
  },
});
