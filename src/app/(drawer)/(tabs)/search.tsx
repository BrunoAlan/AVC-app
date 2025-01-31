import { FullScreenLoading, ThemedText } from '@src/components';
import { useProperties } from '@src/hooks/useProperties';
import { View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import Card from '@src/components/ui/Card';

const Search = () => {
    const { properties, isFetching } = useProperties('AVC_DEMO');

    if (isFetching) {
        return <FullScreenLoading />;
    }

    return (
        <View style={{ flex: 1 }}>
            <FlashList
                style={{ flex: 1 }}
                data={properties?.properties}
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
