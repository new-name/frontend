import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "../pages/Home";

const { Navigator, Screen } = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Navigator initialRouteName="Home">
        <Screen name="Home" component={Home} />
        {/* <Screen name="SignUp" component={SignUp} /> */}
      </Navigator>
    </NavigationContainer>
  );
}
