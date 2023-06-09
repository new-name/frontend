import PropTypes from "prop-types";
import React from "react";
import { StyleSheet, View } from "react-native";

import { SCROLLBAR_COLOR, UNACTIVE_COLOR } from "../constants/color";
import { SCREEN_HEIGHT, SCROLL_HANDLE_HEIGHT } from "../constants/size";

export default function SizeSlider({
  scrollbarRef,
  sizeResponder,
  scrollPosition,
}) {
  return (
    <View style={styles.size}>
      <View
        ref={scrollbarRef}
        style={styles.customScrollbar}
        {...sizeResponder.panHandlers}
      >
        <View
          style={[
            styles.scrollHandle,
            { top: scrollPosition - styles.scrollHandle.height / 2 },
          ]}
        />
      </View>
    </View>
  );
}

SizeSlider.propTypes = {
  scrollbarRef: PropTypes.object.isRequired,
  sizeResponder: PropTypes.object.isRequired,
  scrollPosition: PropTypes.number.isRequired,
};

const styles = StyleSheet.create({
  size: {
    position: "absolute",
    bottom: SCREEN_HEIGHT * 0.55,
    left: 20,
  },
  customScrollbar: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    width: 30,
    height: SCREEN_HEIGHT * 0.3,
    borderRadius: 15,
    backgroundColor: SCROLLBAR_COLOR,
    left: 20,
  },
  scrollHandle: {
    position: "absolute",
    width: 20,
    height: SCROLL_HANDLE_HEIGHT,
    borderRadius: 10,
    backgroundColor: UNACTIVE_COLOR,
  },
});
