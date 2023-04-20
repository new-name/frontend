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
  updateNewElements,
} from "../features/reducers/editorSlice";
import { updateAllGifs } from "../features/reducers/gifSlice";
import { updateAllImages } from "../features/reducers/imageSlice";
import { updateAllShapes } from "../features/reducers/shapeSlice";
import { updateAllTexts } from "../features/reducers/textSlice";

export default function EditorRenderer() {
  const dispatch = useDispatch();
  const activeEditor = useSelector(
    (state) => state.editorReducer.selectedProperty,
  );

  const shapeElements = useSelector((state) => state.shapeReducer.elements);
  const gifElements = useSelector((state) => state.gifReducer.elements);
  const imageElements = useSelector((state) => state.imageReducer.elements);
  const textElements = useSelector((state) => state.textReducer.elements);

  const layerElements = useSelector(
    (state) => state.editorReducer.layerElements,
  );

  useEffect(() => {
    const updatedElements = Object.keys(layerElements)
      .sort((a, b) => layerElements[a].zIndex - layerElements[b].zIndex)
      .map((key) => layerElements[key]);

    const shapes = [];
    const texts = [];
    const gifs = [];
    const images = [];

    updatedElements.forEach((element) => {
      switch (element.type) {
        case SHAPE:
          shapes.push(element);
          break;
        case TEXT:
          texts.push(element);
          break;
        case GIF:
          gifs.push(element);
          break;
        case IMAGE:
          images.push(element);
          break;
        default:
          break;
      }
    });

    if (shapes.length > 0) {
      dispatch(updateAllShapes(shapes));
    }

    if (texts.length > 0) {
      dispatch(updateAllTexts(texts));
    }

    if (gifs.length > 0) {
      dispatch(updateAllGifs(gifs));
    }

    if (images.length > 0) {
      dispatch(updateAllImages(images));
    }
  }, [layerElements]);

  useEffect(() => {
    dispatch(updateNewElements(textElements));
  }, [textElements]);

  useEffect(() => {
    dispatch(updateNewElements(gifElements));
  }, [gifElements]);

  useEffect(() => {
    dispatch(updateNewElements(imageElements));
  }, [imageElements]);

  useEffect(() => {
    dispatch(updateNewElements(shapeElements));
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
          <View style={styles.editorContainer}>
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
          <View style={styles.editorContainer}>
            <GifEditor />
          </View>
        );
      case IMAGE:
        return (
          <View style={styles.editorContainer}>
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
    zIndex: 20,
    bottom: APP_FOOTER_HEIGHT * 1.25,
  },
});
