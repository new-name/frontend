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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "top",
    width: screenWidth,
    height: appFooterHeight * 1.25,
    paddingTop: appFooterHeight * 0.1,
    zIndex: 1,
    backgroundColor: HEADER,
  },
});
