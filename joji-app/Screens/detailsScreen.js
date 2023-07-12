
import React, { useState } from "react";
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



function DetailsScreen( {route, navigation}) {
    

    const { data } = route.params
    const [offered, setOffered] = useState(true)
    const [visible, setVisible] = useState(false)
    const [offerVisible, setOfferVisible] = useState(true)
    const [rating,setRating] = React.useState(0);

    const handleSubmit = () => {
        if (offered) {
            // display popup to accept offer
            // if accepted, send to backend that offer is accepted
            // otherwise, send to backend to reset the offer message
        } else {
            
    }};


    return (
        <Provider>
        <ScrollView>
        <Button
            title = "VIEW OFFER"
            style = {{margin:5}}
            onPress = {() => {setOfferVisible(true)}}
            />
            <Dialog visible = {offerVisible} onDismiss = {()=> setOfferVisible(true)}>
                {offered ? 
                (
                <View>
                <DialogHeader title = "OFFER:"/>
                <DialogContent>
                <Text> text </Text>
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
                </DialogActions>
            </DialogContent>
            </View>) : (
                <View>
                <DialogHeader title = "SEND OFFER"/>
                <DialogContent>
                <TextInput label = "Subject:" variant = "standard" />
                <TextInput label = "Price:" variant = "standard" />
            
            <DialogActions>
                    <Button
                    title = "OK"
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
            </View>) 
            }
            </Dialog>
            <Button
            title = "LEAVE REVIEW"
            style = {{margin:5}}
            onPress = {()=> setVisible(true)}
            />
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
                 <Avatar label="Jowena Pang" autoColor size={35} style ={{marginTop:20, marginRight:300 }  }  />
                 <Text style = {{marginTop:-40, marginRight:130, fontWeight:"bold"}}>Jowena Pang </Text>
                 <Rating stars={3.5} maxStars={5} size={30} style = {{marginTop:30}}/>
                 <Text style = {{marginTop:10,marginLeft:50 ,  width:320}}> " My overall experience with JOJI is really great, because it is user friendly and easy to use"</Text>

                 <Avatar label="Wei Jian" autoColor size={35} style ={{marginTop:50, marginRight:300 }  }  />
                 <Text style = {{marginTop:-40, marginRight:130, fontWeight:"bold"}}>Low Wei Jian </Text>
                 <Rating stars={4} maxStars={5} size={30} style = {{marginTop:30}}/>
                 <Text style = {{marginTop:10,marginLeft:50 ,  width:320}}> " JOJI has really automated some of our company’s processes. We now spend less time doing manual work. "</Text>


                 <Avatar label="Annie Wong" autoColor size={35} style ={{marginTop:50, marginRight:300 }  }  />
                 <Text style = {{marginTop:-40, marginRight:130, fontWeight:"bold"}}>Annie Wong </Text>
                 <Rating stars={3} maxStars={5} size={30} style = {{marginTop:30}}/>
                 <Text style = {{marginTop:10,marginLeft:50 ,  width:320}}> " JOJI has helped my child found his perfect match and he managed to score a 90/100 in his recent test"</Text>

    

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