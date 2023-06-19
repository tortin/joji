import { Image, StyleSheet, Text, View} from 'react-native';
import SwipeableCard from '../components/swipeableCard';
import { useState, useEffect } from 'react';
import { BASE_URL } from '../config';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import jwt_decode from 'jwt-decode';
import { useIsFocused } from '@react-navigation/native';


function SwipeScreen () {
    
  const isFocused = useIsFocused()
  const {token} = useContext(AuthContext);
  const id = jwt_decode(token).user_id
  const [data, setData] = useState()
  const [type, setType] = useState()


  //Fetch data on page render, refresh everytime matches is updated
  useEffect(() => {
      if(isFocused) {
          fetchData()
      }
  }, [isFocused])

  const fetchData = () => {
    console.log(id)
    axios.get(`${BASE_URL}/api/`)
      .then(response => {
          temp = response.data
          tempType = undefined
          temp.forEach((item) => {
              if (item.id === id) {
                tempType = item.type
                setType(item.type)
              }
          })
          if (tempType !== undefined)
          {setData(temp.filter(item => {
              return item.type !== tempType
          }))}
          console.log(data)
      })
      .catch(err => {
          console.log(err)
      })
  }

    if (type === undefined) {
      return (
        <View>
          <Text>Please create a profile!</Text>
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
    if (data === []) {
      return (
        <View>
          <Text>No matches yet!</Text>
        </View>
      )
    }

    return (
      <View style={styles.container}>
          <SwipeableCard style={styles.card} card={data[0]} />
          <View style={styles.options}>
            <Image style={styles.image} source={require('../assets/tick.png')} />
            <Image style={styles.image} source={require('../assets/cross.png')} />
          </View>
      </View>
  )
}

export default SwipeScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: "#F5F5F4",
      alignItems: 'center'
    },
    card: {
      alignSelf: 'center',
    },
    options: {
      width: "100%",
      flexDirection: 'row',
      marginTop: 20,
      justifyContent: 'space-around'
    },
    image: {
      height: 75,
      width: 75,
    }
  });
  