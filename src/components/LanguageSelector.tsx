'use client';
import { Select, SelectItem } from '@carbon/react';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { i18next } from '../app/providers_lan'; // Ensure correct import

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState(i18n.language || 'en');

  useEffect(() => {
    const updateLanguage = () => setCurrentLang(i18n.language);
    i18next.on('languageChanged', updateLanguage);

    return () => {
      i18next.off('languageChanged', updateLanguage);
    };
  }, []);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value;
    i18next.changeLanguage(newLang); // Use the correct i18n instance
    setCurrentLang(newLang);
  };

  return (
    <Select
      id="language-selector"
      value={currentLang}
      onChange={handleLanguageChange}
      labelText=""
      size="sm"
    >
      <SelectItem value="en" text="English" />
      <SelectItem value="es" text="Español" />
      <SelectItem value="fr" text="Français" />
<SelectItem value="de" text="Deutsch" />
<SelectItem value="it" text="Italiano" />
<SelectItem value="pt" text="Português" />
<SelectItem value="nl" text="Nederlands" />
<SelectItem value="zh" text="中文 (Simplified)" />
<SelectItem value="ja" text="日本語" />
<SelectItem value="ar" text="العربية" />
    </Select>
  );
};

export default LanguageSelector;
