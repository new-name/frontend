import { Ionicons } from "@expo/vector-icons";
import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { ACTIVE_COLOR, UNACTIVE_COLOR } from "../constants/color";
import { editorFooter } from "../constants/footerItems";
import { GIF, IMAGE, SHAPE, TEXT } from "../constants/property";
import { SCREEN_WIDTH } from "../constants/size";
import { handleActiveEditor } from "../features/reducers/editorSlice";
import { handleSelectGifProperty } from "../features/reducers/gifSlice";
import { handleSelectImageProperty } from "../features/reducers/imageSlice";
import { handleSelectShapeProperty } from "../features/reducers/shapeSlice";
import { handleSelectTextProperty } from "../features/reducers/textSlice";

export default function EditorFooter() {
  const dispatch = useDispatch();
  const activeEditor = useSelector(
    (state) => state.editorReducer.selectedProperty,
  );

  const handleSelectedProperty = (name) => {
    const newSelectedProperty = activeEditor === name ? "" : name;
    dispatch(handleActiveEditor(newSelectedProperty));
  };

  const dispatchPropertyReset = (propertyType, resetAction) => {
    if (activeEditor !== propertyType) {
      dispatch(resetAction(""));
    }
  };

  useEffect(() => {
    dispatchPropertyReset(GIF, handleSelectGifProperty);
    dispatchPropertyReset(SHAPE, handleSelectShapeProperty);
    dispatchPropertyReset(IMAGE, handleSelectImageProperty);
    dispatchPropertyReset(TEXT, handleSelectTextProperty);
  }, [activeEditor]);

  return (
    <View style={styles.footer}>
      {editorFooter.map((item) => (
        <TouchableOpacity
          onPress={() => handleSelectedProperty(item.text)}
          key={item.iconName}
          style={styles.iconContainer}
        >
          <Ionicons
            name={item.iconName}
            size={30}
            color={activeEditor === item.text ? ACTIVE_COLOR : UNACTIVE_COLOR}
          />
          <Text
            style={{
              ...styles.iconText,
              color: activeEditor === item.text ? ACTIVE_COLOR : UNACTIVE_COLOR,
            }}
          >
            {item.text}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: SCREEN_WIDTH,
  },
  iconContainer: {
    flex: 1,
    alignItems: "center",
  },
  iconText: {
    marginTop: 5,
    fontSize: 12,
    color: UNACTIVE_COLOR,
  },
});
