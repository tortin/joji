import { StatusBar } from 'expo-status-bar';
import { Text, Image, StyleSheet, View } from 'react-native';
import { Button, TextInput } from '@react-native-material/core';
import { useNavigation } from '@react-navigation/native';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

function LoginScreen () {
  const {login} = useContext(AuthContext)
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const navigation = useNavigation();


    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={require('../assets/joji-logo.png')} />
            <TextInput 
              label="Email" 
              style={styles.textbox}
              value={email}
              onChangeText={(text) => {setEmail(text)}} />
            <TextInput 
              secureTextEntry={true} 
              label="Password" 
              style={styles.textbox}
              value={password}
              onChangeText={pw => {setPassword(pw)}} />
            <StatusBar style="auto" />
            <Button title="Login" style={styles.loginButton} onPress={() => {login(email, password)}}></Button>
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