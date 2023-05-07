import PropTypes from "prop-types";
import { StyleSheet, View } from "react-native";

import { HEADER } from "../constants/color";
import { APP_FOOTER_HEIGHT, SCREEN_WIDTH } from "../constants/size";

export default function AppHeader({ content = "space-between", children }) {
  return <View style={styles(content).container}>{children}</View>;
}

AppHeader.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
  content: PropTypes.string,
};

const styles = (content) =>
  StyleSheet.create({
    container: {
      zIndex: 1,
      flexDirection: "row",
      justifyContent: content,
      alignItems: "center",
      width: SCREEN_WIDTH,
      height: APP_FOOTER_HEIGHT * 1.65,
      paddingTop: APP_FOOTER_HEIGHT * 0.75,
      paddingHorizontal: 10,
      backgroundColor: HEADER,
    },
  });
