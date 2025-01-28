import Ionicons from '@node_modules/@expo/vector-icons/Ionicons';
import { Stack, useRouter } from 'expo-router';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { ThemedText } from '@components';
import Card from '@src/components/ui/Card';
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
            <Card title='Profile' description='This is the profile page'>
                <ThemedText>
                    adasd asd asd asd asd asd asd asd asd asd asd asd asd asd
                    asd
                </ThemedText>
            </Card>
        </View>
    );
};

const style = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default profile;
