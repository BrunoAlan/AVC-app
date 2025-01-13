import { useLocalSearchParams } from 'expo-router';
import { Text, Pressable, View } from 'react-native';
import { useLanguage } from '../../providers/Language.provider';
import i18next from 'i18next';
import { CustomText } from '@/src/components/CustomText';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const LogedToken = () => {
    const { logedToken: token } = useLocalSearchParams();
    const { currentLanguage, changeLanguage } = useLanguage();
    const { top } = useSafeAreaInsets();

    return (
        <View style={{ flex: 1, marginTop: top }}>
            <CustomText>{token?.toString()}</CustomText>
            {/* Mostrar el texto traducido */}
            <CustomText>{i18next.t('bf.contactUs')}</CustomText>

            {/* Botón para cambiar el idioma */}
            <Pressable
                onPress={() => {
                    const newLanguage = currentLanguage === 'en' ? 'ar' : 'en'; // Alternar entre inglés y árabe
                    changeLanguage(newLanguage);
                }}
            >
                <CustomText>Cambiar idioma</CustomText>
            </Pressable>
        </View>
    );
};

export default LogedToken;
