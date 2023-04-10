import PropTypes from "prop-types";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  TextInput,
  Dimensions,
} from "react-native";

import Logo from "../components/Logo";
import Layout from "../layout/Layout";

const backgroundImage = require("../../assets/background.png");

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export default function Home({ navigation }) {
  const handleSignInPress = () => {};

  const handleSignUpPress = () => {
    navigation.navigate("SignUp");
  };

  return (
    <Layout background={backgroundImage}>
      <View style={styles.logoContainer}>
        <Logo fontSize={36} />
      </View>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder="사용자 이름 또는 이메일" />
        <TextInput
          style={styles.input}
          placeholder="비밀번호"
          secureTextEntry
        />
        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleSignInPress}
        >
          <Text style={{ fontSize: 20, color: "white" }}>로그인</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.bottomButton}
          onPress={handleSignUpPress}
        >
          <Text style={{ fontSize: 20, color: "#3C3C43" }}>가입하기</Text>
        </TouchableOpacity>
        <Text style={styles.bottomLogo}>NAME</Text>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    flex: 6,
  },
  input: {
    width: screenWidth * 0.9,
    height: screenHeight * 0.08,
    marginTop: screenHeight * 0.02,
    padding: 10,
    fontSize: 20,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    backgroundColor: "white",
  },
  loginButton: {
    justifyContent: "center",
    alignItems: "center",
    width: screenWidth * 0.9,
    height: screenHeight * 0.06,
    marginTop: screenHeight * 0.02,
    fontSize: 20,
    borderRadius: 10,
    backgroundColor: "#2962D8",
  },
  bottomContainer: {
    flex: 1.5,
    width: screenWidth,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  bottomButton: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    width: screenWidth * 0.9,
    height: screenHeight * 0.05,
    margin: -20,
    fontSize: 20,
    borderWidth: 1,
    borderColor: "#3C3C43",
    borderRadius: 10,
    backgroundColor: "white",
  },
  bottomLogo: {
    margin: 40,
    paddingHorizontal: 10,
    paddingVertical: 2,
    fontSize: 16,
    letterSpacing: 2,
    borderWidth: 1,
    borderColor: "#3C3C43",
    borderRadius: 5,
    backgroundColor: "white",
  },
});

Home.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
