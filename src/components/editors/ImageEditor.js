import {
  FontAwesome,
  MaterialCommunityIcons,
  Ionicons,
} from "@expo/vector-icons";
import { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import {
  ACTIVE_COLOR,
  WHITE_COLOR,
  UNACTIVE_COLOR,
  SHADOW_COLOR,
} from "../../constants/color";
import { imageFooter } from "../../constants/footerItems";
import {
  UNSPLASH,
  ICON_FONT,
  ICON_IOS,
  ICON_MATERIAL_C,
} from "../../constants/property";
import {
  APP_FOOTER_HEIGHT,
  IMAGE_WIDTH,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from "../../constants/size";
import {
  handleSelectImageProperty,
  updateImageModalState,
} from "../../features/reducers/imageSlice";

export default function ImageEditor() {
  const dispatch = useDispatch();
  const selectedProperty = useSelector(
    (state) => state.imageReducer.imageProperties.selectedProperty,
  );

  const handleSelectedProperty = (name) => {
    const newSelectedProperty = selectedProperty === name ? "" : name;
    dispatch(handleSelectImageProperty(newSelectedProperty));
  };

  useEffect(() => {
    if (selectedProperty === UNSPLASH) {
      dispatch(updateImageModalState(true));
    }
  }, [selectedProperty]);

  return (
    <View>
      <View style={styles.controllerContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {imageFooter.map((item) => (
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
    backgroundColor: WHITE_COLOR,
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
  paddingContainer: {
    paddingTop: 20,
    alignItems: "center",
  },
  searchBar: {
    width: IMAGE_WIDTH,
    height: SCREEN_HEIGHT * 0.05,
    backgroundColor: WHITE_COLOR,
    paddingHorizontal: 10,
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 20,
  },
  scrollViewContainer: {
    paddingHorizontal: 20,
  },
  gridContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  gridItem: {
    width: IMAGE_WIDTH,
    marginBottom: 20,
    backgroundColor: UNACTIVE_COLOR,
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
