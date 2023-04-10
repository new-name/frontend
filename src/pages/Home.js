import PropTypes from "prop-types";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

import Logo from "../components/Logo";
import Layout from "../layout/Layout";

export default function Home({ navigation }) {
  const handleSignInPress = () => {
    navigation.navigate("SignIn");
  };
  const handleSignOutPress = () => {
    navigation.navigate("SignUp");
  };

  return (
    <Layout>
      <Logo />
      <TouchableOpacity style={styles.button} onPress={handleSignInPress}>
        <Text>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleSignOutPress}>
        <Text>Sign Up</Text>
      </TouchableOpacity>
    </Layout>
  );
}

const styles = StyleSheet.create({
  button: {
    fontSize: 18,
    buttonMargin: 15,
  },
});

Home.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
