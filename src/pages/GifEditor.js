import { FontAwesome, MaterialIcons, Ionicons } from "@expo/vector-icons";
import Lottie from "lottie-react-native";
import PropTypes from "prop-types";
import { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { EDITOR_COLOR } from "../constants/color";
import { gifEditor } from "../constants/footerItems";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const appFooterHeight = screenHeight / 12;

export default function GifEditor({ gifURLs }) {
  const [isLoading, setIsLoading] = useState(true);
  const [animationData, setAnimationData] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState("");

  const animationRefs = useRef([]);

  const handleEditor = (name) => {
    if (selectedProperty === name) {
      setSelectedProperty("");
    }

    if (!selectedProperty) {
      setSelectedProperty(name);
    }
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
        <>
          <ScrollView
            pagingEnabled
            contentContainerStyle={styles.scrollViewContainer}
          >
            <View style={styles.gridContainer}>
              {animationData.map((data, index) => (
                <View style={styles.gridItem} key={index}>
                  <Lottie
                    key={data + index + 1}
                    ref={(element) => (animationRefs.current[index] = element)}
                    onLayout={() => animationRefs.current[index]?.play()}
                    style={styles.animationContainer}
                    source={data}
                    autoPlay
                    loop
                  />
                </View>
              ))}
            </View>
          </ScrollView>
          <View style={styles.iconContainer}>
            {gifEditor.map((item) => (
              <TouchableOpacity
                onPress={() => handleEditor(item.text)}
                key={item.iconName}
                style={styles.iconWithText}
              >
                {item.icon === "FontAwesome" && (
                  <FontAwesome name={item.iconName} size={30} color="gray" />
                )}
                {item.icon === "MaterialIcons" && (
                  <MaterialIcons name={item.iconName} size={30} color="gray" />
                )}
                {item.icon === "Ionicons" && (
                  <Ionicons name={item.iconName} size={30} color="gray" />
                )}
                <Text style={styles.iconText}>{item.text}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
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
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: screenWidth,
    height: appFooterHeight,
    backgroundColor: EDITOR_COLOR,
  },
  iconWithText: {
    flex: 1,
    alignItems: "center",
  },
  iconText: {
    marginTop: 5,
    fontSize: 12,
    color: "gray",
  },
  scrollViewContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  gridItem: {
    width: "48%",
    marginBottom: 20,
  },
  animationContainer: {
    zIndex: 10,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    width: screenWidth * 0.4,
    borderWidth: 0.2,
    borderRadius: 10,
  },
});
