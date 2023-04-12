import {
  FontAwesome,
  MaterialCommunityIcons,
  Ionicons,
} from "@expo/vector-icons";
import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";

import api from "../api";
import {
  ACTIVE_COLOR,
  EDITOR_COLOR,
  UNACTIVE_COLOR,
  SHADOW_COLOR,
} from "../constants/color";
import { imageEditor } from "../constants/footerItems";
import {
  APP_FOOTER_HEIGHT,
  IMAGE_WIDTH,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from "../constants/size";

export default function ImageEditor() {
  const [selectedProperty, setSelectedProperty] = useState("");
  const [imageDimensions, setImageDimensions] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSelectedProperty = (name) => {
    if (selectedProperty === name) {
      setSelectedProperty("");
    }

    if (selectedProperty !== name) {
      setSelectedProperty(name);
    }
  };

  const getImageSize = (uri) => {
    return new Promise((resolve, reject) => {
      Image.getSize(
        uri,
        (width, height) => {
          resolve({ uri, width, height });
        },
        (error) => {
          reject(error);
        },
      );
    });
  };

  async function fetchImageDimensions() {
    try {
      const dimensions = await Promise.all(
        photos.map(async (uri) => {
          const { width, height } = await getImageSize(uri);
          return { uri, width, height };
        }),
      );

      setImageDimensions(dimensions);
    } catch (error) {
      console.error("Error fetching image dimensions:", error);
    }
  }

  async function handleSearch() {
    try {
      const response = await api.searchImages(searchQuery);

      const images = response.data.results.map((item) => item.urls.small);
      setPhotos(images);
    } catch (error) {
      console.error("Error searching photos:", error);
    }
  }

  useEffect(() => {
    async function fetchPhotos() {
      try {
        const response = await api.getImages();

        const image = response.data.map((item) => item.urls.small);

        setPhotos(image);
      } catch (error) {
        console.error("Error fetching photos:", error);
      }
    }

    fetchPhotos();
  }, []);

  useEffect(() => {
    fetchImageDimensions();
  }, [photos]);

  return (
    <View>
      {selectedProperty === "Unsplash" && photos.length > 0 && (
        <View style={styles.container}>
          <View style={styles.paddingContainer}>
            <TextInput
              style={styles.searchBar}
              onChangeText={setSearchQuery}
              value={searchQuery}
              onSubmitEditing={handleSearch}
              placeholder="Search Unsplash"
            />
            <ScrollView
              pagingEnabled
              contentContainerStyle={styles.scrollViewContainer}
            >
              <View style={styles.gridContainer}>
                {imageDimensions.map((item, index) => (
                  <TouchableOpacity
                    style={styles.gridItem}
                    key={item.uri + index}
                  >
                    <Image
                      style={{
                        ...styles.image,
                        width: IMAGE_WIDTH,
                        height: (IMAGE_WIDTH * item.height) / item.width,
                      }}
                      source={{ uri: item.uri }}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>
        </View>
      )}
      <View style={styles.controllerContainer}>
        {imageEditor.map((item) => (
          <TouchableOpacity
            onPress={() => handleSelectedProperty(item.text)}
            key={item.iconName}
            style={styles.iconWithText}
          >
            {item.icon === "FontAwesome" && (
              <FontAwesome
                name={item.iconName}
                size={30}
                color={
                  selectedProperty === item.text ? ACTIVE_COLOR : UNACTIVE_COLOR
                }
              />
            )}
            {item.icon === "MaterialCommunityIcons" && (
              <MaterialCommunityIcons
                name={item.iconName}
                size={30}
                color={
                  selectedProperty === item.text ? ACTIVE_COLOR : UNACTIVE_COLOR
                }
              />
            )}
            {item.icon === "Ionicons" && (
              <Ionicons
                name={item.iconName}
                size={30}
                color={
                  selectedProperty === item.text ? ACTIVE_COLOR : UNACTIVE_COLOR
                }
              />
            )}
            <Text
              style={{
                ...styles.iconText,
                color:
                  selectedProperty === item.text
                    ? ACTIVE_COLOR
                    : UNACTIVE_COLOR,
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
  paddingContainer: {
    paddingTop: 20,
    alignItems: "center",
  },
  searchBar: {
    width: IMAGE_WIDTH,
    height: SCREEN_HEIGHT * 0.05,
    backgroundColor: EDITOR_COLOR,
    paddingHorizontal: 10,
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 20,
  },
  scrollViewContainer: {
    paddingHorizontal: 20,
  },
  gridContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  gridItem: {
    width: IMAGE_WIDTH,
    marginBottom: 20,
    backgroundColor: UNACTIVE_COLOR,
  },
  image: {
    width: "100%",
    height: "100%",
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
});
