import { Modal, Image, StyleSheet, ScrollView, View, Text, KeyboardAvoidingView } from 'react-native';
import { Button, TextInput} from '@react-native-material/core';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useContext, useState } from 'react';
import { MultipleSelectList, SelectList } from 'react-native-dropdown-select-list';
import { BASE_URL } from '../config';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import jwt_decode from 'jwt-decode';
import * as ImagePicker from 'expo-image-picker';
import SnackbarComponent from 'react-native-snackbar-component';

function ProfileScreen() {

    const {token} = useContext(AuthContext);
    const id = jwt_decode(token).user_id

    const [name, setName] = useState("")
    const [age, setAge] = useState(null)
    const [gender, setGender] = useState("")
    const [locations, setLocations] = useState([])
    const [floorPrice, setFloorPrice] = useState("")
    const [ceilPrice, setCeilPrice] = useState("")
    const [subjects, setSubjects] = useState("")
    const [exp, setExp] = useState("")
    const [type, setType] = useState(null)
    const [remarks, setRemarks] = useState("")
    const [image, setImage] = useState(null)
    const [sbVisible, setSbVisible] = useState(false)
    const [sbMessage, setSbMessage] = useState("")

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

    const handleSubmit = (name, age, gender, locations, floorPrice, ceilPrice, subjects, exp, type, remarks, image) => {
        const config = { headers: { 'Content-Type': 'multipart/form-data'}}
        subjects = subjects.split(', ')
        subjects.map(ele => ele.trim())
        // Formatted object to pass using FormData
        let formData = new FormData();
        formData.append("id", id)
        formData.append('age', parseInt(age));
        formData.append('name', name);
        formData.append('gender', gender);
        formData.append('price', `$${floorPrice} - $${ceilPrice}`);
        formData.append('experience', `${exp} years`);
        locations.forEach((item) => formData.append("locations", item))
        subjects.forEach((item) => formData.append("subjects", item))
        formData.append('type', type)
        formData.append('remarks', remarks)
        formData.append('image', {
            name: image.assets[0].fileName,
            type: image.assets[0].type,
            uri: image.assets[0].uri
        });
        //Attempt to update profile, if profile doesnt exist, create it
        axios.put(`${BASE_URL}/api/update/${id}/`, formData, config)
          .then((response) => {
            console.log(response)
            if (response.status === 200) {
                setSbMessage("Update Profile Successful!")
                setSbVisible(true)
            }
          })
          .catch(e => {
            axios.post(`${BASE_URL}/api/`, formData, config)
            .then(response => {
                if (response.status === 201) {
                    setSbMessage("Create Profile Successful!")
                    setSbVisible(true)
                }
            })
            .catch(e => {
                setSbMessage("Create/Update Profile Failed! Check all fields again")
                setSbVisible(true)
            })
          })
    }

    const openGallery = async () => {
        selectedPic = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            aspect: [1,1],
            quality: 1,
        });
        setImage(selectedPic)
        console.log(selectedPic.uri)
      }

    return (
        <View style={{backgroundColor:"#ffcccc"}}>
        <ScrollView 
            contentContainerstyle = {styles.contentContainer}
            scrollIndicatorInsets={{ right: 1 }}>
            <View style={styles.imageBox}>           
                { image !== null ? 
                <Image source={{ uri: image.assets[0].uri }} style={styles.image}/> : 
                <Image source={require('../assets/placeholder-avatar.png')} style={styles.image} />}
            </View>
            <Button 
                title="UPLOAD IMAGE" 
                onPress={() => {openGallery()}}
                trailing={props => <Icon name="upload" {...props}/>}
                style={styles.button} />
            <View style = {styles.new}>
                <Text style={styles.text}>Gender</Text>
                <SelectList 
                    setSelected = {(val) => {setGender(val)}}
                    data = {genderList}
                    label = "Genders"
                    save = "value" />    
                <Text style={styles.text}>Years of Experience</Text>
                <SelectList 
                    setSelected = {(val) => {setExp(val)}}
                    data = {expList}
                    label = "Years of Experience"
                    save = "value" />    
                <Text style={styles.text}>Locations</Text>
                <MultipleSelectList 
                    data = {locationList}
                    setSelected={(locs) => {setLocations(locs)}}
                    save = "value"
                    label = "Locations" />
                <Text style={styles.text}>Full Name</Text>
                <TextInput 
                    label = "NAME" 
                    style = {styles.subbox}
                    onChangeText = {(text) => {setName(text)}}
                    value = {name} />
                <Text style={styles.text}>Age</Text>
                <TextInput
                    value = {age}
                    label = "AGE" 
                    style = {styles.subbox}
                    onChangeText = {(text) => {{setAge(text)}}} />
                <Text style={styles.text}>Expected Price</Text>
                <View style = {styles.priceContainer}>
                    <TextInput 
                        label="MIN"
                        style={styles.priceInput} 
                        onChangeText = {(text) => {setFloorPrice(text)}}
                        value = {floorPrice} />
                    <Text 
                         textAlignVertical = "center"
                         style = {styles.priceDash}>-</Text>
                    <TextInput 
                        label="MAX"
                        style={styles.priceInput}
                        onChangeText = {(text) => {setCeilPrice(text)}}
                        value = {ceilPrice} />
                </View>
                <Text style={styles.text}>Subjects (separated by commas)</Text>
                <TextInput
                    editable
                    label = "SUBJECTS" 
                    style = {styles.subbox} 
                    onChangeText = {(text) => {setSubjects(text)}}
                    value = {subjects} />
                <Text style={styles.text}>Additional Remarks (Qualifications, special requests etc.)</Text>
                <TextInput
                    editable
                    multiline
                    placeholder = "REMARKS" 
                    style = {styles.bigbox}
                    onChangeText = {(text) => {setRemarks(text)}}
                    value = {remarks} />
            </View>
            <Text variant="button" style={styles.title}>I am a:</Text>
            <SelectList 
                    setSelected = {(val) => setType(val)}
                    data = {typeList}
                    label = "I AM A"
                    save = "value" />    
            <Button 
                title="Send" 
                trailing={props => <Icon name="send" {...props}/>}
                onPress={() => {handleSubmit(name, age, gender, locations, floorPrice, ceilPrice, subjects, exp, type, remarks, image)}}
                style={styles.button} />
        </ScrollView>
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
      width: "75%",
      height: 60,
    },
    bigbox: {
        width: 300,
        height: 240,
        marginBottom:2,
        marginTop:10,
      },
    title : {
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
        flex: 1,
        alignSelf:'center',
    },
    imageBox: {
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        height: 200,
        width: 200,
        borderRadius: 15,
        resizeMode: 'cover',
    },
    button: {
        marginVertical: 15,
        width: "40%",
        alignSelf: 'center'
    },
    text: {
        fontWeight: 'bold',
        fontSize: 16,
        marginVertical: 6,
    }
  });
export default ProfileScreen;
