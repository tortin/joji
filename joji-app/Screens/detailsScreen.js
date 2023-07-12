
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
    const { data, name } = route.params
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
    const [offerID, setOfferID] = useState(null)
    const [comment, setComment] = useState("")
    const [reviewed, setReviewed] = useState(false)

    useEffect(() => {
        console.log(id)
        fetchData()
    }, [isFocused])


    const fetchData = () => {
        axios.get(`${BASE_URL}/api/offers/`)
          .then(response => {
            console.log("check")
            dummy = response.data.filter(item => {
                return (item.sender === data.id && item.receiver === id) || (item.sender === id && item.receiver === data.id)
            })
            if (dummy.length !== 0) {
                setOffer(dummy[0])
                setStatus(dummy[0].status)
                setOffered(true)
                setOfferID(dummy[0].id)
                if (dummy[0].status === "accepted") {
                    axios.get(`${BASE_URL}/api/reviews`)
                    .then(response => {
                        tempReviews = response.data.filter(item => {
                            return item.receiver === data.id
                        })
                        setReviews(tempReviews)
                        console.log(tempReviews.map(item => item.senderID))
                        if (tempReviews.map(item => item.senderID).includes(id)) {
                            setReviewed(true)
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
                }
            }
            console.log(dummy)
          })
          .catch(err => {
            console.log(err)
          })
      }

    const handleSend = (subject, price) => {
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
            setOfferVisible(false)
            fetchData()
        })
        .catch(err => {
            console.error(err)
        })
    }

    const handleUpdate = (subject, price) => {
        axios.patch(`${BASE_URL}/api/offers/update/${offerID}`, {
            subject: subject,
            price: price
        })
        .then(response => {
            console.log(response)
            setOfferVisible(false)
            fetchData()
        })
        .catch(err => {
            console.log(err)
        })
    }

    const handleAccept = () => {
        axios.patch(`${BASE_URL}/api/offers/update/${offerID}`, {
            status: "accepted"
        })
        .then(response => {
            console.log(response)
            setStatus("accepted")
            setOfferVisible(false)
            fetchData()
        })
        .catch(err => {
            console.log(err)
        })
    }

    const handleReject = () => {
        axios.delete(`${BASE_URL}/api/offers/${offerID}`)
        .then(response => {
            console.log(response)
            setOffered(false)
            setOfferVisible(false)
            fetchData()
        })
        .catch(err => {
            console.log(err)
        })
    }

    const handleReview = (comment, rating) => {
        payload = {
            senderID: id,
            sender: name,
            receiver: data.id,
            stars: rating,
            comment: comment
        }
        console.log(payload)
        axios.post(`${BASE_URL}/api/reviews/`, payload)
        .then(response => {
            console.log(response)
            setVisible(false)
            setReviewed(true)
            fetchData()
        })
        .catch(err => {
            console.log(err)
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
                {offer.sender !== id ? <DialogActions>
                    <Button
                    title = "ACCEPT"
                    compact
                    variant = "text"
                    onPress = {() => {handleAccept()}}
                    />
                    <Button
                    title = "REJECT"
                    compact
                    variant = "text"
                    onPress = {() => {handleReject()}}
                    />
                    <Button
                    title = "CLOSE"
                    compact
                    variant = "text"
                    onPress = {()=> setOfferVisible(false)}
                    />
                </DialogActions> :
                <View>
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
                    title = "MODIFY"
                    compact
                    variant = "text"
                    onPress = {() => {handleUpdate(subject, price)}}
                    />
                    <Button
                    title = "CLOSE"
                    compact
                    variant = "text"
                    onPress = {()=> setOfferVisible(false)}
                    />
                </DialogActions></View>}
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
                    onPress = {() => {handleSend(subject, price)}}
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
            {status === "accepted" && !reviewed ? <Button
            title = "LEAVE REVIEW"
            style = {{margin:5}}
            onPress = {()=> setVisible(true)}
            />: <></>}
            <Dialog visible = {visible} onDismiss = {()=> setVisible(false)}>
                <DialogHeader title = "REVIEW"/>
            <DialogContent>
            <TextInput 
                variant = "standard"
                onChangeText={text => {setComment(text)}} />
            <RatingInput
                    rating={rating} 
                    setRating={setRating} 
                    size={40}  
                    maxStars={5} 
                    bordered={false}  
                    />
                <DialogActions>
                    <Button
                    title = "SEND"
                    compact
                    variant = "text"
                    onPress = {() => {handleReview(comment, rating)}}
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
                 {reviews.map(item => 
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