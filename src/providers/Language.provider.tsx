import { getLocales } from 'expo-localization';
import i18next from 'i18next';
import en from '../../static/langs/en.json';
import es from '../../static/langs/es.json';
import ar from '../../static/langs/ar.json';
import { View } from 'react-native';
import { useEffect, useState, createContext, useContext } from 'react';

const translations = {
    en: { translation: { ...en } },
    es: { translation: { ...es } },
    ar: { translation: { ...ar } },
};

export const i18nextInstance = i18next.init({
    compatibilityJSON: 'v3',
    ns: undefined,
    fallbackLng: 'en',
    lng: 'ar',
    resources: translations,
});

export const LanguageContext = createContext({
    currentLanguage: i18next.language,
    changeLanguage: (lng: string) => {},
});

interface Props {
    children: React.ReactNode;
}

export default function LanguageProvider({ children }: Props) {
    const [currentLanguage, setCurrentLanguage] = useState(i18next.language);

    useEffect(() => {
        const handleLanguageChange = () => setCurrentLanguage(i18next.language);
        i18next.on('languageChanged', handleLanguageChange);
        return () => {
            i18next.off('languageChanged', handleLanguageChange);
        };
    }, []);

    const changeLanguage = (lng: string) => {
        i18next.changeLanguage(lng).then(() => {
            console.log(`Language changed to: ${lng}`);
        });
    };

    return (
        <LanguageContext.Provider value={{ currentLanguage, changeLanguage }}>
            <View
                style={{
                    flex: 1,
                    direction: i18next.dir() === 'rtl' ? 'rtl' : 'ltr',
                }}
            >
                {children}
            </View>
        </LanguageContext.Provider>
    );
}

export const useLanguage = () => useContext(LanguageContext);
