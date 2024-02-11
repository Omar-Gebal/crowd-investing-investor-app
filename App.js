import { store } from './store'
import { Provider } from 'react-redux'
import { SafeAreaView } from "react-native";

import SignInScreen from 'src/features/auth/screens/SignInScreen';

export default function App() {
  return (
    <Provider store={store}>
      <SignInScreen />
    </Provider>
  );
}