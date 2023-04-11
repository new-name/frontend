import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";

import TextEditor from "./TextEditor";
import { CONTENT } from "../constants/color";
import { editorFooter } from "../constants/footerItems";
import AppFooter from "../layout/AppFooter";
import AppHeader from "../layout/AppHeader";
import ContentBox from "../layout/ContentBox";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const appFooterHeight = screenHeight / 12;

export default function Editor() {
  const [isTextEditable, setIsTextEditalbe] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState("");
  const [selectedTextSize, setSelectedTextSize] = useState(0);
  const [selectedElement, setSelectedElement] = useState(null);
  const [textElements, setTextElements] = useState([
    { text: "User", size: 16 },
    { text: "User영", size: 16 },
    { text: "User빈", size: 16 },
  ]);

  const handleEditor = (name) => {
    if (name === "Text") {
      setIsTextEditalbe(!isTextEditable);
    }
  };

  const handleSelectText = (index) => {
    setSelectedElement(index);
  };

  const addTextElement = (text) => {
    setTextElements([...textElements, { text, size: 16 }]);
  };

  const removeTextElement = (index) => {
    setTextElements(textElements.filter((_, i) => i !== index));
  };

  useEffect(() => {
    if (
      selectedProperty === "Size" &&
      selectedElement !== null &&
      selectedTextSize !== 0
    ) {
      const updatedTextElements = textElements.map((element, index) => {
        if (index === selectedElement) {
          return { ...element, size: selectedTextSize };
        }
        return element;
      });

      setTextElements(updatedTextElements);
    }
  }, [selectedElement, selectedTextSize]);

  return (
    <View style={styles.container}>
      <AppHeader>
        <View style={styles.header}>
          <Ionicons name="ios-chevron-back-sharp" size={25} color="gray" />
          <Text>뒤로 가기</Text>
        </View>
        <View style={styles.undo}>
          <MaterialCommunityIcons name="undo" size={30} color="gray" />
          <MaterialCommunityIcons name="redo" size={30} color="gray" />
        </View>
        <View style={styles.download}>
          <Ionicons name="ios-download-outline" size={30} color="gray" />
          <Ionicons name="ios-share-outline" size={30} color="gray" />
        </View>
      </AppHeader>
      <ContentBox>
        <View style={styles.contentContainer}>
          {textElements.map((element, index) => (
            <TouchableOpacity
              key={index}
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
      {isTextEditable && (
        <View style={styles.textEditorContainer}>
          <TextEditor
            setSelectedTextSize={setSelectedTextSize}
            setSelectedProperty={setSelectedProperty}
            selectedProperty={selectedProperty}
          />
        </View>
      )}
      <AppFooter>
        <View style={styles.footer}>
          {editorFooter.map((item) => (
            <TouchableOpacity
              onPress={() => handleEditor(item.text)}
              key={item.iconName}
              style={styles.iconWithText}
            >
              <Ionicons name={item.iconName} size={30} color="gray" />
              <Text style={styles.iconText}>{item.text}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </AppFooter>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: CONTENT,
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
    width: screenWidth * 0.9,
    height: "95%",
    borderWidth: 1,
  },
  textEditorContainer: {
    position: "absolute",
    zIndex: 2,
    height: appFooterHeight,
    bottom: appFooterHeight + appFooterHeight * 0.35,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: screenWidth,
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
});
