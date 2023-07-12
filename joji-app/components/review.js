import { Avatar, Provider } from "@react-native-material/core";
import { Rating } from 'react-native-stock-star-rating';
import { View, Text } from "react-native";



const Review = (props) => {

    return(
    <View>
    <Avatar label= {props.review.sender} autoColor size={35} style = {{marginLeft: 25,marginTop:15,}} />
    <Text style = {{ marginLeft:70, marginTop: -30, marginBottom:20,fontWeight:"bold"}}>{props.review.sender}</Text>
    <View style = {{marginLeft:80,marginTop:-15,marginBottom:10,}}>
    <Rating stars={props.review.stars} maxStars={5} size={30}/>
    </View>

    <Text style = {{marginLeft:20, marginRight:20,marginBottom:20,}}>{props.review.comment}</Text>
    </View>)

}

export default Review

