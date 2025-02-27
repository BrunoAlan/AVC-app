import { Colors } from '@/src/constants/theme';
import { View, ActivityIndicator } from 'react-native';
export const FullScreenLoading = () => {
    return (
        <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
            <ActivityIndicator size={'large'} color={Colors.main} />
        </View>
    );
};
