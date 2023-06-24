import { View, StyleSheet, Text } from "react-native"

function Message ( {item, user} ) {
    return (
    <View style={
        item.user !== user ? styles.container : [styles.container, {alignItems: "flex-end"}]
    }>
        <View style={
            item.user !== user ? styles.message : [styles.message, { backgroundColor: "rgb(194, 243, 194)" }]
        }>
            <Text>{item.text}</Text>
        </View>
    </View>)
}

export default Message

const styles = StyleSheet.create({
    container: {
        alignItems: 'flex-start',
        width: "100%",
        marginTop: 10,
    },
    message: {
        maxWidth: "50%",
        backgroundColor: "#f5ccc2",
        padding: 15,
        borderRadius: 10,
        marginBottom: 2,
    },
})
