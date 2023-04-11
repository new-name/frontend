import Lottie from "lottie-react-native";
import PropTypes from "prop-types";
import { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Dimensions, ActivityIndicator } from "react-native";

import { EDITOR_COLOR } from "../constants/color";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export default function GifEditor({ gifURLs }) {
  const [isLoading, setIsLoading] = useState(true);
  const [animationData, setAnimationData] = useState([]);
  const animationRefs = useRef([]);

  const onAnimationLayout = (index) => {
    animationRefs.current[index]?.play();
  };

  useEffect(() => {
    const fetchAnimationData = async (urls) => {
      try {
        const allData = await Promise.all(
          urls.map(async (url) => {
            const response = await fetch(url);
            return await response.json();
          }),
        );
        setAnimationData(allData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching Lottie JSON data:", error);
      }
    };

    fetchAnimationData(gifURLs);
  }, [gifURLs]);

  useEffect(() => {
    animationRefs.current = animationRefs.current.slice(0, gifURLs.length);
  }, [gifURLs]);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator
          style={styles.container}
          size="large"
          color="#3C3C43"
        />
      ) : (
        animationData.map((data, index) => (
          <Lottie
            key={data + index}
            ref={(element) => (animationRefs.current[index] = element)}
            onLayout={() => animationRefs.current[index]?.play()}
            style={styles.animationContainer}
            source={data}
            autoPlay
            loop
          />
        ))
      )}
    </View>
  );
}

GifEditor.propTypes = {
  gifURLs: PropTypes.array.isRequired,
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-around",
    alignItems: "center",
    width: screenWidth,
    height: (screenHeight * 2) / 3,
    backgroundColor: EDITOR_COLOR,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2,
  },
  animationContainer: {
    zIndex: 10,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    width: 200,
    height: 100,
  },
});
