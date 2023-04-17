import {
  FontAwesome,
  MaterialCommunityIcons,
  Ionicons,
  Entypo,
} from "@expo/vector-icons";
import { useEffect } from "react";
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
import { gifEditor } from "../../constants/footerItems";
import {
  ICON_FONT,
  ICON_IOS,
  ICON_MATERIAL_C,
  ICON_ENTYPO,
} from "../../constants/icon";
import { GIF_LIBRARY } from "../../constants/property";
import {
  APP_FOOTER_HEIGHT,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from "../../constants/size";
import {
  handleSelectGifProperty,
  updateGifModalState,
} from "../../features/reducers/gifSlice";

export default function GifEditor() {
  const dispatch = useDispatch();
  const selectedProperty = useSelector(
    (state) => state.gifReducer.gifProperties.selectedProperty,
  );

  const handleSelectedProperty = (name) => {
    const newSelectedProperty = selectedProperty === name ? "" : name;
    dispatch(handleSelectGifProperty(newSelectedProperty));
  };

  useEffect(() => {
    if (selectedProperty === GIF_LIBRARY) {
      dispatch(updateGifModalState(true));
    }
  }, [selectedProperty]);

  return (
    <View>
      <View style={styles.controllerContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {gifEditor.map((item) => (
            <TouchableOpacity
              onPress={() => handleSelectedProperty(item.text)}
              key={item.iconName}
              style={styles.iconWithText}
            >
              {item.icon === ICON_FONT && (
                <FontAwesome
                  name={item.iconName}
                  size={30}
                  color={
                    selectedProperty === item.text
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
                    selectedProperty === item.text
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
                    selectedProperty === item.text
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
                    selectedProperty === item.text
                      ? ACTIVE_COLOR
                      : UNACTIVE_COLOR
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-around",
    alignItems: "center",
    width: SCREEN_WIDTH,
    height: (SCREEN_HEIGHT * 2) / 3,
    backgroundColor: EDITOR_COLOR,
    shadowColor: SHADOW_COLOR,
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
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
