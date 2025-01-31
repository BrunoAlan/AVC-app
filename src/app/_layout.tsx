import { ErrorBoundaryProps, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { ThemeProvider, useTheme } from '../providers/Theme.provider';
import LanguageProvider from '../providers/Language.provider';
import QueryClientProvider from '../providers/QueryClient.provider';
import { View, Text } from 'react-native';

export function ErrorBoundary({ error, retry }: ErrorBoundaryProps) {
    return (
        <View style={{ flex: 1, backgroundColor: 'red' }}>
            <Stack.Screen
                options={{
                    headerShown: false,
                    presentation: 'fullScreenModal',
                }}
            />
            <Text>{error.message}</Text>
            <Text onPress={retry}>Try Again?</Text>
        </View>
    );
}
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
                                animation: 'fade',
                            }}
                        />
                    </Stack>
                </LanguageProvider>
            </QueryClientProvider>
        </ThemeProvider>
    );
}
