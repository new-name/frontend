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

  const onSaveGifAsync = async (longestLottieRef, duration, fps = 30) => {
    try {
      const frames = [];
      const frameCount = Math.round(duration * fps);

      for (let i = 0; i < frameCount; i++) {
        const progress = i / frameCount;
        longestLottieRef.play(0, progress);

        const frame = await captureRef(imageRef, {
          format: "png",
          quality: 1.0,
          height: CONTAINER_HEIGHT,
        });

        const buffer = await FileSystem.readAsStringAsync(frame, {
          encoding: FileSystem.EncodingType.Base64,
        });

        frames.push(buffer);
      }

      const chunkSize = 10;
      for (let i = 0; i < frames.length; i += chunkSize) {
        const chunk = frames.slice(i, i + chunkSize);
        await api.sendFramesChunk({
          frames: chunk,
          width: CONTAINER_WIDTH,
          height: CONTAINER_HEIGHT,
        });
      }

      const response = await api.makeGifFromLottie({
        fps,
        width: CONTAINER_WIDTH,
        height: CONTAINER_HEIGHT,
      });

      if (!response) {
        alert("Failed to create GIF.");
        return;
      }

      const base64Gif = `data:image/gif;base64,${response}`;

      await MediaLibrary.saveToLibraryAsync(base64Gif);

      if (base64Gif) {
        alert("Succefully Saved!");
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
      onSaveGifAsync(longestLottieRef.ref, longestLottieRef.duration);
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
