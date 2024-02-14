import { store } from './store'
import { Provider } from 'react-redux'
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import SignInScreen from 'src/features/auth/screens/SignInScreen';
import SignUpScreen from 'src/features/auth/screens/SignUpScreen';
import ForgotPassScreen from 'src/features/auth/screens/ForgotPassScreen';
import { View } from 'react-native';

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>

        <ForgotPassScreen/>

      </SafeAreaProvider>
    </Provider>
  );
}