import { useContracts } from '@src/hooks/useContracts';
import { useContractStore } from '@src/stores/contractStores';
import { Link } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';
import { useEffect } from 'react';
import { useAccount } from '@src/hooks/useAccount';
import { FullScreenLoading } from '@src/components';
import ThemedButton from '@src/components/ui/ThemedButton';
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
            <Link href={'/contracts'} asChild>
                <Text>home</Text>
            </Link>
            <Link href={'/contracts'} asChild>
                <ThemedButton
                    onPress={() => {
                        console.log('pressed');
                    }}
                >
                    adsa
                </ThemedButton>
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
