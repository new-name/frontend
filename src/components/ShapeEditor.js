import {
  Entypo,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import {
  ACTIVE_COLOR,
  EDITOR_COLOR,
  SHADOW_COLOR,
  UNACTIVE_COLOR,
} from "../constants/color";
import { shapeEditor } from "../constants/footerItems";
import { ICON_ENTYPO, ICON_MATERIAL, ICON_MATERIAL_C } from "../constants/icon";
import { APP_FOOTER_HEIGHT, SCREEN_WIDTH } from "../constants/size";

export default function ShapeEditor() {
  const [selectedProperty, setSelectedProperty] = useState("");

  const handleSelectedProperty = (name) => {
    setSelectedProperty((prevState) => (prevState === name ? "" : name));
  };

  return (
    <View style={styles.container}>
      {shapeEditor.map((item) => (
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
                selectedProperty === item.text ? ACTIVE_COLOR : UNACTIVE_COLOR
              }
            />
          )}
          {item.icon === ICON_MATERIAL_C && (
            <MaterialCommunityIcons
              name={item.iconName}
              size={30}
              color={
                selectedProperty === item.text ? ACTIVE_COLOR : UNACTIVE_COLOR
              }
            />
          )}
          {item.icon === ICON_ENTYPO && (
            <Entypo
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
                selectedProperty === item.text ? ACTIVE_COLOR : UNACTIVE_COLOR,
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
  },
  iconText: {
    marginTop: 5,
    fontSize: 12,
    color: UNACTIVE_COLOR,
  },
});
