import { ThemedText } from '@src/components';
import Button from '@src/components/ui/Button';
import { useSearchParamsStore } from '@src/stores/searchParamsStore';
import { View, Text, StyleSheet } from 'react-native';
import { useRegions } from '@src/hooks/useRegions';
import CountryCitySearch from '@src/components/DestinationModal/DestinationModal';
import CustomCalendar from '@src/components/Calendar/Calendar';

const Home = () => {
    const { regions } = useRegions({
        channelId: 'AVC_DEMO',
        language: 'en',
    });

    if (!regions) {
        return <Text>Loading...</Text>;
    }

    return (
        <View style={styles.container}>
            <CustomCalendar />
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
