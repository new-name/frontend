import PropTypes from "prop-types";
import { StyleSheet, View } from "react-native";

export default function Layout({ children }) {
  return <View style={styles.container}>{children}</View>;
}

Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});
