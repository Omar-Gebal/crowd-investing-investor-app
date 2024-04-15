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
import TabNavigator from 'src/shared/components/TabNavigator';
import CampaignDetailsScreen from 'src/features/campgains/screens/CampgaignDetailsScreen';
import BuySharesScreen from 'src/features/campgains/screens/BuySharesScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>

      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='SignIn' component={SignInScreen} />
            <Stack.Screen name='TabNavigator' component={TabNavigator} />
            <Stack.Screen name='TopUp' component={TabNavigator} />
            <Stack.Screen options={{ headerShown: true, title: 'Details' }} name='CampaignDetails' component={CampaignDetailsScreen} />
            <Stack.Screen options={{ headerShown: true, title: 'Buy Shares' }} name='BuyShares' component={BuySharesScreen} />
            <Stack.Screen name='SignUp' component={SignUpScreen} />
            <Stack.Screen name='ForgetPass' component={ForgotPassScreen} />
            <Stack.Screen name='NewPassword' component={NewPasswordScreen} />


          </Stack.Navigator>

        </NavigationContainer>

      </SafeAreaProvider>

    </Provider>
  );
}