import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";

const { Navigator, Screen } = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Navigator initialRouteName="SignIn">
        <Screen name="SignIn" component={SignIn} />
        <Screen name="SignUp" component={SignUp} />
      </Navigator>
    </NavigationContainer>
  );
}
