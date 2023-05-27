import { Badge } from '@react-native-material/core';
import { Text, StyleSheet, View, Dimensions, Image, Pressable } from 'react-native';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

function MatchCard(props) {
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={props.data.uri} />
            <View style={styles.mainContainer}>
                {props.data.subjects.map((subject, i) => (
                    <Badge key={i} label={subject} style={styles.badge} />
                ))}
                <Badge label={props.data.price} color="#DEFFF9" />
                <Badge label={props.data.location} color="#DEFFF9" />
            </View>
            <View style={styles.optionsContainer}>
                <Pressable style={styles.option}>
                    <Image source={require('../assets/details.png')} style={styles.optionImage} />
                </Pressable>
                <Pressable style={styles.option}>
                    <Image source={require('../assets/chat.png')} style={styles.optionImage} />
                </Pressable>
                <Pressable style={styles.option}>
                    <Image source={require('../assets/cross.jpg')} style={styles.optionImage} />
                </Pressable>
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
        backgroundColor: "#DEFFF9",
    },
    image: {
        resizeMode: 'cover',
        height: SCREEN_HEIGHT * 0.14 - 4,
        width: SCREEN_HEIGHT * 0.14 - 4,
        flex: (SCREEN_HEIGHT * 0.14)/SCREEN_WIDTH,
    },
    mainContainer: {
        flex: (1 - SCREEN_HEIGHT * 0.14 / SCREEN_WIDTH) * 0.85,
        flexDirection: 'column'
    },
    badgeContainer: {
        flex: 3,
    },
    textContainer: {
        flex: 1,
        alignItems:'center',
    },
    badge: {
        backgroundColor:"#DEFFF9",
        borderWidth: 1,
        marginTop: 2
    },
    optionsContainer: {
        flex: (1 - SCREEN_HEIGHT * 0.14 / SCREEN_WIDTH) * 0.15,
    },
    option: {
        flex: 1,
        justifyContent: 'center',
    },
    optionImage: {
        width: 25,
        height: 25,
        alignSelf: 'center'
    }
})