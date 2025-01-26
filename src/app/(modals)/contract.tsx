import { Stack, useRouter } from 'expo-router';
import { View, Text } from 'react-native';
const contract = () => {
    const router = useRouter();
    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'red',
            }}
        >
            <Stack.Screen
                name='(modals)/contract'
                options={{
                    headerShown: true,
                    headerShadowVisible: true,
                }}
            />
            <Text onPress={() => router.back()}>contract</Text>
        </View>
    );
};
export default contract;
