import { Stack } from 'expo-router';

import LanguageProvider from '../providers/Language.provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function RootLayout() {
    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <LanguageProvider>
                <Stack screenOptions={{ headerShown: false }}>
                    <Stack.Screen name='index' />
                    <Stack.Screen name='unauthorized' />
                </Stack>
            </LanguageProvider>
        </QueryClientProvider>
    );
}
