import { useEffect, useRef, useState } from "react";
import { View, StyleSheet, ScrollView, PanResponder } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { WHITE_COLOR, SHADOW_COLOR } from "../../constants/color";
import { gifFooter } from "../../constants/footerItems";
import { LIBRARY, SIZE } from "../../constants/property";
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
import IconRenderer from "../IconRenderer";
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
            <IconRenderer
              element={item}
              selectedProperty={selectedProperty}
              handleSelectedProperty={handleSelectedProperty}
              key={item.iconName}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
});
