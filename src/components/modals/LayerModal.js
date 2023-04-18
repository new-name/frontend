import { Ionicons } from "@expo/vector-icons";
import Lottie from "lottie-react-native";
import { useEffect, useRef } from "react";
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import {
  ACTIVE_COLOR,
  ACTIVE_GREEN,
  SUB_GRAY_COLOR,
  UNACTIVE_COLOR,
} from "../../constants/color";
import { GIF, IMAGE, SHAPE, TEXT } from "../../constants/property";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../constants/size";
import { handleLayerModalVisible } from "../../features/reducers/editorSlice";
import AppHeader from "../../layout/AppHeader";
import ShapeRenderer from "../ShapeRenderer";

export default function LayerModal() {
  const dispatch = useDispatch();
  const isLayerModalVisible = useSelector(
    (state) => state.editorReducer.layerModalVisible,
  );
  const animationRefs = useRef({});
  const allElements = useSelector((state) => state.editorReducer.allElements);

  const sortedElements = Object.keys(allElements)
    .sort((a, b) => allElements[b].zIndex - allElements[a].zIndex)
    .map((key) => allElements[key]);

  const updateLayers = () => {
    console.log("update layer");
  };

  const renderElements = (element, index) => {
    switch (element[index]?.type) {
      case TEXT:
        return (
          <View>
            <Text>{element[index]?.text}</Text>
          </View>
        );
      case SHAPE:
        return (
          <ShapeRenderer
            sizeProperty={40}
            element={element[index]}
            isSelected={false}
          />
        );
      case IMAGE:
        return (
          <Image
            style={{
              width: element[index].width * 0.2,
              height: element[index].width * 0.2,
            }}
            source={{ uri: element[index]?.uri }}
          />
        );
      case GIF:
        return (
          <Lottie
            ref={(element) => (animationRefs.current[index] = element)}
            onLayout={() => animationRefs.current[index]?.play()}
            style={{ width: element[index]?.size * 0.5 }}
            source={element[index]?.source}
            autoPlay
            loop
          />
        );
      default:
        return null;
    }
  };

  return (
    <Modal visible={isLayerModalVisible} animationType="slide">
      <View style={styles.container}>
        <AppHeader>
          <View style={styles.leftHeader}>
            <TouchableOpacity
              onPress={() => dispatch(handleLayerModalVisible(false))}
            >
              <Ionicons
                name="ios-chevron-back-sharp"
                size={25}
                color={SUB_GRAY_COLOR}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => dispatch(handleLayerModalVisible(false))}
            >
              <Text style={{ color: SUB_GRAY_COLOR }}>뒤로 가기</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.title}>
            <Text style={{ fontSize: 20, color: SUB_GRAY_COLOR }}>Layers</Text>
          </View>
          <TouchableOpacity onPress={updateLayers} style={styles.selectIcon}>
            <Ionicons name="layers" size={30} color={ACTIVE_COLOR} />
          </TouchableOpacity>
        </AppHeader>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View>
            {sortedElements.map((element, index) => (
              <TouchableOpacity
                key={sortedElements[index].x + index}
                style={styles.layer}
              >
                <Text>{`Layer ${element.zIndex}`}</Text>
                <View style={styles.contents}>
                  {renderElements(sortedElements, index)}
                </View>
                <TouchableOpacity style={styles.property}>
                  <Ionicons
                    name="lock-closed"
                    size={30}
                    color={UNACTIVE_COLOR}
                  />
                  <Ionicons
                    name="ios-checkmark-circle-outline"
                    size={30}
                    color={ACTIVE_GREEN}
                  />
                </TouchableOpacity>
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
  scrollContainer: {
    flex: 1,
    width: SCREEN_WIDTH * 0.9,
  },
  layer: {
    flexDirection: "row",
    alignItems: "center",
    width: SCREEN_WIDTH * 0.9,
    height: SCREEN_HEIGHT * 0.125,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: UNACTIVE_COLOR,
  },
  contents: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  property: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-evenly",
  },
});
