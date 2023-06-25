import { View, Text, StyleSheet } from "react-native"
import Message from "../components/message";
import { useState } from "react";
import { Button, TextInput } from "@react-native-material/core";
import { FlatList } from "react-native-gesture-handler";
import { useContext } from "react";
import jwt_decode from 'jwt-decode';
import { AuthContext } from "../context/AuthContext";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useEffect, useLayoutEffect } from "react";
import socket from "../utils/socket";

function MessageScreen ({route, navigation}) {

    const { name, id } = route.params;
    const [message, setMessage] = useState("")
    const [chatMessages, setChatMessages] = useState([])
    const {token} = useContext(AuthContext)
    const user_id = jwt_decode(token).user_id

	useLayoutEffect(() => {
		navigation.setOptions({ title: name });
		socket.emit("findRoom", id);
		socket.on("foundRoom", (roomChats) => setChatMessages(roomChats));
	}, [socket]);

	useEffect(() => {
		socket.on("foundRoom", (roomChats) => setChatMessages(roomChats));
	}, [socket]);

    const handleMessageSubmit = () => {
        const hour =
            new Date().getHours() < 10
                ? `0${new Date().getHours()}`
                : `${new Date().getHours()}`;
    
        const mins =
            new Date().getMinutes() < 10
                ? `0${new Date().getMinutes()}`
                : `${new Date().getMinutes()}`;
    
        socket.emit("newMessage", {
            message,
            room_id: id,
            user: user_id,
            timestamp: { hour, mins },
        });
    };

    return (
        <View style={{flex: 1}}>
            {chatMessages.length !== 0 ? 
            (<View style={styles.messageContainer}>
            <FlatList
                data={chatMessages}
                renderItem={({ item }) => (
                    <Message item={item} user={user_id} />
                )}/>
            </View>) : 
            <View style={styles.messageContainer}>
                <Text>Start the conversation!</Text>    
            </View>}
            <View style={styles.inputContainer}>
                <View style={styles.messageBox}>                
                    <TextInput 
                        style={styles.input}
                        onChangeText={text => {setMessage(text)}} />
                </View>
                <View style={styles.buttonContainer}>
                    <Button 
                    trailing={props => <Icon name="send" {...props}/>}
                    style={styles.button}
                    onPress={handleMessageSubmit} />
                </View>
            </View>
        </View>
    )
}

export default MessageScreen;

const styles = StyleSheet.create({
    messageContainer: {
        flex: 6
    },
    inputContainer: {
        flex: 1,
        alignItems:"center",
        flexDirection: 'row',
        backgroundColor: "white"
    },
    messageBox: {
        flex: 4,
    },
    input: {
        alignSelf:"center",
        width: "90%",
    },
    button: {
        width: "80%",
    },
    buttonContainer: {
        flex: 1
    }
})