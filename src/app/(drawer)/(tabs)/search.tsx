import { FullScreenLoading, ThemedText } from '@src/components';
import { useProperties } from '@src/hooks/useProperties';
import { View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import Card from '@src/components/ui/Card';
import { useSearchParamsStore } from '@src/stores/searchParamsStore';

const Search = () => {
    const { checkIn, checkOut, country, customClassification } =
        useSearchParamsStore();
    const { properties, isFetching } = useProperties({
        channelId: 'AVC_DEMO',
        checkIn,
        checkOut,
        country,
        customClassification,
    });

    if (isFetching) {
        return <FullScreenLoading />;
    }

    return (
        <View style={{ flex: 1 }}>
            <FlashList
                data={properties?.properties}
                estimatedItemSize={272}
                renderItem={({ item }) => (
                    <Card title={item.name}>
                        <ThemedText>{item.description || ''}</ThemedText>
                    </Card>
                )}
            />
        </View>
    );
};
export default Search;
