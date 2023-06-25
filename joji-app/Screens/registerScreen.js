import { Image, StyleSheet, View } from 'react-native';
import { Button, TextInput } from '@react-native-material/core';
import { useContext, useState } from 'react';
import { BASE_URL } from '../config';
import axios from 'axios';
import SnackbarComponent from 'react-native-snackbar-component';

function RegisterScreen () {
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [username, setUsername] = useState(null)
  const [sbVisible, setSbVisible] = useState(false)
  const [sbMessage, setSbMessage] = useState("")

  const handleSubmit = (email, password, username) => {
    axios.post(`${BASE_URL}/api/user/register/`, {
      "email": email,
      "user_name": username,
      "password": password
    })
    .then((response) => {
      console.log(response)
      console.log(response.data)
      if (response.status === 201) {
        setSbMessage("User successfully created!")
        setSbVisible(true)
      }
    })
    .catch(e => {
      setSbMessage("Registration Failed! Enter valid details")
      setSbVisible(true)
    })
  }

    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={require('../assets/joji-logo.png')} />
            <TextInput 
              label="Email" 
              style={styles.textbox}
              value={email}
              onChangeText={(text) => {setEmail(text)}} />
            <TextInput 
              label="Username" 
              style={styles.textbox}
              value={username}
              onChangeText={(text) => {setUsername(text)}} />
            <TextInput 
              secureTextEntry={true}
              label="Password" 
              style={styles.textbox}
              value={password}
              onChangeText={text => {setPassword(text)}} />
            <Button 
              title="Register" 
              style={styles.registerButton}
              onPress={() => handleSubmit(email, password, username)}></Button>
            <SnackbarComponent 
              visible={sbVisible} 
              textMessage={sbMessage} 
              actionHandler={()=>{setSbVisible(false)}} 
              actionText="Dismiss" 
              autoHidingTime={3000}/>
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
    registerButton: {
      marginTop: 8,
      width: "40%"
    },
    logo: {
      width: 180,
      height: 180,
      marginBottom: 8,
    },
  });
  
export default RegisterScreen