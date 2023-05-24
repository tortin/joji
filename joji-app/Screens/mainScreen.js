import { StyleSheet, Text, View} from 'react-native';
import SwipeableCard from '../components/swipeableCard';

const items = [
  { id: "1", 
    uri: require("../assets/cat1.jpg"),
    name: "Cat",
    age: "25",
    subjects: ["English", "Chinese", "Mathematics"],
    level: ["Primary", "Secondary", "Tertiary"],
    gender: "M",
    price: "$30-40",
    location: "NUS",
    experience: "3 years",
  },
]

function MainScreen () {
    return (
        <View style={styles.container}>
            <SwipeableCard style={styles.card} card={items[0]} />
        </View>
    )
}

export default MainScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
    },
  });
  