import { Feather, Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";

import Logo from "../components/Logo";
import { homeFooter } from "../constants/footerItems";
import AppFooter from "../layout/AppFooter";
import AppHeader from "../layout/AppHeader";
import ContentBox from "../layout/ContentBox";
import { CONTENT } from "../constants/color";

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
        <View style={styles.mainHeader}>
          <View style={styles.mainText}>
            <Text style={{ fontSize: 20 }}>내가 만든 명함</Text>
            <Ionicons name="ios-add-outline" size={25} color="gray" />
          </View>
        </View>
        <View style={styles.mainContents}>
          <Ionicons name="ios-add-circle-outline" size={120} color="gray" />
          <Text style={{ fontSize: 20 }}>새로운 명함 만들기</Text>
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
  mainHeader: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    paddingBottom: -10,
    paddingHorizontal: 10,
    borderBottomWidth: 2,
    borderColor: "gray",
  },
  mainText: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  mainContents: {
    flex: 9,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
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
