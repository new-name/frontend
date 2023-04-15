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
  Image,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import {
  ACTIVE_COLOR,
  CONTENT_COLOR,
  EDITOR_COLOR,
} from "../../constants/color";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../constants/size";
import api from "../../features/api";
import {
  getIcons,
  updateIconModalState,
} from "../../features/reducers/shapeSlice";
import AppHeader from "../../layout/AppHeader";

export default function IconModal() {
  const dispatch = useDispatch();
  const [selectedIcon, setSelectedIcon] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [iconArrays, setIconArrays] = useState([]);

  const isIconModalVisible = useSelector(
    (state) => state.shapeReducer.isIconModalVisible,
  );

  const updateIcons = () => {
    dispatch(getIcons(selectedIcon));
  };

  const getIconArrays = async (query) => {
    const response = await api.getIcons(query, 10, 40);

    setIconArrays(response);
  };

  const handleSearch = () => {
    try {
      if (searchQuery !== "") {
        getIconArrays(searchQuery);
      }
    } catch (error) {
      console.error("Error searching icons:", error);
    }
  };

  useEffect(() => {
    getIconArrays("happy");
  }, []);

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
          placeholder="Search Icons in Noun Projects"
        />
        <ScrollView
          pagingEnabled
          contentContainerStyle={styles.scrollContainer}
        >
          <View style={styles.gridContainer}>
            {iconArrays?.map((uri) => (
              <TouchableOpacity
                key={uri}
                onPress={() => setSelectedIcon(uri)}
                style={{
                  ...styles?.icons,
                  borderColor: selectedIcon === uri ? "blue" : "gray",
                  borderWidth: selectedIcon === uri ? 2 : 1,
                }}
              >
                <View style={styles.iconProperty}>
                  <Image style={styles.icon} source={{ uri }} />
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
    width: SCREEN_WIDTH * 0.44,
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
