import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useRef, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import ViewShot, { captureRef } from "react-native-view-shot";
import { useSelector } from "react-redux";

import EditorRenderer from "../components/EditorRenderer";
import GifElements from "../components/elements/GifElements";
import ImageElements from "../components/elements/ImageElements";
import ShapeElements from "../components/elements/ShapeElements";
import TextElements from "../components/elements/TextElements";
import ColorModal from "../components/modals/ColorModal";
import FontModal from "../components/modals/FontModal";
import GifModal from "../components/modals/GifModal";
import IconModal from "../components/modals/IconModal";
import ImageModal from "../components/modals/ImageModal";
import LayerModal from "../components/modals/LayerModal";
import { UNACTIVE_COLOR, WHITE_COLOR } from "../constants/color";
import { GIF } from "../constants/property";
import {
  CONTAINER_HEIGHT,
  CONTAINER_WIDTH,
  SCROLL_CONTAINER_HEIGHT,
} from "../constants/size";
import api from "../features/api";
import AppFooter from "../layout/AppFooter";
import AppHeader from "../layout/AppHeader";
import ContentBox from "../layout/ContentBox";
import EditorFooter from "../layout/EditorFooter";
import EditorHeader from "../layout/EditorHeader";

export default function Editor() {
  const imageRef = useRef();
  const [isLayoutReady, setIsLayoutReady] = useState(false);
  const [longestLottieRef, setLongestLottieRef] = useState({
    ref: null,
    duration: 0,
  });
  const captureFlag = useSelector(
    (state) => state.editorReducer.shouldSaveInEditor,
  );
  const activeEditor = useSelector(
    (state) => state.editorReducer.selectedProperty,
  );
  const allElements = useSelector((state) => state.editorReducer.allElements);

  const hasGifTypeInElements = Object.keys(allElements)
    .map((element) => allElements[element])
    .some((el) => el.type === GIF);

  const [status, requestPermission] = MediaLibrary.usePermissions();

  if (status === null) {
    requestPermission();
  }

  const updateLongestLottieRef = useCallback((newRef) => {
    setLongestLottieRef(newRef);
  }, []);

  const onSaveImageAsync = async () => {
    try {
      const localUri = await captureRef(imageRef, {
        format: "png",
        quality: 1.0,
        height: CONTAINER_HEIGHT,
      });

      await MediaLibrary.saveToLibraryAsync(localUri);
      if (localUri) {
        alert("Succefully Saved!");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onSaveGifAsync = async (duration, fps = 60) => {
    try {
      const frames = [];
      const encodedFrames = [];
      const frameCount = Math.round(duration * fps);

      for (let i = 0; i < frameCount; i++) {
        const frame = await captureRef(imageRef, {
          format: "png",
          quality: 1.0,
        });

        frames.push(frame);
      }

      for (const frame of frames) {
        const base64Data = await FileSystem.readAsStringAsync(frame, {
          encoding: FileSystem.EncodingType.Base64,
        });
        encodedFrames.push(`data:image/png;base64,${base64Data}`);
      }

      const response = await api.createGif({
        encodedFrames,
        fps,
        height: CONTAINER_HEIGHT,
        width: CONTAINER_WIDTH,
      });

      const base64Gif = response.data.base64Gif;

      const tempFilePath = FileSystem.documentDirectory + "temp.gif";
      await FileSystem.writeAsStringAsync(tempFilePath, base64Gif, {
        encoding: FileSystem.EncodingType.Base64,
      });

      await MediaLibrary.createAssetAsync(tempFilePath);
      await FileSystem.deleteAsync(tempFilePath, { idempotent: true });

      if (base64Gif) {
        alert("Successfully Saved!");
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (captureFlag && isLayoutReady && !hasGifTypeInElements) {
      onSaveImageAsync();
    }

    if (captureFlag && isLayoutReady && hasGifTypeInElements) {
      onSaveGifAsync(longestLottieRef.duration);
    }
  }, [captureFlag, isLayoutReady]);

  return (
    <View style={styles.container}>
      <AppHeader>
        <EditorHeader />
      </AppHeader>
      <ScrollView
        scrollEnabled={!activeEditor}
        contentContainerStyle={styles.scrollContainer}
      >
        <ContentBox>
          <ViewShot
            style={{ width: CONTAINER_WIDTH, height: CONTAINER_HEIGHT }}
            ref={imageRef}
            collapsable={false}
            onLayout={() => setIsLayoutReady(true)}
          >
            <View style={styles.contentContainer}>
              <TextElements />
              <ImageElements />
              <GifElements updateLongestLottieRef={updateLongestLottieRef} />
              <ShapeElements />
            </View>
          </ViewShot>
          <LayerModal />
          <ImageModal />
          <GifModal />
          <FontModal />
          <ColorModal />
          <IconModal />
        </ContentBox>
      </ScrollView>
      <EditorRenderer />
      <AppFooter>
        <EditorFooter />
      </AppFooter>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  scrollContainer: {
    height: SCROLL_CONTAINER_HEIGHT,
    justifyContent: "center",
    backgroundColor: UNACTIVE_COLOR,
  },
  contentContainer: {
    width: CONTAINER_WIDTH,
    height: CONTAINER_HEIGHT,
    borderWidth: 1,
    backgroundColor: WHITE_COLOR,
    zIndex: -1,
  },
});
