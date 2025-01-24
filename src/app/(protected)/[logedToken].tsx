import { useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';
import { useLanguage } from '../../providers/Language.provider';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';
import { getUser } from '@/src/actions/user/get-user';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';

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
        <View className='flex flex-1 px-2' style={{ marginTop: top }}>
            <Text className='native:text-lg'>{token?.toString()}</Text>
            <Button
                variant={'default'}
                size={'lg'}
                style={{ marginTop: 20 }}
                onPress={() => {
                    const newLanguage = currentLanguage === 'en' ? 'ar' : 'en'; // Alternar entre inglés y árabe
                    changeLanguage(newLanguage);
                }}
            >
                <Text>Change language</Text>
            </Button>
        </View>
    );
};

export default LogedToken;
