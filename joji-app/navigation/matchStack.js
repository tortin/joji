import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MessageScreen from '../Screens/messageScreen';
import MatchScreen from '../Screens/matchScreen';

const Stack = createNativeStackNavigator();

const MatchStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="Match" 
                component={MatchScreen}
                options={{headerShown: false}} />
            <Stack.Screen 
                name="Message" 
                component={MessageScreen}
                options={{headerShown: false}} />
        </Stack.Navigator>
    )
}

export default MatchStack;