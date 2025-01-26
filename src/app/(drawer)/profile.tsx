import { Stack } from 'expo-router';
import { View, Text } from 'react-native';
const profile = () => {
    return (
        <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
            <Stack.Screen
                name='profile'
                options={{
                    headerShown: true,
                    headerShadowVisible: true,
                }}
            />
            <Text>profile</Text>
        </View>
    );
};
export default profile;
