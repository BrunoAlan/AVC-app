import { Stack, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import WebView from 'react-native-webview';
import * as Linking from 'expo-linking';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Pressable, Text, View } from 'react-native';
import { StorageAdapter } from '../config/adapters/storage-adapter';

export default function Index() {
    const { top } = useSafeAreaInsets();
    const router = useRouter();

    const url = Linking.useURL();

    return (
        <View
            style={{
                flex: 1,
                marginTop: top,
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Stack.Screen options={{ headerShown: false }} />
            <Pressable
                onPress={() => {
                    router.navigate({
                        pathname: '/login',
                    });
                }}
                style={{
                    padding: 10,
                    backgroundColor: 'blue',
                    borderRadius: 5,
                }}
            >
                <Text>login</Text>
            </Pressable>
        </View>
    );
}
