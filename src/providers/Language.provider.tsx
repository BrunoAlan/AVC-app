import React, { useEffect, useState, createContext, useContext } from 'react';
import { I18nManager, View } from 'react-native';
import i18n from './i18n';
import * as Updates from 'expo-updates';

interface LanguageContextType {
    currentLanguage: string;
    changeLanguage: (lng: string) => void;
}

export const LanguageContext = createContext<LanguageContextType>({
    currentLanguage: i18n.language,
    changeLanguage: () => {},
});

interface Props {
    children: React.ReactNode;
}

export const LanguageProvider: React.FC<Props> = ({ children }) => {
    const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

    useEffect(() => {
        const handleLanguageChange = (lng: string) => {
            setCurrentLanguage(lng);
        };
        i18n.on('languageChanged', handleLanguageChange);
        return () => {
            i18n.off('languageChanged', handleLanguageChange);
        };
    }, []);

    const changeLanguage = async (lng: string) => {
        i18n.changeLanguage(lng).then(() => {
            console.log(`Language changed to: ${lng}`);
        });

        if (lng === 'ar') {
            I18nManager.allowRTL(true);
            I18nManager.forceRTL(true);
        } else {
            I18nManager.allowRTL(false);
            I18nManager.forceRTL(false);
        }
        await Updates.reloadAsync();
    };

    return (
        <LanguageContext.Provider value={{ currentLanguage, changeLanguage }}>
            <View style={{ flex: 1 }}>{children}</View>
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
