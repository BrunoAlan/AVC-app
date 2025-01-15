import { useLocalSearchParams } from 'expo-router';
import { Text, Pressable, View } from 'react-native';
import { useLanguage } from '../../providers/Language.provider';
import i18next from 'i18next';
import { CustomText } from '@/src/components/CustomText';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';
import { getUser } from '@/src/actions/user/get-user';

const LogedToken = () => {
    const { logedToken: token } = useLocalSearchParams();
    const { currentLanguage, changeLanguage } = useLanguage();
    const { top } = useSafeAreaInsets();

    const { data } = useQuery({
        queryKey: ['user'],
        queryFn: getUser,
        enabled: !!token,
    });

    return (
        <View style={{ flex: 1, marginTop: top }}>
            <CustomText>{token?.toString()}</CustomText>
            {/* Mostrar el texto traducido */}
            <CustomText>{JSON.stringify(data, null, 2)}</CustomText>

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
