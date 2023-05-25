import { createDrawerNavigator } from "@react-navigation/drawer";
import MatchScreen from "../Screens/matchScreen";
import MainScreen from "../Screens/mainScreen";
import ProfileScreen from "../Screens/profileScreen";
import SettingsScreen from "../Screens/settingsScreen";

const Drawer = createDrawerNavigator();

function MainDrawer() {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Swipe" component={MainScreen} />
            <Drawer.Screen name="Matches" component={MatchScreen} />
            <Drawer.Screen name="Profile" component={ProfileScreen} />
            <Drawer.Screen name="Settings" component={SettingsScreen} />
        </Drawer.Navigator>
    )
}

export default MainDrawer;