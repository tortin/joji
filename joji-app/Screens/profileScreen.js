import { Image, StyleSheet, ScrollView, View } from 'react-native';
import { Stack,Button, TextInput, Text } from '@react-native-material/core';
import { useNavigation } from '@react-navigation/native';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { Divider } from "@react-native-material/core";
import { ListItem } from "@react-native-material/core";

function ProfileScreen() {
    return (
        <View style={{backgroundColor:"#ffcccc"}}>
        <ScrollView contentContainerstyle = {styles.contentContainer}>
            <View style={{backgroundColor:'#ffffff'}}>
                <Image style={styles.logo} source={require('../assets/boy.jpg')} />
            </View>
            <View style = {styles.new}>
                <TextInput label = "NAME" style = {styles.subbox} />
                <TextInput label = "AGE" style = {styles.subbox} />
                <TextInput label = "GENDER" style = {styles.subbox} />
                <TextInput label = "LOCATION" style = {styles.subbox} />
                <TextInput label = "PRICE" style = {styles.subbox} />
                <TextInput label = "SUBJECTS" style = {styles.subbox} />
            </View>
            <Text variant="button" style={styles.title}>I am a:</Text>
            <Button variant ="text" title = "Student" style = {styles.Button} />
            <Button variant ="text" title = "Tutor" style = {styles.Button} /> 
            <Divider style={{ marginTop: 60 }} />
            <ListItem title = "RESUME (TUTORS)" style = {styles.resume} />
            <TextInput label = "Years of Experience" style = {styles.box} />
            <TextInput label = "Achievements" style = {styles.box} />
            <Button variant = "text" title = "Attach File" style = {styles.file} />
            <Button title="Send" trailing={props => <Icon name="send" {...props} style = {styles.send}/>} />


        </ScrollView>
        </View>
    )
}



const styles = StyleSheet.create({
    contentContainer: {
      flex: 1,
      backgroundColor: '#ffcccc',
      alignItems: 'center',
    },

    new: {
        flex: 1,
        backgroundColor: '#ffcccc',
        alignItems: 'center',
    },

    logo: {
        width: 350,
        height: 200,
        marginBottom: 25,
        alignSelf: 'center',
    },
    
    subbox: {
      width: 300,
      height: 60,
      marginBottom:2,
      marginTop:10,
      
    
    },

    title : {
        marginBottom: 0,
        marginTop : 30,
        fontSize: 25,

        alignSelf:'center',
    },
    
    Button: {
        
    },

    resume: {


    },

    box: {
    },

    file: {
        
    },
    
    send: {
    },

  });
export default ProfileScreen;
