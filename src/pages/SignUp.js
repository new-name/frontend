import PropTypes from "prop-types";
import { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  TouchableOpacity,
  Alert,
} from "react-native";

import api from "../api/index";
import Logo from "../components/Logo";
import Layout from "../layout/Layout";
import signUpValidation from "../utils/signUpValidation";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

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
          <View style={{ flex: 1.25 }}>
            <TouchableOpacity
              style={styles.registerButton}
              onPress={handleSignUpPress}
            >
              <Text style={{ fontSize: 20, color: "black" }}>가입하기</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.registerButton}
              onPress={handleBackPress}
            >
              <Text style={{ fontSize: 20, color: "gray" }}>돌아가기</Text>
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
    flex: 1,
    justifyContent: "center",
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
  registerButton: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    width: screenWidth * 0.9,
    height: screenHeight * 0.075,
    marginTop: screenHeight * 0.02,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
  },
});
