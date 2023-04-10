import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Dimensions,
  ImageBackground,
  ActivityIndicator,
  StatusBar,
} from "react-native";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const statusBarHeight = StatusBar.currentHeight;

export default function Layout({ background, children }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const time = setTimeout(() => {
      setIsLoading(false);
    }, 250);

    return () => {
      clearTimeout(time);
    };
  }, []);

  return (
    <>
      {isLoading ? (
        <ActivityIndicator
          style={styles.container}
          size="large"
          color="#3C3C43"
        />
      ) : (
        <ImageBackground source={background} style={styles.container}>
          {children}
        </ImageBackground>
      )}
    </>
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
    marginTop: statusBarHeight,
    width: screenWidth,
    heiht: screenHeight,
    backgroundColor: "white",
  },
});
