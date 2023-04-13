import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";

import GifEditor from "../components/GifEditor";
import ImageEditor from "../components/ImageEditor";
import ShapeEditor from "../components/ShapeEditor";
import TextEditor from "../components/TextEditor";
import {
  ACTIVE_COLOR,
  CONTENT_COLOR,
  UNACTIVE_COLOR,
} from "../constants/color";
import { editorFooter } from "../constants/footerItems";
import {
  APP_FOOTER_HEIGHT,
  CONTAINER_WIDTH,
  SCREEN_WIDTH,
} from "../constants/size";
import api from "../features/api";
import AppFooter from "../layout/AppFooter";
import AppHeader from "../layout/AppHeader";
import ContentBox from "../layout/ContentBox";

export default function Editor({ navigation }) {
  const { navigate } = navigation;
  const [selectedController, setSelectedController] = useState("");
  const [isTextEditable, setIsTextEditalbe] = useState(false);
  const [isGifGettable, setIsGifGettable] = useState(false);
  const [isImageEditable, setIsImageEditable] = useState(false);
  const [isShapeEditable, setIsShapeEditable] = useState(false);

  const [selectedTextProperty, setSelectedTextProperty] = useState("");
  const [selectedTextSize, setSelectedTextSize] = useState(0);
  const [selectedTextElement, setSelectedTextElement] = useState(null);
  const [gifURLs, setGifURLs] = useState([]);
  const [textElements, setTextElements] = useState([
    { text: "GIF", size: 16 },
    { text: "ASSETS", size: 16 },
    { text: "IMAGES", size: 16 },
  ]);

  const handleSelectedProperty = (name) => {
    if (selectedController !== name) {
      setSelectedController(name);
    }

    if (selectedController === name) {
      setSelectedController("");
    }

    if (name === "Shape") {
      setIsGifGettable(false);
      setIsTextEditalbe(false);
      setIsImageEditable(false);
      setIsShapeEditable(!isShapeEditable);
    }

    if (name === "Text") {
      setIsGifGettable(false);
      setIsImageEditable(false);
      setIsTextEditalbe(!isTextEditable);
    }

    if (name === "Image") {
      setIsGifGettable(false);
      setIsTextEditalbe(false);
      setIsImageEditable(!isImageEditable);
    }

    if (name === "Gif") {
      setIsTextEditalbe(false);
      setIsImageEditable(false);
      getGifs();
    }
  };

  const getGifs = async () => {
    try {
      const response = await api.getGifs();

      if (response.status === 200) {
        setGifURLs(response.data.gifURLs);
        setIsGifGettable(!isGifGettable);
      }
    } catch {
      Alert.alert("Cannot get Gifs from server");
    }
  };

  const handleSelectText = (index) => {
    setSelectedTextElement(index);
  };

  const addTextElement = (text) => {
    setTextElements([...textElements, { text, size: 16 }]);
  };

  const removeTextElement = (index) => {
    setTextElements(textElements.filter((_, i) => i !== index));
  };

  useEffect(() => {
    if (selectedTextProperty === "Size" && selectedTextElement !== null) {
      const updatedTextElements = textElements.map((element, index) => {
        if (index === selectedTextElement) {
          return { ...element, size: selectedTextSize };
        }
        return element;
      });

      setTextElements(updatedTextElements);
    }
  }, [selectedTextElement, selectedTextSize]);

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
          {textElements.map((element, index) => (
            <TouchableOpacity
              key={element + index}
              onPress={() => handleSelectText(index)}
            >
              <Text
                style={{
                  fontSize: element.size,
                }}
              >
                {element.text}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ContentBox>
      {isShapeEditable && (
        <View style={styles.gifEditorContainer}>
          <ShapeEditor />
        </View>
      )}
      {isTextEditable && (
        <View style={styles.editorContainer}>
          <TextEditor
            setSelectedTextSize={setSelectedTextSize}
            setSelectedProperty={setSelectedTextProperty}
            selectedProperty={selectedTextProperty}
          />
        </View>
      )}
      {isGifGettable && (
        <View style={styles.gifEditorContainer}>
          <GifEditor gifURLs={gifURLs} />
        </View>
      )}
      {isImageEditable && (
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
                  selectedController === item.text
                    ? ACTIVE_COLOR
                    : UNACTIVE_COLOR
                }
              />
              <Text
                style={{
                  ...styles.iconText,
                  color:
                    selectedController === item.text
                      ? ACTIVE_COLOR
                      : UNACTIVE_COLOR,
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
