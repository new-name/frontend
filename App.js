import { Provider } from "react-redux";

import AppNavigator from "./src/navigator/AppNavigator";
import store from "./src/store/congifureStore";

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}
