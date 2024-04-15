import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from 'src/features/home/screens/HomeScreen';
import Ionicons from '@expo/vector-icons/Ionicons';
import { AntDesign, Entypo } from '@expo/vector-icons';
import AllCamaignsScreen from 'src/features/campgains/screens/AllCampaignsScreen';
import WalletScreen from 'src/features/wallet/screens/WalletScreen';
import { PRIMARY_COLOR } from '../constants/colorConstants';


const Tab = createBottomTabNavigator();

export default function TabNavigator() {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false, tabBarActiveTintColor: PRIMARY_COLOR.main }}>
            <Tab.Screen name="Home" component={HomeScreen}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen name="Wallet" component={WalletScreen}
                options={{
                    tabBarLabel: 'Wallet',
                    tabBarIcon: ({ color, size }) => (
                        <Entypo name="wallet" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen name="Campgains" component={AllCamaignsScreen}
                options={{
                    tabBarLabel: 'Campgains',
                    tabBarIcon: ({ color, size }) => (
                        <AntDesign name="copy1" size={size} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}