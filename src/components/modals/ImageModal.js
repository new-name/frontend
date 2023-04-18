import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  Modal,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import {
  ACTIVE_COLOR,
  WHITE_COLOR,
  SUB_GRAY_COLOR,
} from "../../constants/color";
import { IMAGE_WIDTH, SCREEN_HEIGHT, SCREEN_WIDTH } from "../../constants/size";
import api from "../../features/api";
import {
  handleRenderImage,
  updateImageModalState,
} from "../../features/reducers/imageSlice";
import AppHeader from "../../layout/AppHeader";
import { IMAGE } from "../../constants/property";

export default function ImageModal() {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState("");
  const [imageDimensions, setImageDimensions] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const imageElements = useSelector((state) => state.imageReducer.elements);
  const allElements = useSelector((state) => state.editorReducer.allElements);

  const isModalVisible = useSelector(
    (state) => state.imageReducer.imageModalVisible,
  );

  const updateImages = () => {
    const layerNumber = Object.keys(allElements).length;
    const nextIndex = Object.keys(imageElements).length;
    const property = {
      ...selected,
      type: IMAGE,
      x: 0,
      y: 0,
      zIndex: layerNumber,
    };

    const updatedElements = {
      ...imageElements,
      [nextIndex]: property,
    };
    dispatch(handleRenderImage(updatedElements));
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
    <Modal visible={isModalVisible} animationType="slide">
      <View style={styles.container}>
        <AppHeader>
          <View style={styles.leftHeader}>
            <Ionicons
              name="ios-chevron-back-sharp"
              size={25}
              color={SUB_GRAY_COLOR}
            />
            <TouchableOpacity
              onPress={() => dispatch(updateImageModalState(false))}
            >
              <Text style={{ color: SUB_GRAY_COLOR }}>뒤로 가기</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.title}>
            <Text style={{ fontSize: 20, color: SUB_GRAY_COLOR }}>Images</Text>
          </View>
          <TouchableOpacity onPress={updateImages} style={styles.selectIcon}>
            <Ionicons name="image" size={30} color={ACTIVE_COLOR} />
          </TouchableOpacity>
        </AppHeader>
        <TextInput
          style={styles.searchBar}
          onChangeText={setSearchQuery}
          value={searchQuery}
          onSubmitEditing={handleSearch}
          placeholder="Search Unsplash"
        />
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          <View style={styles.gridContainer}>
            {imageDimensions.map((item, index) => (
              <TouchableOpacity
                onPress={() => setSelected(item)}
                style={[
                  styles.gridItem,
                  item === selected ? styles.selected : null,
                ]}
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
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  leftHeader: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  selectIcon: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  scrollViewContainer: {
    paddingHorizontal: 20,
  },
  searchBar: {
    width: SCREEN_WIDTH * 0.9,
    height: SCREEN_HEIGHT * 0.05,
    backgroundColor: WHITE_COLOR,
    paddingHorizontal: 10,
    borderWidth: 2,
    borderRadius: 10,
    marginVertical: 20,
  },
  gridItem: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    borderColor: "transparent",
    borderWidth: 2,
    borderRadius: 10,
    paddingVertical: 20,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  selected: {
    borderColor: ACTIVE_COLOR,
    borderWidth: 2,
    borderRadius: 10,
    paddingVertical: 20,
  },
});
