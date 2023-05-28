import { Button } from '@react-native-material/core';
import { useContext } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from '../context/AuthContext';

function SettingsScreen() {

    const {logout} = useContext(AuthContext);

    return (
        <SafeAreaView>
            <Button title="Logout" onPress={() => {logout()}}></Button>
        </SafeAreaView>
    )
}

export default SettingsScreen;

styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})