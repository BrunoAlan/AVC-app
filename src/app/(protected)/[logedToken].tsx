import { useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';
import i18next from 'i18next';
const LogedToken = () => {
    const { logedToken: token } = useLocalSearchParams();
    return (
        <View>
            <Text style={{ textAlign: 'auto' }}>{token}</Text>
            <Text>{i18next.t('bf.contactUs')}</Text>
        </View>
    );
};
export default LogedToken;
// i18nLabel[bf.contactUs]
