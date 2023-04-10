import { StyleSheet, Text } from "react-native";

import { LOGO } from "../constants/color";

export default function Logo() {
  return <Text style={styles.container}>NEWNAME</Text>;
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    color: LOGO,
  },
});
