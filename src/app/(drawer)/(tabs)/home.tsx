import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet } from 'react-native';

const Home = () => {
    const { t } = useTranslation();

    return (
        <View style={styles.container}>
            <Text>{t('bf.checkout')}</Text>
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
