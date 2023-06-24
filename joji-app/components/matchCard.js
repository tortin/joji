import { Badge } from '@react-native-material/core';
import { StyleSheet, View, Dimensions, Image, Pressable } from 'react-native';
import axios from 'axios';
import { BASE_URL } from '../config';
import { IconButton } from '@react-native-material/core';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useNavigation } from '@react-navigation/native';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

function MatchCard(props) {

    const navigation = useNavigation();

    const handleUnmatch = (matchData, id, key, selfData, stateChanger) => {
        console.log(matchData)
        console.log(selfData)
        idx1 = matchData.matches.indexOf(id)
        idx2 = selfData.matches.indexOf(key)
        if (idx1 !== -1) {
            matchData.matches.splice(idx1, 1)
        }
        if (idx2 !== -1) {
            selfData.matches.splice(idx2, 1)
        }
        if (!matchData.rejects.includes(id)) {
            matchData.rejects.push(id)
        }
        if (!selfData.rejects.includes(key)) {
            selfData.rejects.push(key)
        }
        console.log(selfData)
        console.log(matchData)
        axios.patch(`${BASE_URL}/api/update/${id}/`, {
            "matches": selfData.matches,
            "rejects": selfData.rejects
        })
        .then(() => {
            axios.patch(`${BASE_URL}/api/update/${key}/`, {
                "matches": matchData.matches,
                "rejects": matchData.rejects
            })
        })
        .then(() => {
            stateChanger()
        })
        .catch(e => {
            console.log(e)
        })
    }

    const handleNavigation = () => {
        console.log(props.room.id)
        navigation.navigate("Message", {
            id: props.room.id,
            name: props.room.name
        })
    }

    return (
        <View style={styles.container}>
            <Image style={styles.image} source={{uri: `${props.data.image}`}} />
            <View style={styles.mainContainer}>
                {props.data.subjects.slice(0, 2).map((subject, i) => (
                    <Badge key={i} label={subject} style={styles.badge} />
                ))}
                <Badge label={props.data.price} style={styles.badge} />
                {props.data.locations.slice(0, 2).map((location, i) => (
                    <Badge key={i} label={location} style={styles.badge} />
                ))}
            </View>
            <View style={styles.optionsContainer}>           
                <IconButton
                icon={props => <Icon name="information-outline" {...props} />}
                color="white"
                backgroundColor="blue"
                style={styles.optionImage}
                onPress={() => {props.show(true)}}
                />         
                <IconButton
                icon={props => <Icon name="chat" {...props} />}
                color="white"
                backgroundColor="green"
                style={styles.optionImage}
                onPress={handleNavigation}
                />         
                <IconButton
                icon={props => <Icon name="close" {...props} />}
                onPress={() => {handleUnmatch(props.data, props.id, props.matchId, props.selfData, props.stateChanger)}}
                color="white"
                backgroundColor="#E5566D"
                style={styles.optionImage}
                />
            </View>
        </View>
    )
}

 export default MatchCard;

 const styles = StyleSheet.create({
    container:{
        height: SCREEN_HEIGHT * 0.14,
        width: SCREEN_WIDTH * 0.95,
        flexDirection: 'row',
        borderWidth: 2,
        flexWrap: 'wrap',
        alignSelf: 'center',
        marginTop: 8,
        backgroundColor: "#fff",
        borderRadius: 5,
    },
    image: {
        resizeMode: 'cover',
        height: SCREEN_HEIGHT * 0.14 - 4,
        width: SCREEN_HEIGHT * 0.14 - 4,
        flex: (SCREEN_HEIGHT * 0.14)/SCREEN_WIDTH,
    },
    mainContainer: {
        flex: (1 - SCREEN_HEIGHT * 0.14 / SCREEN_WIDTH) * 0.85,
        flexDirection: 'column',
    },
    textContainer: {
        flex: 1,
        alignItems:'center',
    },
    badge: {
        backgroundColor:"#cbefdc",
        marginTop: 1,
        width: '95%',
        alignSelf: 'center'
    },
    optionsContainer: {
        flex: (1 - SCREEN_HEIGHT * 0.14 / SCREEN_WIDTH) * 0.15,
        justifyContent: 'space-around'
    },
    optionImage: {
        width: 32,
        height: 32,
        alignSelf: 'center'
    }
})