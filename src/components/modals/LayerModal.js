import { Ionicons } from "@expo/vector-icons";
import Lottie from "lottie-react-native";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Image,
  Modal,
  PanResponder,
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
import {
  handleLayerModalVisible,
  updateAllElements,
  updateLayer,
} from "../../features/reducers/editorSlice";
import AppHeader from "../../layout/AppHeader";
import ShapeRenderer from "../ShapeRenderer";

export default function LayerModal() {
  const dispatch = useDispatch();
  const [selectedLayer, setSelectedLayer] = useState(null);
  const isLayerModalVisible = useSelector(
    (state) => state.editorReducer.layerModalVisible,
  );
  const layerRef = useRef({});
  const animationRefs = useRef({});
  const allElements = useSelector((state) => state.editorReducer.allElements);
  const [sortedElements, setSortedElements] = useState([]);
  const [moveResponder, setMoveResponder] = useState({});
  const selectedLayerIndex = useRef(null);
  const movePan = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const positionRef = useRef({ x: 0, y: 0 });
  const draggingRef = useRef(false);

  const updateLayers = () => {
    dispatch(updateLayer(sortedElements));
  };

  const handleSelect = (index) => {
    const newSelectedIndex = selectedLayer === index ? null : index;
    selectedLayerIndex.current = newSelectedIndex;
    layerRef.current = sortedElements;
    setSelectedLayer(newSelectedIndex);

    if (newSelectedIndex !== null) {
      draggingRef.current = true;
    }

    if (newSelectedIndex === null) {
      draggingRef.current = false;
    }
  };

  const renderElements = (element, index) => {
    switch (element[index]?.type) {
      case TEXT:
        return (
          <View>
            <Text style={{ color: element[index].color }}>
              {element[index]?.text}
            </Text>
          </View>
        );
      case SHAPE:
        return (
          <ShapeRenderer
            sizeProperty={40}
            element={element[index]}
            color={element[index].color}
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

  useEffect(() => {
    const updatedElements = Object.keys(allElements)
      .sort((a, b) => allElements[b].zIndex - allElements[a].zIndex)
      .map((key) => allElements[key]);
    setSortedElements(updatedElements);
  }, [allElements]);

  useEffect(() => {
    setSelectedLayer(selectedLayerIndex.current);
  }, [selectedLayerIndex.current]);

  useEffect(() => {
    setMoveResponder(
      PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: (_, gestureState) => {
          if (selectedLayerIndex.current === null) return;
          positionRef.current = {
            x: gestureState.dx,
            y: gestureState.dy,
          };
          movePan.setOffset(positionRef.current);
          movePan.setValue({ x: 0, y: 0 });
        },
        onPanResponderMove: Animated.event(
          [null, { dx: movePan.x, dy: movePan.y }],
          { useNativeDriver: false },
        ),
        onPanResponderRelease: (_, gestureState) => {
          if (selectedLayerIndex.current === null) return;
          draggingRef.current = false;
          const currentElements = layerRef.current;
          const currentIndex = selectedLayerIndex.current;

          positionRef.current = {
            x: positionRef.current.x + gestureState.dx,
            y: positionRef.current.y + gestureState.dy,
          };
          const positionY = positionRef.current.y;
          const indexDiffByPosition = Math.min(
            Math.max(
              Math.round(Math.abs(positionY) / (SCREEN_HEIGHT * 0.125 * 0.9)),
              0,
            ),
            currentElements.length - 1,
          );

          let newIndex;
          if (indexDiffByPosition !== 0 && positionY > 0) {
            newIndex = currentIndex + indexDiffByPosition;
          }

          if (indexDiffByPosition !== 0 && positionY < 0) {
            newIndex = currentIndex - indexDiffByPosition;
          }

          if (newIndex === undefined || newIndex >= currentElements.length) {
            return movePan.setValue({ x: 0, y: 0 });
          }

          [currentElements[currentIndex], currentElements[newIndex]] = [
            currentElements[newIndex],
            currentElements[currentIndex],
          ];

          const newElements = currentElements.map((element, index) => {
            return { ...element, zIndex: currentElements.length - 1 - index };
          });

          selectedLayerIndex.current = newIndex;
          dispatch(updateAllElements(newElements));

          movePan.setValue({ x: 0, y: 0 });
        },
      }),
    );
  }, [movePan]);

  return (
    <Modal visible={isLayerModalVisible} animationType="slide">
      <View style={styles.container}>
        <AppHeader>
          <View style={styles.leftHeader}>
            <TouchableOpacity onPress={updateLayers}>
              <Ionicons
                name="ios-chevron-back-sharp"
                size={25}
                color={SUB_GRAY_COLOR}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={updateLayers}>
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
        <ScrollView
          scrollEnabled={!draggingRef.current}
          contentContainerStyle={{
            ...styles.scrollContainer,
            height: SCREEN_HEIGHT * sortedElements.length * 0.125,
          }}
        >
          <View>
            {sortedElements.map((element, index) => (
              <Animated.View
                key={index}
                style={[
                  { position: "absolute", top: index * SCREEN_HEIGHT * 0.125 },
                  {
                    transform: [
                      { translateX: 0 },
                      {
                        translateY: selectedLayer === index ? movePan.y : 0,
                      },
                    ],
                    zIndex: selectedLayer === index ? 1 : 0,
                  },
                ]}
                {...moveResponder.panHandlers}
              >
                <TouchableOpacity
                  onPress={() => handleSelect(index)}
                  style={{
                    ...styles.layer,
                    borderColor:
                      selectedLayer === index ? ACTIVE_COLOR : "transparent",
                    borderBottomColor:
                      selectedLayer === index ? null : UNACTIVE_COLOR,
                  }}
                >
                  <Text>{`Layer ${element.zIndex}`}</Text>
                  <View style={styles.contents}>
                    {renderElements(sortedElements, index)}
                  </View>
                  <TouchableOpacity style={styles.property}>
                    <TouchableOpacity>
                      <Ionicons
                        name="lock-closed"
                        size={30}
                        color={UNACTIVE_COLOR}
                      />
                    </TouchableOpacity>
                    <Ionicons
                      name="ios-checkmark-circle-outline"
                      size={30}
                      color={ACTIVE_GREEN}
                      style={{ opacity: selectedLayer === index ? 1 : 0 }}
                    />
                  </TouchableOpacity>
                </TouchableOpacity>
              </Animated.View>
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
    width: SCREEN_WIDTH * 0.9,
    paddingBottom: 20,
  },
  layer: {
    flexDirection: "row",
    alignItems: "center",
    width: SCREEN_WIDTH * 0.9,
    height: SCREEN_HEIGHT * 0.125,
    marginTop: 10,
    paddingHorizontal: 10,
    borderColor: "transparent",
    borderWidth: 2,
    borderBottomColor: UNACTIVE_COLOR,
    borderBottomWidth: 2,
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
