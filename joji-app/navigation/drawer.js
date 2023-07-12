import { createDrawerNavigator } from "@react-navigation/drawer";
import MatchScreen from "../Screens/matchScreen";
import SwipeScreen from "../Screens/swipeScreen";
import ProfileScreen from "../Screens/profileScreen";
import SettingsScreen from "../Screens/settingsScreen";
import MatchStack from "./matchStack";

const Drawer = createDrawerNavigator();

function MainDrawer() {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="For you" component={SwipeScreen} />
            <Drawer.Screen name="Matches" component={MatchStack} />
            <Drawer.Screen name="Profile" component={ProfileScreen} />
            <Drawer.Screen name="Settings" component={SettingsScreen} />
           

        </Drawer.Navigator>
    )
}

export default MainDrawer;