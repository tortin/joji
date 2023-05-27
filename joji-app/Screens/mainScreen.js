import { StyleSheet, Text, View} from 'react-native';
import SwipeableCard from '../components/swipeableCard';
import DUMMY_DATA from './dummyData';


function MainScreen () {
    return (
        <View style={styles.container}>
            <SwipeableCard style={styles.card} card={DUMMY_DATA[0]} />
        </View>
    )
}

export default MainScreen;

const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      backgroundColor: "#ffcccc",
    },
  });
  