import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef, useState } from "react";
import {
  Modal,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  PanResponder,
  Animated,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import {
  ACTIVE_COLOR,
  WHITE_COLOR,
  SUB_GRAY_COLOR,
  UNACTIVE_COLOR,
} from "../../constants/color";
import { FILL, ICON, SHAPE, STROKE, TEXT } from "../../constants/property";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../constants/size";
import { handleColorModalVisible } from "../../features/reducers/editorSlice";
import { updateShapeColor } from "../../features/reducers/shapeSlice";
import { updateTextColor } from "../../features/reducers/textSlice";
import AppHeader from "../../layout/AppHeader";

const colorsArray = Array.from({ length: 121 }, (_, index) => {
  if (index < 11) {
    const lightness = 100 - index * 10;
    return `hsl(0, 0%, ${lightness}%)`;
  }

  return `hsl(${((index - 10) * 3) % 360}, 100%, 50%)`;
});

const hslToHsla = (hslColor, alpha) => {
  const regex = /hsl\((\d+),\s*(\d+)%?,\s*(\d+)%?\)/;

  const matches = hslColor.match(regex);

  if (matches) {
    const h = parseInt(matches[1], 10);
    const s = parseInt(matches[2], 10);
    const l = parseInt(matches[3], 10);

    return `hsla(${h}, ${s}%, ${l}%, ${alpha})`;
  }
};

export default function ColorModal() {
  const dispatch = useDispatch();
  const [selectedMode, setSelectedMode] = useState(FILL);
  const [typedNumber, setTypedNumber] = useState("2");
  const [selectedColor, setSelectedColor] = useState(colorsArray[0]);
  const [selectedColorOpacity, setSelectedColorOpacity] = useState(1);
  const isColorPickerVisible = useSelector(
    (state) => state.editorReducer.colorPickerVisible,
  );
  const selectedTextIndex = useSelector(
    (state) => state.textReducer.textProperties.selectedIndex,
  );
  const selectedShapeIndex = useSelector(
    (state) => state.shapeReducer.shapeProperties.selectedIndex,
  );
  const shapeElements = useSelector((state) => state.shapeReducer.elements);

  const activeEditor = useSelector(
    (state) => state.editorReducer.selectedProperty,
  );

  const updateColor = () => {
    const color = hslToHsla(selectedColor, selectedColorOpacity);

    if (activeEditor === SHAPE) {
      dispatch(
        updateShapeColor({
          index: selectedShapeIndex,
          selectedColor: color,
          mode: selectedMode,
          strokeWidth: parseInt(typedNumber, 10),
        }),
      );
    }

    if (activeEditor === TEXT) {
      dispatch(
        updateTextColor({ index: selectedTextIndex, selectedColor: color }),
      );
    }

    dispatch(handleColorModalVisible(false));
  };

  const calculateOpacity = () => {
    const minPosition = 0;
    const maxPosition = SCREEN_WIDTH * 0.8 - 60;
    const currentPosition = positionRef.current;

    const opacity =
      (currentPosition - minPosition) / (maxPosition - minPosition);

    setSelectedColorOpacity(opacity);
  };

  const opacityPan = useRef(
    new Animated.Value(SCREEN_WIDTH * 0.8 - 60),
  ).current;
  const positionRef = useRef(SCREEN_WIDTH * 0.8 - 60);
  const [opacityResponder, setOpacityResponder] = useState({});

  useEffect(() => {
    setOpacityResponder(
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: (_, gestureState) => {
          positionRef.current += gestureState.dx;

          opacityPan.setOffset(positionRef.current);
        },
        onPanResponderMove: Animated.event([null, { dx: opacityPan }], {
          useNativeDriver: false,
        }),
        onPanResponderRelease: (_, gestureState) => {
          positionRef.current += gestureState.dx;
          calculateOpacity();
        },
      }),
    );
  }, [opacityPan]);

  return (
    <Modal visible={isColorPickerVisible} animationType="slide">
      <ScrollView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <AppHeader>
              <View style={styles.leftHeader}>
                <Ionicons
                  name="ios-chevron-back-sharp"
                  size={25}
                  color={SUB_GRAY_COLOR}
                />
                <TouchableOpacity
                  onPress={() => dispatch(handleColorModalVisible(false))}
                >
                  <Text style={{ color: SUB_GRAY_COLOR }}>뒤로 가기</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.title}>
                <Text style={{ fontSize: 20, color: SUB_GRAY_COLOR }}>
                  Colors
                </Text>
              </View>
              <TouchableOpacity onPress={updateColor} style={styles.colorPick}>
                <MaterialIcons name="colorize" size={30} color={ACTIVE_COLOR} />
              </TouchableOpacity>
            </AppHeader>
            <View style={styles.gridText}>
              <Text style={{ fontSize: 26 }}>Grid</Text>
            </View>
            <View style={styles.colorTable}>
              {colorsArray.map((color) => (
                <TouchableOpacity
                  key={color}
                  onPress={() => setSelectedColor(color)}
                  style={{
                    ...styles.colors,
                    backgroundColor: color,
                    borderWidth: selectedColor === color ? 2 : 0,
                    borderColor: selectedColor === color ? WHITE_COLOR : null,
                  }}
                />
              ))}
            </View>
            <View style={styles.opacity}>
              <Text style={{ fontSize: 18, color: UNACTIVE_COLOR }}>
                OPACITY
              </Text>
              <LinearGradient
                colors={[
                  hslToHsla(selectedColor, 0),
                  hslToHsla(selectedColor, 1),
                ]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.opacityHandlerContainer}
              >
                <Animated.View
                  style={{
                    ...styles.opacityScrollHandler,
                    left: opacityPan,
                  }}
                  {...opacityResponder.panHandlers}
                />
              </LinearGradient>
            </View>
            <View style={styles.border} />
            <View style={styles.bottom}>
              <View
                style={{
                  ...styles.selectedColor,
                  backgroundColor:
                    selectedMode === STROKE
                      ? WHITE_COLOR
                      : hslToHsla(selectedColor, selectedColorOpacity),
                  borderColor:
                    selectedMode === STROKE
                      ? hslToHsla(selectedColor, selectedColorOpacity)
                      : null,
                }}
              />
              {activeEditor === SHAPE &&
              shapeElements[selectedShapeIndex]?.type !== ICON ? (
                <View style={styles.bottomRightContainer}>
                  <TouchableOpacity
                    onPress={() => setSelectedMode(FILL)}
                    style={{
                      ...styles.fill,
                      backgroundColor:
                        selectedMode === FILL ? ACTIVE_COLOR : WHITE_COLOR,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 24,
                        color:
                          selectedMode === FILL ? WHITE_COLOR : UNACTIVE_COLOR,
                      }}
                    >
                      Fill
                    </Text>
                  </TouchableOpacity>
                  <View style={styles.strokeContainer}>
                    <TouchableOpacity
                      onPress={() => setSelectedMode(STROKE)}
                      style={{
                        ...styles.fill,
                        backgroundColor:
                          selectedMode === STROKE ? ACTIVE_COLOR : WHITE_COLOR,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 24,
                          color:
                            selectedMode === STROKE
                              ? WHITE_COLOR
                              : UNACTIVE_COLOR,
                        }}
                      >
                        Stroke
                      </Text>
                    </TouchableOpacity>
                    <TextInput
                      placeholder="Stroke Width"
                      value={typedNumber}
                      onChangeText={(value) => setTypedNumber(value)}
                      keyboardType="numeric"
                      editable={selectedMode !== FILL}
                      style={{
                        paddingHorizontal: 5,
                        width: 100,
                        borderWidth: 2,
                        borderRadius: 10,
                      }}
                    />
                  </View>
                </View>
              ) : (
                <Text style={{ fontSize: 20 }}>The color you selected</Text>
              )}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
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
  colorPick: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  gridText: {
    justifyContent: "center",
    alignItems: "center",
    width: SCREEN_WIDTH * 0.8,
    height: SCREEN_HEIGHT * 0.05,
    marginVertical: 30,
    backgroundColor: WHITE_COLOR,
    borderWidth: 1,
    borderRadius: 20,
  },
  colorTable: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
    width: SCREEN_WIDTH * 0.8,
    height: SCREEN_HEIGHT * 0.4,
  },
  colors: {
    width: 28,
    height: 28,
    backgroundColor: WHITE_COLOR,
  },
  opacity: {
    width: SCREEN_WIDTH * 0.8,
    gap: 10,
  },
  opacityHandlerContainer: {
    width: SCREEN_WIDTH * 0.8,
    height: 60,
    borderRadius: 30,
    borderWidth: 0.2,
  },
  opacityScrollHandler: {
    position: "absolute",
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: WHITE_COLOR,
    left: SCREEN_WIDTH * 0.8 - 60,
  },
  border: {
    width: SCREEN_WIDTH * 0.8,
    marginVertical: 30,
    borderWidth: 1,
    borderColor: UNACTIVE_COLOR,
  },
  bottom: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: SCREEN_WIDTH * 0.8,
  },
  selectedColor: {
    width: 75,
    height: 75,
    borderWidth: 2,
    borderRadius: 15,
    borderColor: UNACTIVE_COLOR,
  },
  bottomRightContainer: {
    justifyContent: "space-evenly",
    alignItems: "center",
    height: 90,
  },
  fill: {
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: 30,
    borderWidth: 2,
    borderRadius: 25,
    borderColor: UNACTIVE_COLOR,
  },
  strokeContainer: {
    justifyContent: "center",
    flexDirection: "row",
    width: 200,
    gap: 10,
  },
});
