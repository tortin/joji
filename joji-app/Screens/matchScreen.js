import { ScrollView, StyleSheet, View, Text } from 'react-native';
import MatchCard from '../components/matchCard';
import { useState, useEffect } from 'react'
import { BASE_URL } from '../config';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import jwt_decode from 'jwt-decode';
import PopUp from '../components/popup';

function MatchScreen() {

    const [visible, setVisible] = useState(false)
    const isFocused = useIsFocused()
    const {token} = useContext(AuthContext);
    const id = jwt_decode(token).user_id
    const [data, setData] = useState()
    const [matches, setMatches] = useState([])
    const [selfData, setSelfData] = useState()
    const [rooms, setRooms] = useState([])

    useEffect(() => {
        if(isFocused) {
            fetchData()
        }
    }, [isFocused])

    useEffect(() => {
        function fetchRooms() {
            fetch("http://192.168.1.26:4000/api")
                .then((res) => res.json())
                .then((data) => {
                    setRooms(data)
                    console.log(data)
                })
                .catch((err) => console.error(err));
        }
        fetchRooms();
    }, []);

    const fetchData = () => {
      axios.get(`${BASE_URL}/api/`)
        .then(response => {
            temp = response.data
            temp2 = temp.filter(item => {
                return item.id === id
            })[0]
            setSelfData(temp2)
            setMatches(temp2.matches)
            temp = temp.filter(item => {
                return temp2.matches.includes(item.id)
            })
            setData(temp)
        })
        .catch(err => {
            console.log(err)
        })
    }

    if (matches.length === 0) {
        return (
            <View>
                <Text>No matches currently!</Text>
            </View>
        )
    }

    if (data === undefined){
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      )
    } 

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {data.map((profile, i) => (
                <MatchCard 
                    data={profile} 
                    matchId={profile.id} 
                    id={id} 
                    selfData={selfData} 
                    key={i}
                    stateChanger={fetchData}
                    show={setVisible}
                    room={rooms.filter(room => {
                        return room.users.includes(id) && room.users.includes(profile.id)
                    })[0]}/>
            ))}
            <Text>{"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n"}</Text>
            <PopUp style={styles.dialog} visible={visible} dismiss={setVisible}/>
        </ScrollView>
    )
}

export default MatchScreen;

const styles = StyleSheet.create({
    container: {
    },
    dialog: {
        position: 'fixed',
        top: 200,
        left: 100
    }
})