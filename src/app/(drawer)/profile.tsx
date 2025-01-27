import Ionicons from '@node_modules/@expo/vector-icons/Ionicons';
import ThemedText from '@src/components/ui/ThemedText';
import { Stack, useRouter } from 'expo-router';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
const profile = () => {
    const router = useRouter();
    return (
        <View style={style.container}>
            <Stack.Screen
                name='profile'
                options={{
                    headerShown: true,
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => router.back()}>
                            <Ionicons name='arrow-back' size={24} />
                        </TouchableOpacity>
                    ),
                }}
            />
            <ThemedText>profile</ThemedText>
        </View>
    );
};

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default profile;
