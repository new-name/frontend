import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";

export default function ShapeElements() {
  const icons = useSelector((state) => state.shapeReducer.iconArrays);

  return (
    <>
      {icons.map((icon) => (
        <TouchableOpacity key={icon}>
          <View>
            <MaterialCommunityIcons
              style={{ position: "absolute" }}
              name={icon}
              size={30}
            />
          </View>
        </TouchableOpacity>
      ))}
    </>
  );
}
