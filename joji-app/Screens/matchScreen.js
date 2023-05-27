import { ScrollView, StyleSheet, View, Text } from 'react-native';
import MatchCard from '../components/matchCard';
import DUMMY_DATA from './dummyData';

function MatchScreen() {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            {DUMMY_DATA.map((data, i) => (
                <MatchCard data={data} />
            ))}
        </ScrollView>
    )
}

export default MatchScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffcccc",
    }
})