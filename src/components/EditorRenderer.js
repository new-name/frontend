import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import GifEditor from "../components/editors/GifEditor";
import ImageEditor from "../components/editors/ImageEditor";
import ShapeEditor from "../components/editors/ShapeEditor";
import TextEditor from "../components/editors/TextEditor";
import { GIF, IMAGE, LAYER, SHAPE, TEXT } from "../constants/property";
import { APP_FOOTER_HEIGHT } from "../constants/size";
import {
  handleLayerModalVisible,
  updateAllElements,
} from "../features/reducers/editorSlice";

export default function EditorRenderer() {
  const dispatch = useDispatch();
  const activeEditor = useSelector(
    (state) => state.editorReducer.selectedProperty,
  );

  const shapeElements = useSelector((state) => state.shapeReducer.elements);
  const gifElements = useSelector((state) => state.gifReducer.elements);
  const imageElements = useSelector((state) => state.imageReducer.elements);
  const textElements = useSelector((state) => state.textReducer.elements);

  useEffect(() => {
    dispatch(updateAllElements(textElements));
  }, [textElements]);

  useEffect(() => {
    dispatch(updateAllElements(gifElements));
  }, [gifElements]);

  useEffect(() => {
    dispatch(updateAllElements(imageElements));
  }, [imageElements]);

  useEffect(() => {
    dispatch(updateAllElements(shapeElements));
  }, [shapeElements]);

  useEffect(() => {
    if (activeEditor === LAYER) {
      dispatch(handleLayerModalVisible(true));
    }
  }, [activeEditor]);

  const renderEditor = () => {
    switch (activeEditor) {
      case SHAPE:
        return (
          <View style={styles.imageEditorContainer}>
            <ShapeEditor />
          </View>
        );
      case TEXT:
        return (
          <View style={styles.editorContainer}>
            <TextEditor />
          </View>
        );
      case GIF:
        return (
          <View style={styles.imageEditorContainer}>
            <GifEditor />
          </View>
        );
      case IMAGE:
        return (
          <View style={styles.imageEditorContainer}>
            <ImageEditor />
          </View>
        );
      default:
        return null;
    }
  };

  return renderEditor();
}

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
