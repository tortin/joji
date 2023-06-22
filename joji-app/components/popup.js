import { StyleSheet, View, Dimensions, Image, Pressable, IconName } from "react-native";
import React, {useState} from "react";
import { Provider, Button, Dialog , DialogHeader, DialogActions,DialogContent, Text, Avatar } from "@react-native-material/core";
import { Icon } from "@react-native-material/core";

const PopUp = (props) => {
    return (
    <Provider>
            <Dialog visible={props.visible}>
                <DialogHeader title = "MORE INFORMATION" onDismiss={() => props.dismiss(false)}/>
                <DialogContent>
                    <Text style = {styles.card}> NAME: </Text>
                    <Text style = {styles.card}> GENDER: </Text>
                    <Text style = {styles.card}> AGE: </Text>
                    <Text style = {styles.card}> SUBJECTS: </Text>
                    <Text style = {styles.card}> LOCATION: </Text>
                    <Text style = {styles.card}> REMARKS: </Text>
                </DialogContent>
                <DialogActions>
                    <Button
                    title = "OK"
                    compact
                    variant="text"
                    onPress = {() => props.dismiss(false)}
                />
                </DialogActions>
            </Dialog>
        </Provider>
        );
    };

export default PopUp

const styles = StyleSheet.create({
    card: {
        height: 30,
        width: 110,
        marginTop:20,
        marginRight: 100,
        
    },

})