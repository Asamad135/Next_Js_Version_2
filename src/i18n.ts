import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from '@/locales/translations/en.json';
import esTranslations from '@/locales/translations/es.json';

const i18n = i18next.createInstance(); // Create an i18next instance

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslations },
      es: { translation: esTranslations }
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
    react: { useSuspense: false }
  });

export default i18n;
