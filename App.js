import { store } from './store'
import { Provider } from 'react-redux'
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import SignInScreen from 'src/features/auth/screens/SignInScreen';
import SignUpScreen from 'src/features/auth/screens/SignUpScreen';
import NewPasswordScreen from 'src/features/auth/screens/NewPasswordScreen';
import ForgotPassScreen from 'src/features/auth/screens/ForgotPassScreen';
import HomeScreen from 'src/features/home/screens/HomeScreen';
import TabNavigator from 'src/shared/components/TabNavigator';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Provider store={store}>

      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='TabNavigator' component={TabNavigator} />
            <Stack.Screen name='SignIn' component={SignInScreen} />
            <Stack.Screen name='SignUp' component={SignUpScreen} />
            <Stack.Screen name='ForgetPass' component={ForgotPassScreen} />
            <Stack.Screen name='NewPassword' component={NewPasswordScreen} />

          </Stack.Navigator>

        </NavigationContainer>

      </SafeAreaProvider>

    </Provider>
  );
}