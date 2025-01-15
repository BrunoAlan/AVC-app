import { Stack, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import WebView from 'react-native-webview';
import * as Linking from 'expo-linking';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View } from 'react-native';
import { StorageAdapter } from '../config/adapters/storage-adapter';

export default function Login() {
    const { top } = useSafeAreaInsets();
    const router = useRouter();
    const url = Linking.useURL();

    useEffect(() => {
        if (!url) {
            return;
        }
        const { queryParams } = Linking.parse(url);
        const token = queryParams?.token as string;
        if (token) {
            StorageAdapter.setItem('token', token);
            router.navigate({
                pathname: '/[logedToken]',
                params: { logedToken: token },
            });
        }
    }, [url]);

    return (
        <View style={{ flex: 1, marginTop: top }}>
            <Stack.Screen options={{ headerShown: false }} />
            <WebView
                incognito={false}
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                userAgent='o'
                source={{
                    uri: 'https://login-dev.kognitiv.com/login?method=POST&service=https://echo-hbe-api-dev.kognitiv.com/login/?url=exp://192.168.0.126:8081/--/login',
                }}
                allowsBackForwardNavigationGestures={true}
            ></WebView>
        </View>
    );
}
