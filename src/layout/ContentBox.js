import PropTypes from "prop-types";
import { StyleSheet, View, Dimensions } from "react-native";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const contentBoxHeight = screenHeight * 0.75;

export default function ContentBox({ color, children }) {
  return <View style={styles(color).container}>{children}</View>;
}

ContentBox.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
  color: PropTypes.string.isRequired,
};

const styles = (color) =>
  StyleSheet.create({
    container: {
      justifyContent: "center",
      alignItems: "center",
      width: screenWidth,
      height: contentBoxHeight,
      backgroundColor: color,
    },
  });
