import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../Screens/loginScreen';
import MainDrawer from './drawer';
import WelcomeScreen from '../Screens/welcomeScreen';
import RegisterScreen from '../Screens/registerScreen';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="Welcome" 
                component={WelcomeScreen}
                options={{headerShown: false}} />
            <Stack.Screen 
                name="Login" 
                component={LoginScreen}
                options={{headerShown: false}} />
            <Stack.Screen 
                name="Register" 
                component={RegisterScreen}
                options={{headerShown: false}} />
        </Stack.Navigator>
    )
}

export default HomeStack;