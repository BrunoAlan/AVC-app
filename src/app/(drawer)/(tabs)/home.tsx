import { useTranslation } from 'react-i18next';
import { changeLanguage } from 'i18next';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useLanguage } from '@src/providers/Language.provider';

const Home = () => {
    const { t } = useTranslation();
    const { currentLanguage } = useLanguage();

    return (
        <View style={styles.container}>
            <Pressable
                style={{ marginTop: 20 }}
                onPress={() => {
                    changeLanguage(currentLanguage === 'en' ? 'ar' : 'en');
                }}
            >
                <Text>{currentLanguage}</Text>
                <Text>{t('bf.checkout')}</Text>
            </Pressable>
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
