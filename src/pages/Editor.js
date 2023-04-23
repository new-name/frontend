import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import { StatusBar } from "expo-status-bar";
import Lottie from "lottie-react-native";
import { useCallback, useEffect, useRef, useState } from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import ViewShot, { captureRef } from "react-native-view-shot";
import { useDispatch, useSelector } from "react-redux";

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
import {
  EDITOR_COLOR,
  LOADING_COLOR,
  UNACTIVE_COLOR,
  WHITE_COLOR,
} from "../constants/color";
import { CHECKBOX, FILE_SAVE, GIF } from "../constants/property";
import {
  CONTAINER_HEIGHT,
  CONTAINER_WIDTH,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  SCROLL_CONTAINER_HEIGHT,
} from "../constants/size";
import api from "../features/api";
import { handleSaveInEditor } from "../features/reducers/editorSlice";
import AppFooter from "../layout/AppFooter";
import AppHeader from "../layout/AppHeader";
import ContentBox from "../layout/ContentBox";
import EditorFooter from "../layout/EditorFooter";
import EditorHeader from "../layout/EditorHeader";

export default function Editor() {
  const dispatch = useDispatch();
  const imageRef = useRef();
  const [showLoadingGif, setShowLoadingGif] = useState(false);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  const [isLayoutReady, setIsLayoutReady] = useState(false);
  const [longestLottieRef, setLongestLottieRef] = useState({
    ref: null,
    duration: 0,
  });
  const animationRefs = useRef({ loading: {}, success: {} });
  const [loadingSource, setLoadingSource] = useState({
    loading: {},
    success: {},
  });
  const captureFlag = useSelector(
    (state) => state.editorReducer.shouldSaveInEditor,
  );
  const activeEditor = useSelector(
    (state) => state.editorReducer.selectedProperty,
  );
  const loadingGif = useSelector((state) => state.editorReducer.loading);
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

  const showSuccessAndHide = () => {
    setShowSuccessAnimation(true);
    setTimeout(() => {
      setShowSuccessAnimation(false);
    }, 1500);
  };

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
      setShowLoadingGif(true);
      const frames = [];
      const encodedFrames = [];
      const frameCount = Math.round(duration * 60);
      const frameInterval = 1000 / (fps / 2);

      for (let i = 0; i < frameCount * 2; i++) {
        setTimeout(async () => {
          const frame = await captureRef(imageRef, {
            format: "png",
            quality: 1.0,
          });

          frames.push(frame);
        }, i * frameInterval);
      }

      await new Promise((resolve) =>
        setTimeout(resolve, frameCount * frameInterval),
      );

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
        setShowLoadingGif(false);
        dispatch(handleSaveInEditor({ saveValue: false }));
        showSuccessAndHide();
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const loading = loadingGif.find((element) =>
      element?.nm.includes(FILE_SAVE),
    );
    const success = loadingGif.find((element) =>
      element?.nm.includes(CHECKBOX),
    );
    animationRefs.current = { loading, success };
    setLoadingSource({ loading, success });
  }, [loadingGif]);

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
      {showLoadingGif && (
        <View style={styles.animationContainer}>
          <Lottie
            ref={(element) => (animationRefs.current.loading = element)}
            onLayout={() => animationRefs.current.loading.play()}
            style={styles.animation}
            source={loadingSource.loading}
            autoPlay
            loop
          />
          <Text style={styles.animationText}>
            Do not close until the file is converted.
          </Text>
        </View>
      )}
      {showSuccessAnimation && (
        <View style={styles.animationContainer}>
          <Lottie
            ref={(element) => (animationRefs.current.success = element)}
            onLayout={() => animationRefs.current.success.play()}
            style={{ width: CONTAINER_WIDTH / 3 }}
            source={loadingSource.success}
            autoPlay
            loop={false}
          />
          <Text style={styles.animationText}>Successfully saved!</Text>
        </View>
      )}
      <AppHeader>
        <EditorHeader />
      </AppHeader>
      <ScrollView
        scrollEnabled={!activeEditor}
        contentContainerStyle={styles.scrollContainer}
      >
        <ContentBox color={UNACTIVE_COLOR}>
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
    justifyContent: "center",
    height: SCROLL_CONTAINER_HEIGHT,
    backgroundColor: UNACTIVE_COLOR,
  },
  contentContainer: {
    width: CONTAINER_WIDTH,
    height: CONTAINER_HEIGHT,
    borderWidth: 1,
    backgroundColor: WHITE_COLOR,
    zIndex: -1,
  },
  animationContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: LOADING_COLOR,
    zIndex: 100,
  },
  animation: {
    width: CONTAINER_WIDTH / 2,
  },
  animationText: {
    fontSize: 18,
    color: EDITOR_COLOR,
  },
});
