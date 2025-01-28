import { useContracts } from '@src/hooks/useContracts';
import { useContractStore } from '@src/stores/contractStores';
import { Link } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';
import { useEffect } from 'react';
const Home = () => {
    const { setSelectedContract } = useContractStore();
    const { contracts } = useContracts();

    useEffect(() => {
        if (contracts && contracts?.length > 0) {
            setSelectedContract(contracts[0].id);
        }
    }, [contracts]);

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
