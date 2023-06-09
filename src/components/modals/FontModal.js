import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  Modal,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { ACTIVE_COLOR, WHITE_COLOR } from "../../constants/color";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../constants/size";
import api from "../../features/api";
import {
  updateFontContainerVisible,
  updateTextFontStyle,
} from "../../features/reducers/textSlice";
import AppHeader from "../../layout/AppHeader";

export default function FontModal() {
  const dispatch = useDispatch();
  const [fontsNames, setFontsNames] = useState([]);
  const [filteredFonts, setFilteredFonts] = useState([]);

  const [selectedFonts, setSelectedFonts] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const isFontContainerVisible = useSelector(
    (state) => state.textReducer.fontContainerVisible,
  );
  const selectedTextIndex = useSelector(
    (state) => state.textReducer.textProperties.selectedIndex,
  );

  const handleSearch = () => {
    try {
      const filtered = fontsNames.filter((font) =>
        font.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setFilteredFonts(filtered);
    } catch (error) {
      console.error("Error searching fonts:", error);
    }
  };

  useEffect(() => {
    async function getFonts() {
      const response = await api.getFonts();
      const fonts = Object.keys(response);
      setFontsNames(fonts);
      setFilteredFonts(fonts);
    }

    getFonts();
  }, []);

  const updateFonts = () => {
    dispatch(
      updateTextFontStyle({ index: selectedTextIndex, font: selectedFonts }),
    );
  };

  return (
    <Modal visible={isFontContainerVisible} animationType="slide">
      <View style={styles.container}>
        <AppHeader>
          <View style={styles.leftHeader}>
            <Ionicons
              name="ios-chevron-back-sharp"
              size={25}
              color="darkgray"
            />
            <TouchableOpacity
              onPress={() => dispatch(updateFontContainerVisible(false))}
            >
              <Text style={{ color: "darkgray" }}>뒤로 가기</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.title}>
            <Text style={{ fontSize: 20, color: "darkgray" }}>Fonts</Text>
          </View>
          <TouchableOpacity onPress={updateFonts} style={styles.fontIcon}>
            <FontAwesome name="font" size={30} color={ACTIVE_COLOR} />
          </TouchableOpacity>
        </AppHeader>
        <TextInput
          style={styles.searchBar}
          onChangeText={setSearchQuery}
          value={searchQuery}
          onSubmitEditing={handleSearch}
          placeholder="Search Fonts"
        />
        <ScrollView pagingEnabled contentContainerStyle={styles.fontContainer}>
          <View style={styles.gridContainer}>
            {filteredFonts?.map((font) => (
              <TouchableOpacity
                key={font}
                onPress={() => setSelectedFonts(font)}
                style={{
                  ...styles?.fonts,
                  borderColor: selectedFonts === font ? "blue" : "gray",
                  borderWidth: selectedFonts === font ? 2 : 1,
                }}
              >
                <Text style={{ fontFamily: font, fontSize: 30 }}>Hello</Text>
                <View style={styles.fontProperty}>
                  <Text style={{ fontSize: 12 }}>{font}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  leftHeader: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  fontIcon: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  searchBar: {
    width: SCREEN_WIDTH * 0.9,
    height: SCREEN_HEIGHT * 0.05,
    backgroundColor: WHITE_COLOR,
    paddingHorizontal: 10,
    borderWidth: 2,
    borderRadius: 10,
    marginVertical: 20,
  },
  fontContainer: {
    width: SCREEN_WIDTH * 0.9,
  },
  fonts: {
    justifyContent: "center",
    alignItems: "center",
    width: SCREEN_WIDTH * 0.44,
    height: SCREEN_HEIGHT * 0.12,
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: WHITE_COLOR,
  },
  fontProperty: {
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
  },
});
