import { Image, StyleSheet, Text, View} from 'react-native';
import SwipeableCard from '../components/swipeableCard';
import DUMMY_DATA from './dummyData';


function MainScreen () {
    return (
        <View style={styles.container}>
            <SwipeableCard style={styles.card} card={DUMMY_DATA[0]} />
            <View style={styles.options}>
              <Image style={styles.image} source={require('../assets/tick.png')} />
              <Image style={styles.image} source={require('../assets/cross.png')} />
            </View>
        </View>
    )
}

export default MainScreen;

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
  