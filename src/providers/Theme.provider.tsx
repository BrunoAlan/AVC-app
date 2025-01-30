import {
    createContext,
    useContext,
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import {
    ThemeProvider as NavigationThemeProvider,
    Theme,
    DefaultTheme,
    DarkTheme,
} from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import { Colors } from '@src/constants/theme';

const LIGHT_THEME: Theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        ...Colors.light,
    },
};

const DARK_THEME: Theme = {
    ...DarkTheme,
    ...Colors.dark,
};

// Context to share theme-related state
const ThemeContext = createContext<{
    theme: Theme;
    isDark: boolean;
}>({
    theme: LIGHT_THEME,
    isDark: false,
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const colorScheme = useColorScheme();

    const theme = useMemo(
        () => (colorScheme === 'dark' ? DARK_THEME : LIGHT_THEME),
        [colorScheme]
    );

    const hasMounted = useRef(false);
    const [isColorSchemeLoaded, setIsColorSchemeLoaded] = useState(false);

    useLayoutEffect(() => {
        if (hasMounted.current) {
            return;
        }
        setIsColorSchemeLoaded(true);
        hasMounted.current = true;
    }, []);

    if (!isColorSchemeLoaded) {
        return null;
    }

    return (
        <ThemeContext.Provider
            value={{ theme, isDark: colorScheme === 'dark' }}
        >
            <NavigationThemeProvider value={LIGHT_THEME}>
                {children}
            </NavigationThemeProvider>
        </ThemeContext.Provider>
    );
};

// Hook to access theme context
export const useTheme = () => useContext(ThemeContext);
