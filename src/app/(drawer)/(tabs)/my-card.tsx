import { StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';
import { useAccount } from '@src/hooks/useAccount';
const MyCard = () => {
    const { account } = useAccount();
    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={`https://myclubprivileges.anantaravacationclub.com/api/images/cardface?email=${account?.primary.email}`}
                contentFit='contain'
                transition={1000}
            />
        </View>
    );
};
export default MyCard;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        flex: 1,
        width: '100%',
        transform: [{ rotate: '90deg' }],
    },
});
