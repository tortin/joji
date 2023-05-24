import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, View } from 'react-native';
import { Button, TextInput } from '@react-native-material/core';
import { useNavigation } from '@react-navigation/native';

function LoginScreen () {
  const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={require('../assets/joji-logo.png')} />
            <TextInput label="Email" style={styles.textbox} />
            <TextInput secureTextEntry={true} label="Password" style={styles.textbox} />
            <StatusBar style="auto" />
            <Button title="Login" style={styles.loginButton} onPress={() => navigation.navigate('Main')}></Button>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignItems: 'center',
    },
    textbox: {
      width:'80%',
      marginVertical: 8,
    },
    loginButton: {
      width: '20%',
    },
    logo: {
      width: 180,
      height: 180,
      marginBottom: 8,
    },
  });
  
  export default LoginScreen