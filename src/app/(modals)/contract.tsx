import { Stack, useRouter } from 'expo-router';
import { View, Text } from 'react-native';
import { BlurView } from 'expo-blur';
const contract = () => {
    const router = useRouter();
    return (
        <BlurView
            intensity={20}
            tint='dark'
            style={{
                flex: 1,

                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <View
                style={{
                    width: '80%',
                    height: '80%',
                    justifyContent: 'center',
                    alignItems: 'center',

                    backgroundColor: 'white',
                }}
            >
                <Text onPress={() => router.back()}>contract</Text>
            </View>
        </BlurView>
    );
};
export default contract;
