import PropTypes from "prop-types";
import { useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  TextInput,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";

import api from "../api/index";
import Logo from "../components/Logo";
import Layout from "../layout/Layout";
import validate from "../utils/signInValidation";

const backgroundImage = require("../../assets/background.png");

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export default function SignIn({ navigation }) {
  const { navigate } = navigation;
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleInput = (key, value) => {
    setUser({
      ...user,
      [key]: value,
    });
  };

  const handleSignInPress = async () => {
    try {
      const validation = validate(user.email, user.password);

      if (validation) {
        const response = await api.postSignIn(user.email, user.password);

        if (response.status === 201) {
          navigate("Home");
        }
      }
    } catch {
      Alert.alert("email or password is not authorized");
    }
  };

  const handleSignUpPress = () => {
    navigate("SignUp");
  };

  return (
    <Layout background={backgroundImage}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.content}
      >
        <View style={styles.logoContainer}>
          <Logo fontSize={36} />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="이메일"
            keyboardType="email-address"
            value={user?.email}
            onChangeText={(value) => handleInput("email", value)}
            returnKeyType="done"
          />
          <TextInput
            style={styles.input}
            placeholder="비밀번호"
            secureTextEntry
            value={user?.password}
            onChangeText={(value) => handleInput("password", value)}
            returnKeyType="done"
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
      </KeyboardAvoidingView>
    </Layout>
  );
}

SignIn.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  logoContainer: {
    flex: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    flex: 6,
    alignItems: "center",
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
