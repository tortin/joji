import { StyleSheet, View, Dimensions, Image, Pressable, IconName } from "react-native";
import React, {useState} from "react";
import { Provider, Button, Dialog , DialogHeader, DialogActions,DialogContent, Text, Avatar } from "@react-native-material/core";

const PopUp = (props) => {
    return (
    <Provider>
            <Dialog visible={props.visible}>
            <View style={{backgroundColor:'#F5F5F4'}}>
                <DialogHeader title = "MORE INFORMATION" onDismiss={() => props.dismiss(false)} />
                    <DialogContent>
                        <Text style={styles.card}>
                            <Text style = {{fontWeight: "bold"}}>Name: </Text>
                            <Text>{props.data.name}</Text>
                        </Text>
                        <Text style={styles.card}>
                            <Text style = {{fontWeight: "bold"}}>Gender: </Text>
                            <Text>{props.data.gender}</Text>
                        </Text>
                        <Text style={styles.card}>
                            <Text style = {{fontWeight: "bold"}}>Age: </Text>
                            <Text>{props.data.age}</Text>
                        </Text>
                        <Text style={styles.card}>
                            <Text style = {{fontWeight: "bold"}}>Price: </Text>
                            <Text>{props.data.price}</Text>
                        </Text>
                        <Text style = {{fontWeight:'bold', marginLeft:-10, marginTop:10}}>Subjects:</Text>
                        {props.data.subjects.map((item, i) => (
                            <Text style={{marginLeft: -10}} key={i}>{item}</Text>
                        ))}
                        <Text style = {{fontWeight:'bold', marginLeft:-10, marginTop:10}}>Locations:</Text>
                        {props.data.locations.map((item, i) => (
                            <Text style={{marginLeft: -10}} key={i}>{item}</Text>
                        ))}
                        <Text style={styles.card}>
                            <Text style = {{fontWeight: "bold"}}>Remarks: </Text>
                            <Text>{props.data.remarks}</Text>
                        </Text>
                        <Text style={styles.card}>
                            <Text style = {{fontWeight: "bold"}}>Experience: </Text>
                            <Text>{props.data.experience}</Text>
                        </Text>
                    </DialogContent>
                <DialogActions>
                    <Button
                    title = "OK"
                    compact
                    variant="text"
                    onPress = {() => props.dismiss(false)}
                />
                </DialogActions>
            </View>
            </Dialog>
    </Provider>
        );
    };

export default PopUp

const styles = StyleSheet.create({
    card: {
        marginTop:10,
        marginLeft: -10,
    },

})