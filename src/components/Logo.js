import PropTypes from "prop-types";
import { StyleSheet, Text } from "react-native";

import { LOGO } from "../constants/color";

export default function Logo({ fontSize }) {
  return <Text style={styles(fontSize).container}>NEWNAME</Text>;
}

Logo.propTypes = {
  fontSize: PropTypes.number.isRequired,
};

const styles = (fontSize) =>
  StyleSheet.create({
    container: {
      fontSize,
      fontWeight: 600,
      alignItems: "center",
      justifyContent: "center",
      color: LOGO,
      letterSpacing: 5,
    },
  });
