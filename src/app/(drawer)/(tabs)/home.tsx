import { useChannels } from '@src/hooks/useChannels';
import { Link } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';
const Home = () => {
    const { channels } = useChannels();
    return (
        <View style={styles.container}>
            <Text>home</Text>
            <Link href='/(modals)/contract'>
                <Text>contract</Text>
            </Link>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Home;
