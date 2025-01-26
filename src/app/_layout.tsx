import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { ThemeProvider, useTheme } from '../providers/Theme.provider';
import LanguageProvider from '../providers/Language.provider';
import QueryClientProvider from '../providers/QueryClient.provider';

export default function RootLayout() {
    SplashScreen.preventAutoHideAsync();
    SplashScreen.setOptions({ duration: 1000, fade: true });

    return (
        <ThemeProvider>
            <QueryClientProvider>
                <LanguageProvider>
                    <Stack screenOptions={{ headerShown: false }}>
                        <Stack.Screen name='index' />
                        <Stack.Screen name='unauthorized' />
                        <Stack.Screen
                            name='(modals)/contract'
                            options={{
                                title: 'Contract',
                                presentation: 'transparentModal',
                            }}
                        />
                    </Stack>
                </LanguageProvider>
            </QueryClientProvider>
        </ThemeProvider>
    );
}
