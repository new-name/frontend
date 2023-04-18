import {
  FontAwesome,
  MaterialCommunityIcons,
  Ionicons,
  Entypo,
} from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  PanResponder,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import {
  ACTIVE_COLOR,
  WHITE_COLOR,
  SHADOW_COLOR,
  UNACTIVE_COLOR,
} from "../../constants/color";
import { gifFooter } from "../../constants/footerItems";
import {
  LIBRARY,
  SIZE,
  ICON_FONT,
  ICON_IOS,
  ICON_MATERIAL_C,
  ICON_ENTYPO,
} from "../../constants/property";
import {
  APP_FOOTER_HEIGHT,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from "../../constants/size";
import {
  handleSelectGifProperty,
  updateGifModalState,
  updateGifSize,
} from "../../features/reducers/gifSlice";
import { handleResize } from "../../utils/handleResize";
import SizeSlider from "../SizeSlider";

export default function GifEditor() {
  const dispatch = useDispatch();
  const [scrollPosition, setScrollPosition] = useState(SCREEN_HEIGHT * 0.15);
  const selectedProperty = useSelector(
    (state) => state.gifReducer.gifProperties.selectedProperty,
  );

  const handleSelectedProperty = (name) => {
    const newSelectedProperty = selectedProperty === name ? "" : name;
    dispatch(handleSelectGifProperty(newSelectedProperty));
  };

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
          updateGifSize,
        );
      },
    }),
  ).current;

  useEffect(() => {
    if (selectedProperty === LIBRARY) {
      dispatch(updateGifModalState(true));
    }
  }, [selectedProperty]);

  return (
    <View>
      <View style={styles.controllerContainer}>
        {selectedProperty === SIZE && (
          <SizeSlider
            scrollbarRef={customScrollbarRef}
            sizeResponder={sizeResponder}
            scrollPosition={scrollPosition}
          />
        )}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {gifFooter.map((item) => (
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
