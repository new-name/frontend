import {
  Entypo,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import PropTypes from "prop-types";
import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

import { ACTIVE_COLOR, UNACTIVE_COLOR } from "../constants/color";
import {
  ICON_ENTYPO,
  ICON_FONT,
  ICON_IOS,
  ICON_MATERIAL_C,
} from "../constants/property";
import { SCREEN_WIDTH } from "../constants/size";

export default function IconRenderer({
  element,
  selectedProperty,
  handleSelectedProperty,
}) {
  const isSelected = selectedProperty === element.text;
  const color = isSelected ? ACTIVE_COLOR : UNACTIVE_COLOR;

  const renderIcon = () => {
    switch (element.icon) {
      case ICON_FONT:
        return <FontAwesome name={element.iconName} size={30} color={color} />;
      case ICON_MATERIAL_C:
        return (
          <MaterialCommunityIcons
            name={element.iconName}
            size={30}
            color={color}
          />
        );
      case ICON_IOS:
        return <Ionicons name={element.iconName} size={30} color={color} />;
      case ICON_ENTYPO:
        return <Entypo name={element.iconName} size={30} color={color} />;
      default:
        return null;
    }
  };

  return (
    <TouchableOpacity
      onPress={() => handleSelectedProperty(element.text)}
      style={styles.iconContainer}
    >
      {renderIcon()}
      <Text style={{ ...styles.iconText, color }}>{element.text}</Text>
    </TouchableOpacity>
  );
}

IconRenderer.propTypes = {
  element: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
  selectedProperty: PropTypes.string.isRequired,
  handleSelectedProperty: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  iconContainer: {
    flex: 1,
    alignItems: "center",
    width: SCREEN_WIDTH * 0.185,
  },
  iconText: {
    marginTop: 5,
    fontSize: 12,
    color: UNACTIVE_COLOR,
  },
});
