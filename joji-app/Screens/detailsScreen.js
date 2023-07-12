
import React, { useEffect, useState } from "react";
import {
  Provider,
  Stack,
  Button,
  Dialog,
  DialogHeader,
  DialogContent,
  DialogActions,
  Text,
  TextInput,
} from "@react-native-material/core";
import { View} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { RatingInput } from 'react-native-stock-star-rating';
import { Image } from "react-native";
import { StyleSheet } from "react-native";
import {Badge, Avatar} from "@react-native-material/core";
import { Rating } from 'react-native-stock-star-rating'
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import jwt_decode from 'jwt-decode';
import { BASE_URL } from "../config";
import { useIsFocused } from "@react-navigation/native";
import dummyReviews from "../dummyReviews";
import Review from "../components/review";


function DetailsScreen( {route, navigation}) {
    

    const {token} = useContext(AuthContext);
    const id = jwt_decode(token).user_id
    const { data } = route.params
    const [status, setStatus] = useState(null)
    const [offered, setOffered] = useState(false)
    const [visible, setVisible] = useState(false)
    const [offerVisible, setOfferVisible] = useState(false)
    const [rating, setRating] = useState(0);
    const [offer, setOffer] = useState(null)
    const isFocused = useIsFocused()
    const [reviews, setReviews] = useState([])
    const [subject, setSubject] = useState("")
    const [price, setPrice] = useState("")

    useEffect(() => {
        fetchData()
    }, [isFocused])


    const fetchData = () => {
        axios.get(`${BASE_URL}/api/offers/`)
          .then(response => {
            dummy = response.data.filter(item => {
                return item.sender === data.id && item.receiver === id
            })
            if (dummy.length !== 0) {
                setOffer(dummy[0])
                setStatus(dummy[0].status)
                setOffered(true)
            }
            console.log(dummy)
          })
          .catch(err => {
          })
      }

    const handleSend = () => {
        payload = {
            sender: id,
            receiver: data.id,
            subject: subject,
            price: price,
            status: "pending"
        }
        console.log(payload)
        axios.post(`${BASE_URL}/api/offers/`, payload)
        .then(response => {
            console.log(response)
        })
        .catch(err => {
            console.error(err)
        })
    }

    return (
        <Provider>
        <ScrollView>
        {status !== "accepted" ? <Button
            title = {offered ? "VIEW OFFER" : "SEND OFFER"}
            style = {{margin:5}}
            onPress = {() => {setOfferVisible(true)}}
            />: <></>}
            <Dialog visible = {offerVisible} onDismiss = {() => setOfferVisible(false)}>
                {offered ? 
                (
                <View>
                <DialogHeader title = "OFFER:"/>
                <DialogContent>
                {offer !== null ? 
                (
                <View>
                <Text>Subject: {offer.subject}</Text>
                <Text>Price: {offer.price}</Text>
                </View>): <></>}
                <DialogActions>
                    <Button
                    title = "ACCEPT"
                    compact
                    variant = "text"
                    onPress = {()=> setOfferVisible(false)}
                    />
                    <Button
                    title = "REJECT"
                    compact
                    variant = "text"
                    onPress = {()=> setOfferVisible(false)}
                    />
                    <Button
                    title = "CANCEL"
                    compact
                    variant = "text"
                    onPress = {()=> setOfferVisible(false)}
                    />
                </DialogActions>
            </DialogContent>
            </View>) : (
                <View>
                <DialogHeader title = "SEND OFFER"/>
                <DialogContent>
                <TextInput 
                    label = "Subject:" 
                    variant = "standard"
                    onChangeText={(text) => {setSubject(text)}} />
                <TextInput 
                    label = "Price:" 
                    variant = "standard"
                    onChangeText={(text) => {setPrice(text)}} />
            <DialogActions>
                    <Button
                    title = "SEND"
                    compact
                    variant = "text"
                    onPress = {handleSend}
                    />
                    <Button 
                    title = "CLOSE"
                    compact 
                    variant = "text"
                    onPress = {()=> setOfferVisible(false)}
                    />

                </DialogActions>
            </DialogContent>
            </View>) 
            }
            </Dialog>
            {status === "accepted" ? <Button
            title = "LEAVE REVIEW"
            style = {{margin:5}}
            onPress = {()=> setVisible(true)}
            />: <></>}
            <Dialog visible = {visible} onDismiss = {()=> setVisible(false)}>
                <DialogHeader title = "REVIEW"/>
            <DialogContent>
            <TextInput variant = "standard" />
            <RatingInput
                    rating={rating} 
                    setRating={setRating} 
                    size={40}  
                    maxStars={5} 
                    bordered={false}  
                    />
                <DialogActions>
                    <Button
                    title = "OK"
                    compact
                    variant = "text"
                    onPress = {()=> setVisible(false)}
                    />
                    <Button
                    title = "CANCEL"
                    compact 
                    variant = "text"
                    onPress = {() => setVisible(false)}
                    />
                </DialogActions>
            </DialogContent>
            </Dialog>
            <Badge label= "MATCH'S PROFILE:" color ="pink" tintColor="black" style = {styles.label}/>
            <Image style={styles.image} source={{uri: `${data.image}`}} />
           

            <Text style={styles.card}>
                            <Text style = {{fontWeight: "bold"}}>Name: </Text>
                            <Text>{data.name}</Text>
                        </Text>
                        <Text style={styles.card}>
                            <Text style = {{fontWeight: "bold"}}>Gender: </Text>
                            <Text>{data.gender}</Text>
                        </Text>
                        <Text style={styles.card}>
                            <Text style = {{fontWeight: "bold"}}>Age: </Text>
                            <Text>{data.age}</Text>
                        </Text>
                        <Text style={styles.card}>
                            <Text style = {{fontWeight: "bold"}}>Price: </Text>
                            <Text>{data.price}</Text>
                        </Text>
                        <Text style = {{fontWeight:'bold', marginLeft:10, marginTop:10}}>Subjects:</Text>
                        {data.subjects.map((item, i) => (
                        <Text style={{marginLeft: 10}} key={i}>{item}</Text>
                        ))}
                        <Text style = {{fontWeight:'bold', marginLeft:10, marginTop:10}}>Locations:</Text>
                        {data.locations.map((item, i) => (
                            <Text style={{marginLeft: 10}} key={i}>{item}</Text>
                        ))}
                            
                      
                        <Text style={styles.card}>
                            <Text style = {{fontWeight: "bold"}}>Remarks: </Text>
                            <Text>{data.remarks}</Text>
                        </Text>
                        <Text style={styles.card}>
                            <Text style = {{fontWeight: "bold"}}>Experience: </Text>
                            <Text>{data.experience}</Text>
                        </Text>
            <Stack fill center spacing={4}>
                 <Badge label= "REVIEW SECTION" color = "pink" style = {{marginTop:50, height:50,width:200,}}/>
                 {dummyReviews.map(item => 
                (
                    <Review review={item} />
                )
            )}
            </Stack>

        </ScrollView>
        </Provider>

    )
}

export default DetailsScreen


const styles = StyleSheet.create({
    image: {
        height: 300,
        width: 250,
        marginLeft: 60,
        marginTop: 30,
    

    },
    
    card: {
        marginLeft:10,
        marginTop:10,
    },

    label:{
        marginTop:20,
        height:20,
        width:200,
        marginLeft:100,
        fontWeight: "bold",
    },
}
)