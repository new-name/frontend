import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";

import { EDITOR_COLOR } from "../constants/color";
import { textEditor } from "../constants/footerItems";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const appFooterHeight = screenHeight / 12;

export default function TextEditor() {
  const [isEditable, setIsEditable] = useState(false);
  const [selected, setSelected] = useState("");

  const handleEditor = (name) => {
    setIsEditable(!isEditable);
    setSelected(name);
  };

  return (
    <View style={styles.container}>
      {selected === "Size" && (
        <View style={styles.size}>
          <Text>Hi</Text>
        </View>
      )}
      {textEditor.map((item) => (
        <TouchableOpacity
          onPress={() => handleEditor(item.text)}
          key={item.iconName}
          style={styles.iconWithText}
        >
          {item.icon === "FontAwesome" && (
            <FontAwesome name={item.iconName} size={30} color="gray" />
          )}
          {item.icon === "MaterialIcons" && (
            <MaterialIcons name={item.iconName} size={30} color="gray" />
          )}
          <Text style={styles.iconText}>{item.text}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: screenWidth,
    height: appFooterHeight,
    backgroundColor: EDITOR_COLOR,
    shadowColor: "#000",
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
    color: "gray",
  },
  size: {
    position: "absolute",
    bottom: screenHeight / 2,
    left: 20,
  },
});
