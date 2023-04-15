import PropTypes from "prop-types";
import React from "react";
import { StyleSheet, View } from "react-native";

import GifEditor from "../components/editors/GifEditor";
import ImageEditor from "../components/editors/ImageEditor";
import ShapeEditor from "../components/editors/ShapeEditor";
import TextEditor from "../components/editors/TextEditor";
import { GIF, IMAGE, SHAPE, TEXT } from "../constants/property";
import { APP_FOOTER_HEIGHT } from "../constants/size";

export default function EditorRenderer({ activeEditor }) {
  if (activeEditor === SHAPE) {
    return (
      <View style={styles.imageEditorContainer}>
        <ShapeEditor />
      </View>
    );
  }
  if (activeEditor === TEXT) {
    return (
      <View style={styles.editorContainer}>
        <TextEditor />
      </View>
    );
  }
  if (activeEditor === GIF) {
    return (
      <View style={styles.imageEditorContainer}>
        <GifEditor />
      </View>
    );
  }
  if (activeEditor === IMAGE) {
    return (
      <View style={styles.imageEditorContainer}>
        <ImageEditor />
      </View>
    );
  }

  return null;
}

EditorRenderer.propTypes = {
  activeEditor: PropTypes.string,
};

const styles = StyleSheet.create({
  editorContainer: {
    position: "absolute",
    zIndex: 2,
    height: APP_FOOTER_HEIGHT,
    bottom: APP_FOOTER_HEIGHT + APP_FOOTER_HEIGHT * 0.35,
  },
  imageEditorContainer: {
    position: "absolute",
    zIndex: 2,
    bottom: APP_FOOTER_HEIGHT + APP_FOOTER_HEIGHT * 0.35,
  },
});
