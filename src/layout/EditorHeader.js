import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import PropTypes from "prop-types";
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { UNACTIVE_COLOR } from "../constants/color";
import api from "../features/api";
import { handleSaveInEditor } from "../features/reducers/editorSlice";
import { handleSaveImageFile } from "../utils/handleSaveImage";

export default function EditorHeader({ imageRef }) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const allElements = useSelector((state) => state.editorReducer.allElements);

  const handleSaveFile = () => {
    dispatch(handleSaveInEditor({ saveValue: true }));
  };

  const handleSaveProject = async () => {
    const isValid = Object.keys(allElements).length;

    if (!isValid) {
      return Alert.alert("저장할 컨텐츠가 없습니다.");
    }

    const base64 = await handleSaveImageFile(imageRef, false);

    const response = await api.postProjects({
      allElements,
      thumbnail: base64,
    });

    if (response.status === 201) {
      Alert.alert("Succefully Saved!");
      navigation.navigate("Home");
    }
  };

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
        <TouchableOpacity onPress={handleSaveProject}>
          <Text>프로젝트 저장</Text>
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
        <TouchableOpacity onPress={handleSaveFile}>
          <Text>내려 받기</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSaveFile}>
          <Ionicons
            name="ios-download-outline"
            size={30}
            color={UNACTIVE_COLOR}
          />
        </TouchableOpacity>
      </View>
    </>
  );
}

EditorHeader.propTypes = {
  imageRef: PropTypes.object.isRequired,
};

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
    alignItems: "center",
    gap: 10,
  },
});
