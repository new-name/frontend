import * as MediaLibrary from "expo-media-library";
import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
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
import { CONTAINER_WIDTH, SCREEN_HEIGHT } from "../constants/size";
import AppFooter from "../layout/AppFooter";
import AppHeader from "../layout/AppHeader";
import ContentBox from "../layout/ContentBox";
import EditorFooter from "../layout/EditorFooter";
import EditorHeader from "../layout/EditorHeader";

export default function Editor() {
  const imageRef = useRef();
  const [isLayoutReady, setIsLayoutReady] = useState(false);
  const captureFlag = useSelector(
    (state) => state.editorReducer.shouldSaveInEditor,
  );
  const activeEditor = useSelector(
    (state) => state.editorReducer.selectedProperty,
  );

  const [status, requestPermission] = MediaLibrary.usePermissions();

  if (status === null) {
    requestPermission();
  }

  useEffect(() => {
    if (captureFlag && isLayoutReady) {
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
            style={{ width: CONTAINER_WIDTH, height: SCREEN_HEIGHT * 0.7 }}
            ref={imageRef}
            collapsable={false}
            onLayout={() => setIsLayoutReady(true)}
          >
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
    height: SCREEN_HEIGHT * 0.8,
    justifyContent: "center",
    backgroundColor: UNACTIVE_COLOR,
  },
  contentContainer: {
    width: CONTAINER_WIDTH,
    height: SCREEN_HEIGHT * 0.7,
    borderWidth: 1,
    backgroundColor: WHITE_COLOR,
    zIndex: -1,
  },
});
