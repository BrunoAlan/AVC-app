import { useContracts } from '@src/hooks/useContracts';
import { useContractStore } from '@src/stores/contractStores';
import { Link } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';
import { useEffect } from 'react';
import Button from '@src/components/ui/Button';
import { useAccount } from '@src/hooks/useAccount';
import { FullScreenLoading } from '@src/components';
const Home = () => {
    const { setSelectedContract } = useContractStore();
    const { isFetching: contractsFetching, contracts } = useContracts();
    const { isFetching: accountFetching, account } = useAccount();

    useEffect(() => {
        if (contracts && !account?.hasMultipleContracts) {
            setSelectedContract(contracts.at(0)?.id!);
        }
    }, [contracts]);

    if (contractsFetching || accountFetching) {
        return <FullScreenLoading />;
    }

    return (
        <View style={styles.container}>
            <Text>home</Text>
            <Link asChild href='/(modals)/contract'>
                <Button title='Go to contract' onPress={() => {}} />
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
