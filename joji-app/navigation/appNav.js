import HomeStack from "./stack";
import { NavigationContainer } from "@react-navigation/native";
import { useContext } from "react";
import MainDrawer from "./drawer";
import { AuthContext } from "../context/AuthContext";
import { ActivityIndicator } from "@react-native-material/core";
import { View } from "react-native/";

function AppNav() {
    const {isLoading, token} = useContext(AuthContext)

    if (isLoading) {
        return (
        <View style={{flex:1, justifyContent:'center'}}>
            <ActivityIndicator size={'large'} />
        </View>
        )
    }

    return (
        <NavigationContainer>
            { token === null ? <HomeStack /> : <MainDrawer />}
        </NavigationContainer>
    )
}

export default AppNav;