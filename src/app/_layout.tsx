import '../../global.css';

import { Stack } from 'expo-router';

import LanguageProvider from '../providers/Language.provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as SplashScreen from 'expo-splash-screen';

export default function RootLayout() {
    const queryClient = new QueryClient();

    // Keep the splash screen visible while we fetch resources
    SplashScreen.preventAutoHideAsync();

    // Set the animation options. This is optional.
    SplashScreen.setOptions({
        duration: 1000,
        fade: true,
    });

    return (
        <QueryClientProvider client={queryClient}>
            <LanguageProvider>
                <Stack screenOptions={{ headerShown: false }}>
                    <Stack.Screen name='index' />
                    <Stack.Screen name='unauthorized' />
                    <Stack.Screen name={'(protected)/[logedToken]'} />
                </Stack>
            </LanguageProvider>
        </QueryClientProvider>
    );
}
