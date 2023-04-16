import {
  Entypo,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import {
  ACTIVE_COLOR,
  EDITOR_COLOR,
  SHADOW_COLOR,
  UNACTIVE_COLOR,
} from "../../constants/color";
import { shapeEditor } from "../../constants/footerItems";
import {
  ICON_ENTYPO,
  ICON_IOS,
  ICON_MATERIAL,
  ICON_MATERIAL_C,
} from "../../constants/icon";
import { SHAPE_ICONS } from "../../constants/property";
import { APP_FOOTER_HEIGHT, SCREEN_WIDTH } from "../../constants/size";
import {
  handleSelectProperty,
  updateIconModalState,
} from "../../features/reducers/shapeSlice";

export default function ShapeEditor() {
  const dispatch = useDispatch();
  const selectedShapeProperty = useSelector(
    (state) => state.shapeReducer.shapeProperties.selectedProperty,
  );

  const handleSelectedProperty = (name) => {
    const newSelectedProperty = selectedShapeProperty === name ? "" : name;
    dispatch(handleSelectProperty(newSelectedProperty));
  };

  useEffect(() => {
    if (selectedShapeProperty === SHAPE_ICONS) {
      dispatch(updateIconModalState(true));
    }
  }, [selectedShapeProperty]);

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
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
});
