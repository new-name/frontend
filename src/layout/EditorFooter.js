import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { ACTIVE_COLOR, UNACTIVE_COLOR } from "../constants/color";
import { editorFooter } from "../constants/footerItems";
import { SCREEN_WIDTH } from "../constants/size";
import { handleActiveEditor } from "../features/reducers/editorSlice";

export default function EditorFooter() {
  const dispatch = useDispatch();
  const activeEditor = useSelector(
    (state) => state.editorReducer.selectedProperty,
  );

  const handleSelectedProperty = (name) => {
    const newSelectedProperty = activeEditor === name ? "" : name;
    dispatch(handleActiveEditor(newSelectedProperty));
  };

  return (
    <View style={styles.footer}>
      {editorFooter.map((item) => (
        <TouchableOpacity
          onPress={() => handleSelectedProperty(item.text)}
          key={item.iconName}
          style={styles.iconWithText}
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
  iconWithText: {
    flex: 1,
    alignItems: "center",
  },
  iconText: {
    marginTop: 5,
    fontSize: 12,
    color: UNACTIVE_COLOR,
  },
});
