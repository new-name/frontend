import * as MediaLibrary from "expo-media-library";
import { StatusBar } from "expo-status-bar";
import { useEffect, useRef } from "react";
import { View, StyleSheet } from "react-native";
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
import { CONTENT_COLOR, WHITE_COLOR } from "../constants/color";
import { CONTAINER_WIDTH, SCREEN_HEIGHT } from "../constants/size";
import AppFooter from "../layout/AppFooter";
import AppHeader from "../layout/AppHeader";
import ContentBox from "../layout/ContentBox";
import EditorFooter from "../layout/EditorFooter";
import EditorHeader from "../layout/EditorHeader";

export default function Editor() {
  const imageRef = useRef();
  const captureFlag = useSelector(
    (state) => state.editorReducer.shouldSaveInEditor,
  );
  const [status, requestPermission] = MediaLibrary.usePermissions();

  if (status === null) {
    requestPermission();
  }

  useEffect(() => {
    const onSaveImageAsync = async () => {
      try {
        const localUri = await captureRef(imageRef, {
          format: "jpg",
          quality: 1.0,
          height: SCREEN_HEIGHT,
        });

        await MediaLibrary.saveToLibraryAsync(localUri);
        if (localUri) {
          alert("Saved!");
        }
      } catch (e) {
        console.log(e);
      }
    };

    onSaveImageAsync();
  }, [captureFlag]);

  return (
    <View style={styles.container}>
      <AppHeader>
        <EditorHeader />
      </AppHeader>
      <ContentBox>
        <ViewShot ref={imageRef} collapsable={false}>
          <View style={styles.contentContainer}>
            <TextElements />
            <ImageElements />
            <GifElements />
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
    backgroundColor: CONTENT_COLOR,
  },
  contentContainer: {
    width: CONTAINER_WIDTH,
    height: SCREEN_HEIGHT * 0.7,
    borderWidth: 1,
    backgroundColor: WHITE_COLOR,
    zIndex: -1,
  },
});
