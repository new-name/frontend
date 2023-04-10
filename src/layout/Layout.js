import PropTypes from "prop-types";
import { StyleSheet, Dimensions, ImageBackground } from "react-native";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export default function Layout({ background, children }) {
  return (
    <ImageBackground source={background} style={styles.container}>
      {children}
    </ImageBackground>
  );
}

Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
  background: PropTypes.number,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: screenWidth,
    heiht: screenHeight,
    backgroundColor: "white",
  },
});
