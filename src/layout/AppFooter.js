import PropTypes from "prop-types";
import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";

import { HEADER } from "../constants/color";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const appFooterHeight = screenHeight / 12;

export default function AppFooter({ children }) {
  return <View style={styles.container}>{children}</View>;
}

AppFooter.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
};

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "top",
    width: screenWidth,
    height: appFooterHeight + appFooterHeight * 0.25,
    paddingHorizontal: screenWidth * 0.2,
    paddingTop: appFooterHeight * 0.1,
    backgroundColor: HEADER,
    borderTopWidth: 0.2,
    position: "absolute",
    bottom: 0,
  },
});
