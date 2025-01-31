import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getLocales } from 'expo-localization';

import en from '../../static/langs/en.json';
import ar from '../../static/langs/ar.json';
import ja from '../../static/langs/ja.json';
import th from '../../static/langs/th.json';
import zh from '../../static/langs/zh.json';

const resources = {
    en: { translation: en },
    ar: { translation: ar },
    ja: { translation: ja },
    th: { translation: th },
    zh: { translation: zh },
};

// Get the default language/locale of the device
const defaultLocale = getLocales()?.[0]?.languageCode || 'en';

i18n.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    resources,
    lng: defaultLocale,
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
