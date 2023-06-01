import { Text, Image, StyleSheet, View } from 'react-native';
import { Button, TextInput } from '@react-native-material/core';
import { useNavigation } from '@react-navigation/native';

function WelcomeScreen () {
  const navigation = useNavigation();


    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={require('../assets/joji-logo.png')} />
            <Button 
                title="Sign in" 
                style={styles.button} 
                onPress={() => navigation.navigate("Login")}
                color="#F5F5F4"></Button>
            <Button
                title="Register" 
                style={styles.button} 
                onPress={() => navigation.navigate("Register")}
                color="#F5F5F4"></Button>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffcccc',
      justifyContent: 'center',
      alignItems: 'center',
    },
    logo: {
      width: 180,
      height: 180,
      marginBottom: 8,
    },
    button : {
        width: "80%",
        marginTop: 20,
        height: 36
    }
  });
  
  export default WelcomeScreen