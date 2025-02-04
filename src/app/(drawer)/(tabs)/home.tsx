import { ThemedText } from '@src/components';
import Button from '@src/components/ui/Button';
import { useProperties } from '@src/hooks/useProperties';
import { useSearchParamsStore } from '@src/stores/searchParamsStore';
import { View, Text, StyleSheet } from 'react-native';
import { useChannels } from '../../../hooks/useChannels';
import { useConfiguration } from '@src/hooks/useConfiguration';
import { useRegions } from '@src/hooks/useRegions';
import CountryCitySearch from '@src/components/DestinationModal/DestinationModal';

const Home = () => {
    const { checkIn, checkOut, setCheckIn, setCheckOut } =
        useSearchParamsStore();

    const { regions } = useRegions({
        channelId: 'AVC_DEMO',
        language: 'en',
    });

    if (!regions) {
        return <Text>Loading...</Text>;
    }

    return (
        <View style={styles.container}>
            <Button
                title='Set'
                onPress={() => {
                    setCheckIn('2025-03-01');
                    setCheckOut('2025-04-02');
                }}
            ></Button>

            <CountryCitySearch data={regions} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default Home;
