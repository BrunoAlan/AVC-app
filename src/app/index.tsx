import { Stack, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import WebView from 'react-native-webview';
import * as Linking from 'expo-linking';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View } from 'react-native';
import { StorageAdapter } from '../config/adapters/storage-adapter';

export default function Index() {
    const { top } = useSafeAreaInsets();
    const router = useRouter();
    const url = Linking.useURL();

    useEffect(() => {
        if (!url) {
            return;
        }
        const { queryParams } = Linking.parse(url);
        (async () => {
            await StorageAdapter.setItem(
                'token',
                '45feccbfe3a6383d63bfcbea4dba0317'
            );
            const token =
                (queryParams?.token as string) ||
                (await StorageAdapter.getItem('token'));
            if (token || true) {
                // await StorageAdapter.setItem('token', 'token');
                router.replace({
                    pathname: '/(drawer)/(tabs)/home',
                });
            }
        })();
        return () => {};
    }, [url]);

    return (
        <View style={{ flex: 1, marginTop: top }}>
            <Stack.Screen options={{ headerShown: false }} />
            <WebView
                incognito={false}
                className='flex flex-1'
                userAgent='o'
                source={{
                    uri: 'https://login-dev.kognitiv.com/login?method=POST&service=https://echo-hbe-api-dev.kognitiv.com/login/?url=exp://192.168.0.206:8081',
                }}
                allowsBackForwardNavigationGestures={true}
            ></WebView>
        </View>
    );
}
