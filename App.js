import * as Font from "expo-font";
import { useEffect } from "react";
import { Provider } from "react-redux";

import api from "./src/features/api";
import AppNavigator from "./src/navigator/AppNavigator";
import store from "./src/store/configureStore";

export default function App() {
  useEffect(() => {
    async function fetchFont() {
      const response = await api.getFonts();

      await Font.loadAsync(response);
    }

    fetchFont();
  }, []);

  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}
