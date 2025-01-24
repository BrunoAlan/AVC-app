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
    const { isDarkColorScheme } = useColorScheme();

    const theme = useMemo(
        () => (isDarkColorScheme ? DARK_THEME : LIGHT_THEME),
        [isDarkColorScheme]
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
        <ThemeContext.Provider value={{ theme, isDark: isDarkColorScheme }}>
            <NavigationThemeProvider value={theme}>
                {children}
            </NavigationThemeProvider>
        </ThemeContext.Provider>
    );
};

// Hook to access theme context
export const useTheme = () => useContext(ThemeContext);
