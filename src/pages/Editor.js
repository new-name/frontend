import { StatusBar } from "expo-status-bar";
import { View, StyleSheet } from "react-native";

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
import { CONTENT_COLOR } from "../constants/color";
import { CONTAINER_WIDTH } from "../constants/size";
import AppFooter from "../layout/AppFooter";
import AppHeader from "../layout/AppHeader";
import ContentBox from "../layout/ContentBox";
import EditorFooter from "../layout/EditorFooter";
import EditorHeader from "../layout/EditorHeader";

export default function Editor() {
  return (
    <View style={styles.container}>
      <AppHeader>
        <EditorHeader />
      </AppHeader>
      <ContentBox>
        <View style={styles.contentContainer}>
          <LayerModal />
          <ImageModal />
          <GifModal />
          <FontModal />
          <ColorModal />
          <IconModal />
          <TextElements />
          <ImageElements />
          <GifElements />
          <ShapeElements />
        </View>
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
    height: "95%",
    borderWidth: 1,
  },
});
