import { Ionicons } from "@expo/vector-icons";
import Lottie from "lottie-react-native";
import { useEffect, useRef, useState } from "react";
import {
  Modal,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import {
  ACTIVE_COLOR,
  WHITE_COLOR,
  SUB_GRAY_COLOR,
  UNACTIVE_COLOR,
} from "../../constants/color";
import { GIF } from "../../constants/property";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../constants/size";
import api from "../../features/api";
import {
  handleRenderGif,
  updateGifModalState,
} from "../../features/reducers/gifSlice";
import AppHeader from "../../layout/AppHeader";

export default function GifModal() {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState("");
  const [gifURLs, setGifURLs] = useState([]);
  const [animationData, setAnimationData] = useState([]);

  const gifElements = useSelector((state) => state.gifReducer.elements);
  const allElements = useSelector((state) => state.editorReducer.allElements);

  const animationRefs = useRef([]);

  const isGifModalVisible = useSelector(
    (state) => state.gifReducer.gifModalVisible,
  );

  const updateGifs = () => {
    const layerNumber = Object.keys(allElements).length;
    const nextIndex = Object.keys(gifElements).length;
    const property = {
      type: GIF,
      x: 0,
      y: 0,
      source: selected,
      size: SCREEN_WIDTH * 0.4,
      zIndex: layerNumber,
      id: Date.now(),
    };

    const updatedElements = {
      ...gifElements,
      [nextIndex]: property,
    };
    dispatch(handleRenderGif(updatedElements));
  };

  useEffect(() => {
    async function getGif() {
      const urls = await api.getGifs();

      setGifURLs(urls);
    }

    getGif();
  }, []);

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
    <Modal visible={isGifModalVisible} animationType="slide">
      <View style={styles.container}>
        <AppHeader>
          <View style={styles.leftHeader}>
            <Ionicons
              name="ios-chevron-back-sharp"
              size={25}
              color={SUB_GRAY_COLOR}
            />
            <TouchableOpacity
              onPress={() => dispatch(updateGifModalState(false))}
            >
              <Text style={{ color: SUB_GRAY_COLOR }}>뒤로 가기</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.title}>
            <Text style={{ fontSize: 20, color: SUB_GRAY_COLOR }}>Gifs</Text>
          </View>
          <TouchableOpacity onPress={updateGifs} style={styles.selectIcon}>
            <Ionicons name="ios-play-sharp" size={30} color={ACTIVE_COLOR} />
          </TouchableOpacity>
        </AppHeader>
        <ScrollView
          pagingEnabled
          contentContainerStyle={styles.scrollViewContainer}
        >
          <View style={styles.gridContainer}>
            {animationData.map((data, index) => (
              <TouchableOpacity
                onPress={() => setSelected(data)}
                style={styles.gridItem}
                key={data + index}
              >
                <Lottie
                  ref={(element) => (animationRefs.current[index] = element)}
                  onLayout={() => animationRefs.current[index]?.play()}
                  style={{
                    ...styles.animationContainer,
                    borderColor:
                      data === selected ? ACTIVE_COLOR : UNACTIVE_COLOR,
                    borderWidth: data === selected ? 1 : 0,
                  }}
                  source={data}
                  autoPlay
                  loop
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
    paddingTop: 30,
  },
  gridItem: {
    justifyContent: "center",
    alignItems: "center",
    width: "48%",
    marginBottom: 20,
  },
  animationContainer: {
    zIndex: 10,
    alignItems: "center",
    justifyContent: "center",
    width: SCREEN_WIDTH * 0.4,
    borderRadius: 10,
    backgroundColor: WHITE_COLOR,
  },
});
