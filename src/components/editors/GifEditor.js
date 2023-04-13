import {
  FontAwesome,
  MaterialCommunityIcons,
  Ionicons,
} from "@expo/vector-icons";
import Lottie from "lottie-react-native";
import { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";

import {
  ACTIVE_COLOR,
  CONTENT_COLOR,
  EDITOR_COLOR,
  SHADOW_COLOR,
  UNACTIVE_COLOR,
} from "../../constants/color";
import { gifEditor } from "../../constants/footerItems";
import { ICON_FONT, ICON_IOS, ICON_MATERIAL_C } from "../../constants/icon";
import { GIF_LIBRARY } from "../../constants/property";
import {
  APP_FOOTER_HEIGHT,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from "../../constants/size";

export default function GifEditor() {
  const [animationData, setAnimationData] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState("");
  const gifURLs = useSelector(
    (state) => state.gifReducer.gifProperties.gifURLArrays,
  );

  const animationRefs = useRef([]);

  const handleSelectedProperty = (name) => {
    setSelectedProperty((prevState) => (prevState === name ? "" : name));
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
    <View>
      {selectedProperty === GIF_LIBRARY && (
        <View style={styles.container}>
          <ScrollView
            pagingEnabled
            contentContainerStyle={styles.scrollViewContainer}
          >
            <View style={styles.gridContainer}>
              {animationData.map((data, index) => (
                <TouchableOpacity style={styles.gridItem} key={index}>
                  <Lottie
                    key={data + index + 1}
                    ref={(element) => (animationRefs.current[index] = element)}
                    onLayout={() => animationRefs.current[index]?.play()}
                    style={styles.animationContainer}
                    source={data}
                    autoPlay
                    loop
                  />
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      )}
      <View style={styles.controllerContainer}>
        {gifEditor.map((item) => (
          <TouchableOpacity
            onPress={() => handleSelectedProperty(item.text)}
            key={item.iconName}
            style={styles.iconWithText}
          >
            {item.icon === ICON_FONT && (
              <FontAwesome
                name={item.iconName}
                size={30}
                color={selectedProperty === item.text ? ACTIVE_COLOR : "gray"}
              />
            )}
            {item.icon === ICON_MATERIAL_C && (
              <MaterialCommunityIcons
                name={item.iconName}
                size={30}
                color={selectedProperty === item.text ? ACTIVE_COLOR : "gray"}
              />
            )}
            {item.icon === ICON_IOS && (
              <Ionicons
                name={item.iconName}
                size={30}
                color={selectedProperty === item.text ? ACTIVE_COLOR : "gray"}
              />
            )}
            <Text
              style={{
                ...styles.iconText,
                color: selectedProperty === item.text ? ACTIVE_COLOR : "gray",
              }}
            >
              {item.text}
            </Text>
          </TouchableOpacity>
        ))}
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
    backgroundColor: EDITOR_COLOR,
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
    backgroundColor: EDITOR_COLOR,
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
  },
  iconText: {
    marginTop: 5,
    fontSize: 12,
    color: UNACTIVE_COLOR,
  },
  scrollViewContainer: {
    paddingHorizontal: 20,
    paddingTop: 30,
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
    alignItems: "center",
    justifyContent: "center",
    width: SCREEN_WIDTH * 0.4,
    borderWidth: 0.2,
    borderRadius: 10,
    backgroundColor: CONTENT_COLOR,
  },
});
