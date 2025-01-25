import { Colors } from '@/src/constants/Colors';
import { View, ActivityIndicator } from 'react-native';
const FullScreenLoading = () => {
    return (
        <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
            <ActivityIndicator size={'large'} color={Colors.main} />
        </View>
    );
};
export default FullScreenLoading;
