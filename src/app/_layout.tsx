import { Stack } from 'expo-router';

import LanguageProvider from '../providers/Language.provider';

export default function RootLayout() {
    return (
        <LanguageProvider>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name='index' />
                <Stack.Screen name='unauthorized' />
            </Stack>
        </LanguageProvider>
    );
}
