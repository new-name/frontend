import { Feather, Ionicons } from "@expo/vector-icons";
import PropTypes from "prop-types";
import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";

import Logo from "../components/Logo";
import {
  CONTENT_COLOR,
  SHADOW_COLOR,
  UNACTIVE_COLOR,
} from "../constants/color";
import { homeFooter } from "../constants/footerItems";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../constants/size";
import AppFooter from "../layout/AppFooter";
import AppHeader from "../layout/AppHeader";
import ContentBox from "../layout/ContentBox";

const exampleImage = require("../../assets/example.png");

export default function Home({ navigation }) {
  const { navigate } = navigation;
  const [isNavBarVisible, setIsNavBarVisible] = useState(false);
  const [projects, setProjects] = useState([]);

  const handleMakeNewProjectPress = () => {
    navigate("Editor");
  };

  return (
    <View style={styles.container}>
      <AppHeader>
        <Feather
          name="menu"
          size={30}
          color={UNACTIVE_COLOR}
          onPress={() => setIsNavBarVisible(true)}
        />
        <Logo fontSize={16} />
      </AppHeader>
      <ContentBox>
        <View style={styles.contentContainer}>
          <View style={styles.header}>
            <View style={styles.headerText}>
              <Text style={{ fontSize: 20 }}>내가 만든 명함</Text>
              <Ionicons
                name="ios-add-outline"
                size={25}
                color={UNACTIVE_COLOR}
              />
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
              <FlatList
                data={projects}
                renderItem={({ item }) => (
                  <View style={styles.projectItem}>
                    <Image
                      source={item.imageUri}
                      style={{ width: "100%", height: "100%" }}
                      resizeMode="cover"
                    />
                  </View>
                )}
                keyExtractor={(item, index) => index.toString()}
                numColumns={2}
                columnWrapperStyle={styles.projectList}
                contentContainer={{ paddingBottom: 20 }}
                showsVerticalScrollIndicator={false}
                pagingEnabled
              />
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
    backgroundColor: CONTENT_COLOR,
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
    justifyContent: "flex-start",
    gap: 10,
    marginTop: 10,
  },
  projectItem: {
    width: SCREEN_WIDTH * 0.35,
    height: SCREEN_HEIGHT * 0.29,
    margin: 5,
    backgroundColor: CONTENT_COLOR,
    shadowColor: SHADOW_COLOR,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
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
});
