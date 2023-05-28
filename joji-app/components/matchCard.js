import { Badge } from '@react-native-material/core';
import { Text, StyleSheet, View, Dimensions, Image, Pressable } from 'react-native';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

function MatchCard(props) {
    console.log
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={require('../assets/dp1.jpg')} />
            <View style={styles.mainContainer}>
                {props.data.subjects.map((subject, i) => (
                    <Badge key={i} label={subject} style={styles.badge} />
                ))}
                <Badge label={props.data.price} style={styles.badge} />
                {props.data.locations.map((location, i) => (
                    <Badge key={i} label={location} style={styles.badge} />
                ))}
            </View>
            <View style={styles.optionsContainer}>
                <Pressable style={styles.option}>
                    <Image source={require('../assets/details.png')} style={styles.optionImage} />
                </Pressable>
                <Pressable style={styles.option}>
                    <Image source={require('../assets/chat.png')} style={styles.optionImage} />
                </Pressable>
                <Pressable style={styles.option}>
                    <Image source={require('../assets/cross.png')} style={styles.optionImage} />
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
        width: '90%',
        alignSelf: 'center'
    },
    optionsContainer: {
        flex: (1 - SCREEN_HEIGHT * 0.14 / SCREEN_WIDTH) * 0.15,
    },
    option: {
        flex: 1,
        justifyContent: 'center',
        borderWidth: 1,
    },
    optionImage: {
        width: 25,
        height: 25,
        alignSelf: 'center'
    }
})