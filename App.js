import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Sign_in_screen from 'src/features/auth/screens/Sign_in_screen';
import { store } from './store';
import { Provider } from 'react-redux'

export default function App() {
  return (
    <Provider store={store}>
      <Sign_in_screen />
    </Provider>
  );
}