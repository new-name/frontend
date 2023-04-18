import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import { UNACTIVE_COLOR } from "../constants/color";

export default function EditorHeader() {
  const navigation = useNavigation();

  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Ionicons
            name="ios-chevron-back-sharp"
            size={25}
            color={UNACTIVE_COLOR}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Text>뒤로 가기</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.undo}>
        <TouchableOpacity>
          <MaterialCommunityIcons
            name="undo"
            size={30}
            color={UNACTIVE_COLOR}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialCommunityIcons
            name="redo"
            size={30}
            color={UNACTIVE_COLOR}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.download}>
        <TouchableOpacity onPress={() => console.log("save")}>
          <Ionicons
            name="ios-download-outline"
            size={30}
            color={UNACTIVE_COLOR}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log("upload")}>
          <Ionicons name="ios-share-outline" size={30} color={UNACTIVE_COLOR} />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
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
});
