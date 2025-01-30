import Ionicons from '@node_modules/@expo/vector-icons/Ionicons';
import { Stack, useRouter } from 'expo-router';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { FullScreenLoading, ThemedText } from '@components';
import Card from '@src/components/ui/Card';
import { useAccount } from '@src/hooks/useAccount';

const profile = () => {
    const router = useRouter();
    const { account, isFetching } = useAccount();

    if (isFetching) {
        return <FullScreenLoading />;
    }

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
            <Card title='Profile'>
                {account && (
                    <View>
                        <ThemedText>{account.primary.firstName}</ThemedText>
                        <ThemedText>{account.primary.lastName}</ThemedText>
                        <ThemedText>{account.primary.email}</ThemedText>
                    </View>
                )}
            </Card>
            <Card title='Profile'>
                {account && (
                    <View>
                        <ThemedText>{account.secondary.firstName}</ThemedText>
                        <ThemedText>{account.secondary.lastName}</ThemedText>
                        <ThemedText>{account.secondary.email}</ThemedText>
                    </View>
                )}
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
