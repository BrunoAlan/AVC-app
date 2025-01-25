import FullScreenLoadings from '@/src/components/Loading/FullScreenLoading';
import { useContracts } from '@/src/hooks/useContracts';
import { View, Text } from 'react-native';
const Home = () => {
    const { contracts, isLoading } = useContracts();

    if (isLoading) {
        return <FullScreenLoadings />;
    }
    return (
        <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
            <Text>{JSON.stringify(contracts)}</Text>
        </View>
    );
};
export default Home;
