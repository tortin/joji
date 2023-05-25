import { Badge, Button } from '@react-native-material/core';
import React from 'react';
import { Image, View, StyleSheet, Dimensions, ImageBackground, Pressable } from 'react-native';
import { Text } from '@react-native-material/core'

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const SwipeableCard = ({card}) => {

    return (
        <View style={{backgroundColor:"ffcccc"}}>
            <View style={styles.card}>
                <Image
                    source={card.uri}
                    style={styles.image} />
                <View style={styles.nameContainer}>
                    <Text variant="h3">{card.name}</Text>
                </View>
                <View style={styles.badgeContainer}>
                    {card.subjects.map((subject) => (
                        <Badge label={subject} style={styles.badge} />
                    ))}
                    {card.level.map((level) => (
                        <Badge label={level} color="purple" style={styles.badge}/>
                    ))}
                </View>
            </View>
            <View style={styles.optionsContainer}>
                <Pressable>
                    <Image style={styles.select} source={require('../assets/cross.jpg')}/>
                </Pressable>
                <Pressable>
                    <Image style={styles.select} source={require('../assets/tick.png')} />
                </Pressable>
            </View>
        </View>
    )
}

export default SwipeableCard;

const styles = StyleSheet.create({
    image: {
        width: SCREEN_WIDTH - 50,
        height: SCREEN_WIDTH - 50,
        resizeMode: 'cover',
    },
    card: {
        marginTop: 100,
        borderWidth: 2,
    },
    badge: {
        marginHorizontal: 1,
    },
    badgeContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: SCREEN_WIDTH - 50,
        flexWrap: 'wrap',
        alignItems: 'center',
    },
    nameContainer: {
        alignItems:"center",
    },
    select: {
        width: 60,
        height: 60,
    },
    optionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
    }
})