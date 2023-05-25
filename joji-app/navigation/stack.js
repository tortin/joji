import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../Screens/loginScreen';
import MainScreen from '../Screens/mainScreen';
import MainDrawer from './drawer';
import MatchScreen from '../Screens/matchScreen';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="Login" 
                component={LoginScreen}
                options={{headerShown: false}} />
            <Stack.Screen 
                name="Main" 
                component={MainDrawer}
                options={{headerShown: false}} />
        </Stack.Navigator>
    )
}

export default HomeStack;