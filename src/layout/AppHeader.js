import PropTypes from "prop-types";
import { StyleSheet, View } from "react-native";

import { HEADER } from "../constants/color";
import { APP_FOOTER_HEIGHT, SCREEN_WIDTH } from "../constants/size";

export default function AppHeader({ children }) {
  return <View style={styles.container}>{children}</View>;
}

AppHeader.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
};

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: SCREEN_WIDTH,
    height: APP_FOOTER_HEIGHT * 1.65,
    paddingTop: APP_FOOTER_HEIGHT * 0.9,
    paddingHorizontal: 10,
    backgroundColor: HEADER,
  },
});
