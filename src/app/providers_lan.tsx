'use client';

import { ReactNode} from 'react';
import { I18nextProvider,initReactI18next } from 'react-i18next';
import i18next from 'i18next';
import enTranslations from '@/locales/translations/en.json';
import esTranslations from '@/locales/translations/es.json';
import frTranslations from '@/locales/translations/fr.json';
import deTranslations from '@/locales/translations/de.json';
import itTranslations from '@/locales/translations/it.json';
import ptTranslations from '@/locales/translations/pt.json';
import nlTranslations from '@/locales/translations/nl.json';
import zhTranslations from '@/locales/translations/zh.json';
import jaTranslations from '@/locales/translations/ja.json';
import arTranslations from '@/locales/translations/ar.json';

i18next
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslations },
      es: { translation: esTranslations },
      fr: { translation: frTranslations },
      de: { translation: deTranslations },
      it: { translation: itTranslations },
      pt: { translation: ptTranslations },
      nl: { translation: nlTranslations },
      zh: { translation: zhTranslations },
      ja: { translation: jaTranslations },
      ar: { translation: arTranslations }
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

  interface ProvidersProps {
    readonly children: ReactNode;
  }

export function Providers({ children }: ProvidersProps) {
  return (
    <I18nextProvider i18n={i18next}>
      {children}
    </I18nextProvider>
  );
}

export { i18next }; 
