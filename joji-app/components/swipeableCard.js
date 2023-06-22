import { Badge } from '@react-native-material/core';
import React from 'react';
import { Image, View, StyleSheet, Dimensions } from 'react-native';
import { Text } from '@react-native-material/core'

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const SwipeableCard = ({card,}) => {

    return (
        <View style={styles.card}>
            <Image
                source={{uri: `${card.image}`}}
                style={styles.image} />
            <View>
                <View style={styles.nameContainer}>
                    <Text style={styles.header}>{card.name}, {card.age}</Text>
                </View>
                <Text style={styles.subheader}>Subjects</Text>
                <View style={styles.badgeContainer}>
                    {card.subjects.map((subject, i) => (
                        <Badge key={i} label={subject} style={styles.badge} />
                    ))}
                </View>
                <Text style={styles.subheader}>Locations</Text>
                <View style={styles.badgeContainer}>
                    {card.locations.map((location, i) => (
                        <Badge key={i} label={location} style={[styles.badge, {backgroundColor:"lightblue"}]} />
                    ))}
                </View>
                <Text style={styles.subheader}>Price</Text>
                <Text style={styles.price}>{card.price}</Text>
                <Text>{id}</Text>
            </View>
        </View>
    )
}

export default SwipeableCard;

const styles = StyleSheet.create({
    image: {
        width: SCREEN_WIDTH * 0.9,
        height: SCREEN_WIDTH * 0.9,
        resizeMode: 'cover',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    card: {
        backgroundColor: "#ffffff",
        borderRadius: 20,
        height: SCREEN_HEIGHT * 0.65,
    },
    badge: {
        marginHorizontal: 1,
    },
    badgeContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
        alignItems: 'center',
        marginVertical: 3,
    },
    nameContainer: {
        marginLeft: 20,
        marginTop: 10,
    },
    header: {
        fontSize: 32,
        fontWeight: 500,
    },
    subheader: {
        fontSize: 16,
        fontWeight: 700,
        marginTop: 5,
        alignSelf: 'center',
    },
    price: {
        marginTop: 3,
        fontSize: 24,
        fontWeight: 700,
        alignSelf:'center',
        
    }
})