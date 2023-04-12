import PropTypes from "prop-types";
import { useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";

import api from "../api";
import Logo from "../components/Logo";
import {
  CONTENT_COLOR,
  LOGIN_BUTTON_COLOR,
  SUB_GRAY_COLOR,
  UNACTIVE_COLOR,
} from "../constants/color";
import {
  CONTAINER_WIDTH,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from "../constants/size";
import Layout from "../layout/Layout";
import validate from "../utils/signInValidation";

const backgroundImage = require("../../assets/background.png");

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
            <Text style={{ fontSize: 20, color: CONTENT_COLOR }}>로그인</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={styles.bottomButton}
            onPress={handleSignUpPress}
          >
            <Text style={{ fontSize: 20, color: SUB_GRAY_COLOR }}>
              가입하기
            </Text>
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
    width: CONTAINER_WIDTH,
    height: SCREEN_HEIGHT * 0.08,
    marginTop: SCREEN_HEIGHT * 0.02,
    padding: 10,
    fontSize: 20,
    borderWidth: 1,
    borderColor: UNACTIVE_COLOR,
    borderRadius: 5,
    backgroundColor: CONTENT_COLOR,
  },
  loginButton: {
    justifyContent: "center",
    alignItems: "center",
    width: CONTAINER_WIDTH,
    height: SCREEN_HEIGHT * 0.06,
    marginTop: SCREEN_HEIGHT * 0.02,
    fontSize: 20,
    borderRadius: 10,
    backgroundColor: LOGIN_BUTTON_COLOR,
  },
  bottomContainer: {
    flex: 1.5,
    justifyContent: "flex-start",
    alignItems: "center",
    width: SCREEN_WIDTH,
  },
  bottomButton: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    width: CONTAINER_WIDTH,
    height: SCREEN_HEIGHT * 0.05,
    margin: -20,
    fontSize: 20,
    borderWidth: 1,
    borderColor: SUB_GRAY_COLOR,
    borderRadius: 10,
    backgroundColor: CONTENT_COLOR,
  },
  bottomLogo: {
    margin: 40,
    paddingHorizontal: 10,
    paddingVertical: 2,
    fontSize: 16,
    letterSpacing: 2,
    borderWidth: 1,
    borderColor: SUB_GRAY_COLOR,
    borderRadius: 5,
    backgroundColor: CONTENT_COLOR,
  },
});
