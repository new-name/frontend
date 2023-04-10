import { Feather, Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
} from "react-native";

import Logo from "../components/Logo";
import { CONTENT } from "../constants/color";
import { homeFooter } from "../constants/footerItems";
import AppFooter from "../layout/AppFooter";
import AppHeader from "../layout/AppHeader";
import ContentBox from "../layout/ContentBox";

const exampleImage = require("../../assets/example.png");
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export default function Home() {
  const [isNavBarVisible, setIsNavBarVisible] = useState(false);
  const [projects, setProjects] = useState([]);

  return (
    <View style={styles.container}>
      <AppHeader>
        <Feather
          name="menu"
          size={30}
          color="gray"
          onPress={() => setIsNavBarVisible(true)}
        />
        <Logo fontSize={16} />
      </AppHeader>
      <ContentBox>
        <View style={styles.header}>
          <View style={styles.headerText}>
            <Text style={{ fontSize: 20 }}>내가 만든 명함</Text>
            <Ionicons name="ios-add-outline" size={25} color="gray" />
          </View>
        </View>
        <View style={styles.contents}>
          {!projects.length ? (
            <>
              <TouchableOpacity>
                <Ionicons
                  name="ios-add-circle-outline"
                  size={120}
                  color="gray"
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
              contentContainerStyle={{ paddingBottom: 20 }}
              showsVerticalScrollIndicator={false}
              pagingEnabled
            />
          )}
        </View>
      </ContentBox>
      <AppFooter>
        {homeFooter.map((item, index) => (
          <View key={item + index} style={styles.iconWithText}>
            <Ionicons name={item.iconName} size={30} color="gray" />
            <Text style={styles.iconText}>{item.text}</Text>
          </View>
        ))}
      </AppFooter>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: CONTENT,
  },
  header: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    paddingHorizontal: 10,
    borderBottomWidth: 2,
    borderColor: "gray",
  },
  headerText: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  contents: {
    flex: 9,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  projectList: {
    justifyContent: "flex-start",
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
  },
  projectItem: {
    width: screenWidth * 0.35,
    height: screenHeight * 0.29,
    margin: 5,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
  },
  iconWithText: {
    alignItems: "center",
  },
  iconText: {
    marginTop: 5,
    fontSize: 12,
    color: "gray",
  },
});
