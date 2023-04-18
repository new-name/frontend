import PropTypes from "prop-types";
import { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Alert,
} from "react-native";

import Logo from "../components/Logo";
import { WHITE_COLOR, UNACTIVE_COLOR } from "../constants/color";
import { CONTAINER_WIDTH, SCREEN_HEIGHT } from "../constants/size";
import api from "../features/api";
import Layout from "../layout/Layout";
import signUpValidation from "../utils/signUpValidation";

export default function SignUp({ navigation }) {
  const { navigate, goBack } = navigation;
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const handleInput = (key, value) => {
    setUser({
      ...user,
      [key]: value,
    });
  };

  const handleSignUpPress = async () => {
    const { name, email, password, passwordConfirm } = user;
    const {
      isValidName,
      isValidEmail,
      isValidPassword,
      isValidPasswordConfirm,
    } = signUpValidation;

    if (!isValidName(name)) {
      return Alert.alert("Enter English or Korean name");
    }

    if (!isValidEmail(email)) {
      return Alert.alert("Invalid email form");
    }

    if (!isValidPassword(password)) {
      return Alert.alert("8-20 digits of numbers and alphabets only");
    }

    if (!isValidPasswordConfirm(passwordConfirm, password)) {
      return Alert.alert("Enter password confirm same as password");
    }

    const response = await api.postSignUp(name, email, password);

    if (response.status === 201) {
      navigate("SignIn");
    }
  };

  const handleBackPress = () => {
    goBack();
  };

  return (
    <Layout>
      <View style={styles.logoContainer}>
        <Logo fontSize={36} />
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={150}
        style={{ flex: 4 }}
      >
        <View style={{ flex: 2 }}>
          <TextInput
            style={styles.input}
            placeholder="이름"
            value={user?.name}
            onChangeText={(value) => handleInput("name", value)}
            returnKeyType="done"
          />
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
          <TextInput
            style={styles.input}
            placeholder="비밀번호 확인"
            secureTextEntry
            value={user?.passwordConfirm}
            onChangeText={(value) => handleInput("passwordConfirm", value)}
            returnKeyType="done"
          />
          <View style={{ flex: 1.25, marginTop: SCREEN_HEIGHT * 0.05 }}>
            <TouchableOpacity
              style={styles.registerButton}
              onPress={handleSignUpPress}
            >
              <Text style={{ fontSize: 20 }}>가입하기</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.registerButton}
              onPress={handleBackPress}
            >
              <Text style={{ fontSize: 20, color: UNACTIVE_COLOR }}>
                돌아가기
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Layout>
  );
}

SignUp.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  logoContainer: {
    flex: 1.75,
    justifyContent: "center",
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
    backgroundColor: WHITE_COLOR,
  },
  registerButton: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    width: CONTAINER_WIDTH,
    height: SCREEN_HEIGHT * 0.06,
    marginTop: SCREEN_HEIGHT * 0.025,
    borderWidth: 1,
    borderColor: UNACTIVE_COLOR,
    borderRadius: 5,
  },
});
