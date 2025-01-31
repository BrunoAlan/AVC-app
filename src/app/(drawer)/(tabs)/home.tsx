import { ThemedText } from '@src/components';
import Button from '@src/components/ui/Button';
import { useProperties } from '@src/hooks/useProperties';
import { useSearchParamsStore } from '@src/stores/searchParamsStore';
import { View, Text, StyleSheet } from 'react-native';

const Home = () => {
    const { checkIn, checkOut, setCheckIn, setCheckOut } =
        useSearchParamsStore();

    const { properties } = useProperties({
        channelId: 'AVC_DEMO',
        checkIn,
        checkOut,
    });

    return (
        <View style={styles.container}>
            <ThemedText>{checkIn}</ThemedText>
            <ThemedText>{checkOut}</ThemedText>
            <Button
                title='Set'
                onPress={() => {
                    setCheckIn('2025-02-01');
                    setCheckOut('2025-02-02');
                }}
            ></Button>
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
