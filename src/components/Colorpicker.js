import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Modal, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { UNACTIVE_COLOR } from "../constants/color";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../constants/size";
import {
  updateColorpickerVisible,
  updateTextColor,
} from "../features/reducers/textSlice";
import AppHeader from "../layout/AppHeader";

export default function Colorpicker() {
  const dispatch = useDispatch();
  const [selectedColor, setSelectedColor] = useState("");
  const isColorPickerVisible = useSelector(
    (state) => state.textReducer.colorpickerVisible,
  );
  const selectedTextIndex = useSelector(
    (state) => state.textReducer.textProperties.selectedIndex,
  );
  const updateColor = () => {
    dispatch(updateTextColor({ index: selectedTextIndex, selectedColor }));
  };

  const colorsArray = Array.from({ length: 121 }, (_, index) => {
    if (index < 11) {
      const lightness = 100 - index * 10;
      return `hsl(0, 0%, ${lightness}%)`;
    }

    return `hsl(${((index - 10) * 3) % 360}, 100%, 50%)`;
  });

  return (
    <Modal visible={isColorPickerVisible} animationType="slide">
      <View style={styles.container}>
        <AppHeader>
          <View style={styles.leftHeader}>
            <Ionicons
              name="ios-chevron-back-sharp"
              size={25}
              color="darkgray"
            />
            <TouchableOpacity
              onPress={() => dispatch(updateColorpickerVisible(false))}
            >
              <Text style={{ color: "darkgray" }}>뒤로 가기</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.title}>
            <Text style={{ fontSize: 20, color: "darkgray" }}>Colors</Text>
          </View>
          <TouchableOpacity onPress={updateColor} style={styles.colorPick}>
            <MaterialIcons name="colorize" size={30} color="darkgray" />
          </TouchableOpacity>
        </AppHeader>
        <View style={styles.gridText}>
          <Text style={{ fontSize: 26 }}>Grid</Text>
        </View>
        <View style={styles.colorTable}>
          {colorsArray.map((color) => (
            <TouchableOpacity
              key={color}
              onPress={() => setSelectedColor(color)}
              style={{
                ...styles.colors,
                backgroundColor: color,
                borderWidth: selectedColor === color ? 2 : 0,
                borderColor: selectedColor === color ? "white" : null,
              }}
            />
          ))}
        </View>
        <View style={styles.opacity}>
          <Text style={{ fontSize: 18, color: UNACTIVE_COLOR }}>OPACITY</Text>
          <View style={styles.opacityHandlerContainer} />
        </View>
        <View style={styles.border} />
        <View style={styles.bottom}>
          <View style={styles.selectedColor} />
          <Text style={{ fontSize: 20 }}>The color you selected</Text>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  leftHeader: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  colorPick: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  gridText: {
    justifyContent: "center",
    alignItems: "center",
    width: SCREEN_WIDTH * 0.8,
    height: SCREEN_HEIGHT * 0.05,
    marginVertical: 30,
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 20,
  },
  colorTable: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
    width: SCREEN_WIDTH * 0.8,
    height: SCREEN_HEIGHT * 0.4,
  },
  colors: {
    width: 28,
    height: 28,
    backgroundColor: "white",
  },
  opacity: {
    width: SCREEN_WIDTH * 0.8,
    gap: 10,
  },
  opacityHandlerContainer: {
    width: SCREEN_WIDTH * 0.8,
    height: 60,
    backgroundColor: UNACTIVE_COLOR,
    borderRadius: 30,
  },
  border: {
    width: SCREEN_WIDTH * 0.8,
    marginVertical: 30,
    borderWidth: 1,
    borderColor: UNACTIVE_COLOR,
  },
  bottom: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: SCREEN_WIDTH * 0.8,
  },
  selectedColor: {
    width: 75,
    height: 75,
    borderWidth: 2,
    borderRadius: 15,
  },
});
