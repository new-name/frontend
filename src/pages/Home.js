import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import PropTypes from "prop-types";
import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { useDispatch } from "react-redux";

import Logo from "../components/Logo";
import { WHITE_COLOR, HEADER, UNACTIVE_COLOR } from "../constants/color";
import { homeFooter } from "../constants/footerItems";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../constants/size";
import api from "../features/api";
import { updateAllGifs } from "../features/reducers/gifSlice";
import { updateAllImages } from "../features/reducers/imageSlice";
import { updateAllShapes } from "../features/reducers/shapeSlice";
import { updateAllTexts } from "../features/reducers/textSlice";
import AppFooter from "../layout/AppFooter";
import AppHeader from "../layout/AppHeader";
import ContentBox from "../layout/ContentBox";

export default function Home({ navigation }) {
  const dispatch = useDispatch();
  const { navigate } = navigation;
  const [projects, setProjects] = useState([]);

  const handleMakeNewProjectPress = () => {
    navigate("Editor");
  };

  const handleSelectedEdit = async (index) => {
    const shapes = [];
    const texts = [];
    const gifs = [];
    const images = [];

    const selectedProject = projects[index];

    selectedProject.shapes.forEach((shape) => {
      shapes.push(shape);
    });

    selectedProject.texts.forEach((text) => {
      texts.push(text);
    });

    selectedProject.gifs.forEach((gif) => {
      gifs.push(gif);
    });

    selectedProject.images.forEach((image) => {
      images.push(image);
    });

    if (shapes.length >= 0) {
      dispatch(updateAllShapes(shapes));
    }

    if (texts.length >= 0) {
      dispatch(updateAllTexts(texts));
    }

    if (gifs.length >= 0) {
      dispatch(updateAllGifs(gifs));
    }

    if (images.length >= 0) {
      dispatch(updateAllImages(images));
    }

    await SecureStore.setItemAsync("projectId", selectedProject._id);

    navigate("Editor");
  };

  useFocusEffect(() => {
    async function getProejct() {
      const response = await api.getProjects();

      setProjects(response.data.projects);
    }

    getProejct();
  });

  return (
    <View style={styles.container}>
      <AppHeader content="center">
        <Logo fontSize={16} />
      </AppHeader>
      <ContentBox color={WHITE_COLOR}>
        <View style={styles.contentContainer}>
          <View style={styles.header}>
            <View style={styles.headerText}>
              <Text style={{ fontSize: 20 }}>내가 만든 명함</Text>
              <TouchableOpacity onPress={handleMakeNewProjectPress}>
                <Ionicons
                  name="ios-add-outline"
                  size={25}
                  color={UNACTIVE_COLOR}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.contents}>
            {!projects.length ? (
              <>
                <TouchableOpacity onPress={handleMakeNewProjectPress}>
                  <Ionicons
                    name="ios-add-circle-outline"
                    size={120}
                    color={UNACTIVE_COLOR}
                  />
                </TouchableOpacity>
                <Text style={{ fontSize: 20 }}>새로운 명함 만들기</Text>
              </>
            ) : (
              <ScrollView
                contentContainerStyle={styles.projectList}
                pagingEnabled
              >
                {projects.map((project, index) => (
                  <TouchableOpacity
                    onPress={() => handleSelectedEdit(index)}
                    key={project._id}
                  >
                    <Image
                      style={styles.thumbnail}
                      source={{
                        uri: `data:image/png;base64,${project.thumbnail}`,
                      }}
                    />
                  </TouchableOpacity>
                ))}
                {projects.length < 4 &&
                  [...Array(4 - projects.length)].map((_, index) => (
                    <View key={index} style={styles.grayBox} />
                  ))}
              </ScrollView>
            )}
          </View>
        </View>
      </ContentBox>
      <AppFooter>
        <View style={styles.footer}>
          {homeFooter.map((item, index) => (
            <View key={item.iconName} style={styles.iconWithText}>
              <Ionicons name={item.iconName} size={30} color={UNACTIVE_COLOR} />
              <Text style={styles.iconText}>{item.text}</Text>
            </View>
          ))}
        </View>
      </AppFooter>
    </View>
  );
}

Home.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: WHITE_COLOR,
  },
  header: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    paddingHorizontal: 10,
    borderBottomWidth: 2,
    borderColor: UNACTIVE_COLOR,
  },
  headerText: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  contentContainer: {
    width: SCREEN_WIDTH * 0.8,
    height: "100%",
  },
  contents: {
    flex: 9,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  projectList: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 10,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: SCREEN_WIDTH,
  },
  iconWithText: {
    alignItems: "center",
  },
  iconText: {
    marginTop: 5,
    fontSize: 12,
    color: UNACTIVE_COLOR,
  },
  thumbnail: {
    width: SCREEN_WIDTH * 0.35,
    height: SCREEN_HEIGHT * 0.3,
    resizeMode: "contain",
    margin: 7.5,
  },
  grayBox: {
    width: SCREEN_WIDTH * 0.35,
    height: SCREEN_HEIGHT * 0.3,
    backgroundColor: HEADER,
    margin: 7.5,
  },
});
