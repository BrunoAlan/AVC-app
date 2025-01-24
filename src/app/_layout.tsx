import '../../global.css';
import { Stack } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as SplashScreen from 'expo-splash-screen';
import { ThemeProvider } from '../providers/Theme.provider';
import LanguageProvider from '../providers/Language.provider';

export default function RootLayout() {
    const queryClient = new QueryClient();

    SplashScreen.preventAutoHideAsync();
    SplashScreen.setOptions({ duration: 1000, fade: true });

    return (
        <ThemeProvider>
            <QueryClientProvider client={queryClient}>
                <LanguageProvider>
                    <Stack screenOptions={{ headerShown: false }}>
                        <Stack.Screen name='index' />
                        <Stack.Screen name='unauthorized' />
                    </Stack>
                </LanguageProvider>
            </QueryClientProvider>
        </ThemeProvider>
    );
}
