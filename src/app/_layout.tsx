import { Stack } from 'expo-router';

import { getLocales } from 'expo-localization';
import i18next from 'i18next';

import en from '../../static/langs/en.json';
import es from '../../static/langs/es.json';

const translations = {
    en: { translation: { ...en } },
    es: { translation: { ...es } },
};

export const i18nextInstance = i18next.init({
    compatibilityJSON: 'v3',
    ns: undefined,
    fallbackLng: 'en',
    lng: 'en',
    resources: translations,
});


export default function RootLayout() {
    return (
        <Stack>
            <Stack.Screen name='index' />
        </Stack>
    );
}
