import '../../global.css';

import { Stack } from 'expo-router';

import LanguageProvider from '../providers/Language.provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as SplashScreen from 'expo-splash-screen';

import {
    Theme,
    ThemeProvider,
    DefaultTheme,
    DarkTheme,
} from '@react-navigation/native';
import * as React from 'react';
import { Platform } from 'react-native';
import { NAV_THEME } from '~/lib/constants';
import { useColorScheme } from '~/lib/useColorScheme';

const LIGHT_THEME: Theme = {
    ...DefaultTheme,
    colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
    ...DarkTheme,
    colors: NAV_THEME.dark,
};

export {
    // Catch any errors thrown by the Layout component.
    ErrorBoundary,
} from 'expo-router';

export default function RootLayout() {
    const hasMounted = React.useRef(false);
    const { colorScheme, isDarkColorScheme } = useColorScheme();
    const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);

    React.useLayoutEffect(() => {
        if (hasMounted.current) {
            return;
        }

        if (Platform.OS === 'web') {
            // Adds the background color to the html element to prevent white background on overscroll.
            document.documentElement.classList.add('bg-background');
        }
        setIsColorSchemeLoaded(true);
        hasMounted.current = true;
    }, []);

    if (!isColorSchemeLoaded) {
        return null;
    }
    const queryClient = new QueryClient();

    // Keep the splash screen visible while we fetch resources
    SplashScreen.preventAutoHideAsync();

    // Set the animation options. This is optional.
    SplashScreen.setOptions({
        duration: 1000,
        fade: true,
    });

    return (
        <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
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
