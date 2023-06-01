import { Image, StyleSheet, ScrollView, View, Text } from 'react-native';
import { Stack,Button, TextInput} from '@react-native-material/core';
import { useNavigation } from '@react-navigation/native';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { Divider } from "@react-native-material/core";
import { ListItem } from "@react-native-material/core";
import { useState } from 'react';
import { MultipleSelectList, SelectList } from 'react-native-dropdown-select-list';
import { BASE_URL } from '../config';
import axios from 'axios';

function ProfileScreen() {

    const [name, setName] = useState("")
    const [age, setAge] = useState(null)
    const [gender, setGender] = useState("")
    const [locations, setLocations] = useState([])
    const [floorPrice, setFloorPrice] = useState("")
    const [ceilPrice, setCeilPrice] = useState("")
    const [subjects, setSubjects] = useState("")
    const [exp, setExp] = useState("")
    const [type, setType] = useState(null)

    const genderList = [
        {'key': 1, 'value': "M"},
        {'key': 2, 'value': 'F'}
    ]

    const locationList = [
        {'key': 1, 'value': 'West'},
        {'key': 2, 'value': 'East'},
        {'key': 3, 'value': 'North'},
        {'key': 4, 'value': 'South'},
        {'key': 5, 'value': 'Central'},
        {'key': 6, 'value': 'Southwest'},
        {'key': 7, 'value': 'Southeast'},
        {'key': 8, 'value': 'Northwest'},
        {'key': 9, 'value': 'Northeast'},
    ]

    const expList = [
        {'key': 1, 'value': '0'},
        {'key': 2, 'value': '1'},
        {'key': 3, 'value': '2'},
        {'key': 4, 'value': '3'},
        {'key': 5, 'value': '4'},
        {'key': 6, 'value': '5'},
        {'key': 7, 'value': '6'},
        {'key': 8, 'value': '7'},
        {'key': 9, 'value': '8+'},
    ]

    const typeList = [
        {"key": 1, 'value': "tutor"},
        {"key": 2, 'value': "student"}
    ]

    const handleSubmit = (name, age, gender, locations, floorPrice, ceilPrice, subjects, exp, type) => {
        console.log(name)
        subjects = subjects.split(', ')
        subjects.map(ele => ele.trim())
        data = {
            "age": parseInt(age),
            "name": name,
            "gender": gender,
            "price": `$${floorPrice} - $${ceilPrice}`,
            "experience": `${exp} years`,
            "locations": locations,
            "subjects" : subjects,
            "type:": type
          }
        console.log(data)
        axios.post(`${BASE_URL}/api/`, {
            "age": parseInt(age),
            "name": name,
            "gender": gender,
            "price": `$${floorPrice} - $${ceilPrice}`,
            "experience": `${exp} years`,
            "locations": locations,
            "subjects" : subjects,
            "type:": type
          })
          .then((response) => {
            console.log(response)
            console.log(response.data)
          })
    }

    return (
        <View style={{backgroundColor:"#ffcccc"}}>
        <ScrollView 
            contentContainerstyle = {styles.contentContainer}
            scrollIndicatorInsets={{ right: 1 }}>
            <View style={{backgroundColor:'#ffffff'}}>
                <Image style={styles.logo} source={require('../assets/boy.jpg')} />
            </View>
            <View style = {styles.new}>
                <Text>Gender</Text>
                <SelectList 
                    setSelected = {(val) => {setGender(val)}}
                    data = {genderList}
                    label = "Genders"
                    save = "value" 
                    style = {styles.subbox} />    
                <Text>Locations</Text>
                <MultipleSelectList 
                    data = {locationList}
                    setSelected={(locs) => {setLocations(locs)}}
                    save = "value"
                    label = "Locations" />
                <Text>Years of Experience</Text>
                <SelectList 
                    setSelected = {(val) => {setExp(val)}}
                    data = {expList}
                    label = "Years of Experience"
                    save = "value" 
                    style = {styles.subbox} />    
                <Text>FULL NAME</Text>
                <TextInput 
                    label = "NAME" 
                    style = {styles.subbox}
                    onChangeText = {(text) => {setName(text)}}
                    value = {name} />
                <Text>Age</Text>
                <TextInput
                    value = {age}
                    label = "AGE" 
                    style = {styles.subbox}
                    onChangeText = {(text) => {{setAge(text)}}} />
                <Text>Expected Price</Text>
                <View style = {styles.priceContainer}>
                    <TextInput 
                        style={styles.priceInput} 
                        onChangeText = {(text) => {setFloorPrice(text)}}
                        value = {floorPrice} />
                    <Text 
                         textAlignVertical = "center"
                         style = {styles.priceDash}>-</Text>
                    <TextInput 
                        style={styles.priceInput}
                        onChangeText = {(text) => {setCeilPrice(text)}}
                        value = {ceilPrice} />
                </View>
                <Text>Subjects (separated by commas)</Text>
                <TextInput 
                    label = "SUBJECTS" 
                    style = {styles.subbox} 
                    onChangeText = {(text) => {setSubjects(text)}}
                    value = {subjects} />
            </View>
            <Text variant="button" style={styles.title}>I am a:</Text>
            <SelectList 
                    setSelected = {(val) => setType(val)}
                    data = {typeList}
                    label = "I AM A"
                    save = "value" 
                    style = {styles.subbox} />    
            <Divider style={{ marginTop: 60 }} />
            <ListItem title = "RESUME (TUTORS)" style = {styles.resume} />
            <TextInput label = "Years of Experience" style = {styles.box} />
            <TextInput label = "Achievements" style = {styles.box} />
            <Button variant = "text" title = "Attach File" style = {styles.file} />
            <Button 
                title="Send" 
                trailing={props => <Icon name="send" {...props} style = {styles.send}/>}
                onPress={() => {handleSubmit(name, age, gender, locations, floorPrice, ceilPrice, subjects, exp, type)}} />
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
    priceContainer: {
        width:300,
        flexDirection: 'row',
    },
    priceInput: {
        flex: 5,
    },
    priceDash: {
        flex: 1
    }

  });
export default ProfileScreen;
