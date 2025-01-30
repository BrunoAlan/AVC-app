import { Stack, useRouter } from 'expo-router';
import { useEffect } from 'react';
import WebView from 'react-native-webview';
import * as Linking from 'expo-linking';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View } from 'react-native';
import { StorageAdapter } from '../config/adapters/storage-adapter';

export default function Index() {
    const { top } = useSafeAreaInsets();
    const router = useRouter();
    const url = Linking.useURL();

    async function handleIncomingUrl(linkUrl: string) {
        const { queryParams } = Linking.parse(linkUrl);
        const incomingToken = queryParams?.token as string;

        const savedToken = await StorageAdapter.getItem('token');

        if (savedToken) {
            router.replace({ pathname: '/(drawer)/(tabs)/home' });
            return;
        }

        if (incomingToken) {
            await StorageAdapter.setItem('token', incomingToken);
            router.replace({ pathname: '/(drawer)/(tabs)/home' });
        }
    }

    useEffect(() => {
        if (!url) return;
        handleIncomingUrl(url);
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
                allowsBackForwardNavigationGestures
            />
        </View>
    );
}
