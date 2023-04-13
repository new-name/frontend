import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import PropTypes from "prop-types";
import { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Animated,
  PanResponder,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import GifEditor from "../components/editors/GifEditor";
import ImageEditor from "../components/editors/ImageEditor";
import ShapeEditor from "../components/editors/ShapeEditor";
import TextEditor from "../components/editors/TextEditor";
import {
  ACTIVE_COLOR,
  CONTENT_COLOR,
  UNACTIVE_COLOR,
} from "../constants/color";
import { editorFooter } from "../constants/footerItems";
import {
  GIF,
  IMAGE,
  SHAPE,
  TEXT,
  TEXT_MOVE,
  TEXT_SIZE,
} from "../constants/property";
import {
  APP_FOOTER_HEIGHT,
  CONTAINER_WIDTH,
  SCREEN_WIDTH,
} from "../constants/size";
import api from "../features/api";
import { getGifURL } from "../features/reducers/gifSlice";
import {
  changeTextElements,
  selectTextIndex,
  updateTextPosition,
} from "../features/reducers/textSlice";
import AppFooter from "../layout/AppFooter";
import AppHeader from "../layout/AppHeader";
import ContentBox from "../layout/ContentBox";

export default function Editor({ navigation }) {
  const { navigate } = navigation;
  const dispatch = useDispatch();
  const [activeEditor, setActiveEditor] = useState("");
  const [moveResponder, setMoveResponder] = useState({});
  const selectedTextProperty = useSelector(
    (state) => state.textReducer.textProperties.selectedProperty,
  );
  const selectedTextIndex = useSelector(
    (state) => state.textReducer.textProperties.selectedIndex,
  );
  const selectedTextSize = useSelector(
    (state) => state.textReducer.textProperties.selectedSize,
  );
  const textElements = useSelector((state) => state.textReducer.elements);

  const selectedIndexRef = useRef(null);
  const positionRef = useRef({ x: 0, y: 0 });

  const handleSelectedProperty = (name) => {
    setActiveEditor((prevState) => (prevState === name ? "" : name));

    if (name === GIF) {
      getGifs();
    }
  };

  const getGifs = async () => {
    try {
      const gifURLs = await api.getGifs();

      dispatch(getGifURL(gifURLs));
    } catch {
      Alert.alert("Cannot get Gifs from server");
    }
  };

  const handleSelectText = (index) => {
    selectedIndexRef.current = index;
    dispatch(selectTextIndex(index));
  };

  const movePan = useRef(new Animated.ValueXY()).current;
  useEffect(() => {
    setMoveResponder(
      PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: (_, gestureState) => {
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
        onPanResponderRelease: ({ nativeEvent }, gestureState) => {
          if (selectedIndexRef.current === null) return;

          positionRef.current = {
            x: positionRef.current.x + gestureState.dx,
            y: positionRef.current.y + gestureState.dy,
          };

          dispatch(
            updateTextPosition({
              index: selectedIndexRef.current,
              x: positionRef.current.x,
              y: positionRef.current.y,
            }),
          );

          movePan.setValue({ x: 0, y: 0 });
        },
      }),
    );
  }, [movePan.x, movePan.y]);

  const renderTextElement = (element, index) => {
    const isSelected = index === selectedTextIndex;

    const positionStyle = {
      left: element[index].x,
      top: element[index].y,
    };

    const textElement = (
      <Text style={{ fontSize: element[index].size }}>
        {element[index].text}
      </Text>
    );

    if (isSelected && selectedTextProperty === TEXT_MOVE) {
      return (
        <Animated.View
          key={element[index].text + index}
          onPress={() => handleSelectText(index)}
          style={[
            positionStyle,
            {
              transform: [{ translateX: movePan.x }, { translateY: movePan.y }],
            },
          ]}
          {...moveResponder.panHandlers}
        >
          {textElement}
        </Animated.View>
      );
    }

    return (
      <TouchableOpacity
        key={element[index].text + index}
        onPress={() => handleSelectText(index)}
        style={[{ position: "absolute" }, positionStyle]}
      >
        {textElement}
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    if (selectedTextProperty === TEXT_SIZE && selectedTextIndex !== null) {
      const updatedTextElements = Object.keys(textElements).map(
        (element, index) => {
          if (index === selectedTextIndex) {
            return { ...textElements[element], size: selectedTextSize };
          }
          return textElements[element];
        },
      );

      dispatch(changeTextElements(updatedTextElements));
    }
  }, [selectedTextIndex, selectedTextSize]);

  return (
    <View style={styles.container}>
      <AppHeader>
        <View style={styles.header}>
          <Ionicons
            name="ios-chevron-back-sharp"
            size={25}
            color={UNACTIVE_COLOR}
          />
          <TouchableOpacity onPress={() => navigate("Home")}>
            <Text>뒤로 가기</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.undo}>
          <MaterialCommunityIcons
            name="undo"
            size={30}
            color={UNACTIVE_COLOR}
          />
          <MaterialCommunityIcons
            name="redo"
            size={30}
            color={UNACTIVE_COLOR}
          />
        </View>
        <View style={styles.download}>
          <Ionicons
            name="ios-download-outline"
            size={30}
            color={UNACTIVE_COLOR}
          />
          <Ionicons name="ios-share-outline" size={30} color={UNACTIVE_COLOR} />
        </View>
      </AppHeader>
      <ContentBox>
        <View style={styles.contentContainer}>
          {Object.keys(textElements).map((element, index) =>
            renderTextElement(textElements, index),
          )}
        </View>
      </ContentBox>
      {activeEditor === SHAPE && (
        <View style={styles.gifEditorContainer}>
          <ShapeEditor />
        </View>
      )}
      {activeEditor === TEXT && (
        <View style={styles.editorContainer}>
          <TextEditor />
        </View>
      )}
      {activeEditor === GIF && (
        <View style={styles.gifEditorContainer}>
          <GifEditor />
        </View>
      )}
      {activeEditor === IMAGE && (
        <View style={styles.gifEditorContainer}>
          <ImageEditor />
        </View>
      )}
      <AppFooter>
        <View style={styles.footer}>
          {editorFooter.map((item) => (
            <TouchableOpacity
              onPress={() => handleSelectedProperty(item.text)}
              key={item.iconName}
              style={styles.iconWithText}
            >
              <Ionicons
                name={item.iconName}
                size={30}
                color={
                  activeEditor === item.text ? ACTIVE_COLOR : UNACTIVE_COLOR
                }
              />
              <Text
                style={{
                  ...styles.iconText,
                  color:
                    activeEditor === item.text ? ACTIVE_COLOR : UNACTIVE_COLOR,
                }}
              >
                {item.text}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </AppFooter>
      <StatusBar style="auto" />
    </View>
  );
}

Editor.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: CONTENT_COLOR,
  },
  header: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  undo: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },
  download: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
  },
  contentContainer: {
    width: CONTAINER_WIDTH,
    height: "95%",
    borderWidth: 1,
  },
  editorContainer: {
    position: "absolute",
    zIndex: 2,
    height: APP_FOOTER_HEIGHT,
    bottom: APP_FOOTER_HEIGHT + APP_FOOTER_HEIGHT * 0.35,
  },
  gifEditorContainer: {
    position: "absolute",
    zIndex: 2,
    bottom: APP_FOOTER_HEIGHT + APP_FOOTER_HEIGHT * 0.35,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: SCREEN_WIDTH,
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
