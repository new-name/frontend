import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import PropTypes from "prop-types";
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import { UNACTIVE_COLOR } from "../constants/color";

export default function EditorHeader() {
  const navigation = useNavigation();

  return (
    <>
      <View style={styles.header}>
        <Ionicons
          name="ios-chevron-back-sharp"
          size={25}
          color={UNACTIVE_COLOR}
        />
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Text>뒤로 가기</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.undo}>
        <MaterialCommunityIcons name="undo" size={30} color={UNACTIVE_COLOR} />
        <MaterialCommunityIcons name="redo" size={30} color={UNACTIVE_COLOR} />
      </View>
      <View style={styles.download}>
        <Ionicons
          name="ios-download-outline"
          size={30}
          color={UNACTIVE_COLOR}
        />
        <Ionicons name="ios-share-outline" size={30} color={UNACTIVE_COLOR} />
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
