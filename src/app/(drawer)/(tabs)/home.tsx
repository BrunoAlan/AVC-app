import { useContracts } from '@src/hooks/useContracts';
import { useContractStore } from '@src/stores/contractStores';
import { Link } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';
import { useEffect } from 'react';
import Button from '@src/components/ui/Button';
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
