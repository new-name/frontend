import {
  FontAwesome,
  MaterialCommunityIcons,
  Ionicons,
} from "@expo/vector-icons";
import { useState } from "react";
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

import {
  ACTIVE_COLOR,
  CONTENT_COLOR,
  EDITOR_COLOR,
} from "../../constants/color";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../constants/size";
import {
  handleRenderIcons,
  updateIconModalState,
} from "../../features/reducers/shapeSlice";
import AppHeader from "../../layout/AppHeader";

export default function IconModal() {
  const dispatch = useDispatch();
  const [selectedIcon, setSelectedIcon] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const iconNames = Object.keys(MaterialCommunityIcons.glyphMap).slice(0, 50);
  const [filteredIconNames, setFilteredIconNames] = useState(iconNames);
  const shapeElements = useSelector((state) => state.shapeReducer.elements);

  const isIconModalVisible = useSelector(
    (state) => state.shapeReducer.isIconModalVisible,
  );

  const updateIcons = () => {
    const nextIndex = Object.keys(shapeElements).length;
    const property = {
      type: "icon",
      name: selectedIcon,
      size: 30,
      color: "gray",
      x: 0,
      y: 0,
      zIndex: 0,
    };

    const updatedShapeElements = {
      ...shapeElements,
      [nextIndex]: property,
    };
    dispatch(handleRenderIcons(updatedShapeElements));
  };

  const handleSearch = () => {
    try {
      if (searchQuery !== "") {
        const filtered = Object.keys(MaterialCommunityIcons.glyphMap).filter(
          (iconName) =>
            iconName.toLowerCase().includes(searchQuery.toLowerCase()),
        );
        return setFilteredIconNames(filtered);
      }

      return setFilteredIconNames(iconNames);
    } catch (error) {
      console.error("Error searching icons:", error);
    }
  };

  return (
    <Modal visible={isIconModalVisible} animationType="slide">
      <View style={styles.container}>
        <AppHeader>
          <View style={styles.leftHeader}>
            <Ionicons
              name="ios-chevron-back-sharp"
              size={25}
              color="darkgray"
            />
            <TouchableOpacity
              onPress={() => dispatch(updateIconModalState(false))}
            >
              <Text style={{ color: "darkgray" }}>뒤로 가기</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.title}>
            <Text style={{ fontSize: 20, color: "darkgray" }}>Fonts</Text>
          </View>
          <TouchableOpacity onPress={updateIcons} style={styles.fontIcon}>
            <FontAwesome name="font" size={30} color={ACTIVE_COLOR} />
          </TouchableOpacity>
        </AppHeader>
        <TextInput
          style={styles.searchBar}
          onChangeText={setSearchQuery}
          value={searchQuery}
          onSubmitEditing={handleSearch}
          placeholder="Search Icons"
        />
        <ScrollView
          pagingEnabled
          contentContainerStyle={styles.scrollContainer}
        >
          <View style={styles.gridContainer}>
            {filteredIconNames?.map((icon, index) => (
              <TouchableOpacity
                key={icon}
                onPress={() => setSelectedIcon(icon)}
                style={{
                  ...styles?.icons,
                  borderColor: selectedIcon === icon ? "blue" : "gray",
                  borderWidth: selectedIcon === icon ? 2 : 1,
                }}
              >
                <View style={styles.iconProperty}>
                  <MaterialCommunityIcons
                    name={icon}
                    size={50}
                    color={selectedIcon === icon ? "blue" : "gray"}
                    style={styles.icon}
                  />
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
    backgroundColor: EDITOR_COLOR,
    paddingHorizontal: 10,
    borderWidth: 2,
    borderRadius: 10,
    marginVertical: 20,
  },
  scrollContainer: {
    width: SCREEN_WIDTH * 0.9,
  },
  icons: {
    justifyContent: "center",
    alignItems: "center",
    width: SCREEN_WIDTH * 0.28,
    height: SCREEN_HEIGHT * 0.12,
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: CONTENT_COLOR,
  },
  iconProperty: {
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
  },
  icon: {
    width: 50,
    height: 50,
  },
});
