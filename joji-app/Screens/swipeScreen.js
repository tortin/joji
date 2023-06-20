import { Image, StyleSheet, Text, View} from 'react-native';
import SwipeableCard from '../components/swipeableCard';
import { useState, useEffect, useRef } from 'react';
import { BASE_URL } from '../config';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import jwt_decode from 'jwt-decode';
import { useIsFocused } from '@react-navigation/native';
import Swiper from 'react-native-deck-swiper'
import { IconButton } from '@react-native-material/core';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

function SwipeScreen () {
    
  const useSwiper = useRef(null).current
  const handleOnSwipedLeft = () => useSwiper.swipeLeft()
  const handleOnSwipedTop = () => useSwiper.swipeTop()
  const handleOnSwipedRight = () => useSwiper.swipeRight()
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
    <SwipeableCard style={styles.card} card={data[0]} />
    return (
      <View style={styles.container}>
        <View style={styles.swiper}>
          <Swiper
            ref={useSwiper}
            animateCardOpacity
            cards={data}
            renderCard={card => <SwipeableCard style={styles.card} card={card} />} 
            showSecondCard
            stackSize={2}
            backgroundColor='#F5F5F4'/>
        </View>
        <View style={styles.icons}>
        <IconButton
          icon={props => <Icon name="close" {...props} />}
          onPress={handleOnSwipedLeft}
          color="white"
          backgroundColor="#E5566D"
          style={styles.button}
        />
        <IconButton
          icon={props => <Icon name="information-outline" {...props} />}
          onPress={handleOnSwipedRight}
          color="white"
          backgroundColor="#FFDF00"
          style={styles.button}
        />
        <IconButton
          icon={props => <Icon name="heart" {...props} />}
          onPress={handleOnSwipedRight}
          color="white"
          backgroundColor="#4CCC93"
          style={styles.button}
        />
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
    },
    swiper: {
      flex: 4
    },
    icons: {
      flex: 1,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-around'
    },
  });
  