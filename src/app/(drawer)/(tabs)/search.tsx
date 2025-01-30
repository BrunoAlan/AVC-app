import { FullScreenLoading } from '@src/components';
import { useProperties } from '@src/hooks/useProperties';
import { ScrollView, Text } from 'react-native';
const Search = () => {
    const { properties, isFetching } = useProperties('AVC_DEMO');

    if (isFetching) {
        return <FullScreenLoading />;
    }

    return (
        <ScrollView>
            <Text>{JSON.stringify(properties)}</Text>
        </ScrollView>
    );
};
export default Search;
