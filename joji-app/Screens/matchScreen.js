import { ScrollView, StyleSheet, View, Text } from 'react-native';
import MatchCard from '../components/matchCard';
import DUMMY_DATA from './dummyData';
import { useState, useEffect } from 'react'

function MatchScreen() {

    const [data, setData] = useState([])
    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async() => {
      const response = await fetch('http://192.168.1.26:8000/api/')
      const data = await response.json()
      setData(data)
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {data.map((profile, i) => (
                <MatchCard data={profile} key = {i}/>
            ))}
        </ScrollView>
    )
}

export default MatchScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F5F4",
    }
})