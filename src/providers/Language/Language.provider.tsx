import React, { useEffect, useState, createContext, useContext } from 'react';
import { View } from 'react-native';
import i18n from './i18n';

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

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng).then(() => {
            console.log(`Language changed to: ${lng}`);
        });
    };

    return (
        <LanguageContext.Provider value={{ currentLanguage, changeLanguage }}>
            <View style={{ flex: 1 }}>{children}</View>
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
