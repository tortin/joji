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
import PopUp from '../components/popup';
import socket from "../utils/socket";

function SwipeScreen () {

  const [visible, setVisible] = useState(false)
  const isFocused = useIsFocused()
  const useSwiper = useRef(null)
  const handleOnSwipedLeft = () => useSwiper.current.swipeLeft()
  const handleOnSwipedRight = () => useSwiper.current.swipeRight()
  const {token} = useContext(AuthContext);
  const id = jwt_decode(token).user_id
  const [data, setData] = useState()
  const [type, setType] = useState()
  const [selfData, setSelfData] = useState()
  const [indx, setIndx] = useState(0)

  // Dislike handler
  const handleLeftSwipe = (index) => {
    matchData = data[index]
    matchId = matchData.id
    setIndx(indx + 1)
    console.log(indx)
    if (!selfData.rejects.includes(matchId)) {
        selfData.rejects.push(matchId)
    }
    axios.patch(`${BASE_URL}/api/update/${id}/`, {
      "rejects": selfData.rejects
    })
    .catch(e => {
      console.log(e)
    })
  }

  // Like handler
  const handleRightSwipe = (index) => {
    matchData = data[index]
    matchId = matchData.id
    setIndx(indx + 1)
    console.log(indx)
    if (matchData.likes.includes(id)) {
      idx = matchData.likes.indexOf(id)
      matchData.likes.splice(idx, 1)
      matchData.matches.push(id)
      selfData.matches.push(matchId)
      console.log(selfData.matches)
      socket.emit("createRoom", selfData.name + " and " + matchData.name +"'s Chat", [id, matchId])
      axios.patch(`${BASE_URL}/api/update/${id}/`, {
        "matches": selfData.matches
      })
      .catch(e => {
        console.log(e)
      })
      axios.patch(`${BASE_URL}/api/update/${matchId}/`, {
        "matches": matchData.matches,
        "likes": matchData.likes
      })
      .catch(e => {
        console.log(e)
      })
    }
    else {
      selfData.likes.push(matchId)
      console.log(selfData.likes)
      axios.patch(`${BASE_URL}/api/update/${id}/`, {
        "likes": selfData.likes
      })
      .catch(e => {
        console.log(e)
      })
    }
  }

  const showDetails = () => {
    setVisible(true)
    console.log(visible)
    console.log(data[indx])
  }


  //Fetch data on page render, refresh everytime screen is focused
  useEffect(() => {
      if(isFocused) {
          fetchData()
      }
  }, [isFocused])

  const fetchData = () => {
    axios.get(`${BASE_URL}/api/`)
      .then(response => {
          temp = response.data
          tempSelfData = temp.filter(item => {
            return item.id === id
          })[0]
          setSelfData(tempSelfData)
          temp.forEach((item) => {
          if (item.id === id) {
            tempType = item.type
            setType(item.type)
          }
      })
          if (tempType !== undefined){
          temp = temp.filter(item => {
              return (item.type !== tempType) && (!tempSelfData.rejects.includes(item.id)) && (!tempSelfData.likes.includes(item.id)) && (!tempSelfData.matches.includes(item.id))
          })}
          console.log(temp)
          setData(temp)
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
    else if (data === undefined){
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      )
    }
    else if (data.length === 0) {
      return (
        <View>
          <Text>That&#39;s all for now!</Text>
        </View>
      )
    }
    else {
    return (
      <View style={styles.container}>
        <View style={styles.swiper}>
          <Swiper
            ref={useSwiper}
            verticalSwipe={false}
            animateCardOpacity
            cards={data}
            renderCard={card => (<SwipeableCard style={styles.card} card={card}/>)} 
            showSecondCard
            stackSize={2}
            onSwipedLeft={(index) => {handleLeftSwipe(index)}}
            onSwipedRight={(index) => {handleRightSwipe(index)}}
            onTapCard={showDetails}
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
          color="white"
          onPress={showDetails}
          backgroundColor="blue"
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
      {indx < data.length ? 
      <PopUp visible={visible} dismiss={setVisible} data={data[indx]}/> : 
      <></>}
      </View>
  )}
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
  