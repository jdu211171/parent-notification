import React, {createContext, useContext, useEffect, useState} from 'react';
import {getLocales} from 'expo-localization';
import {I18n} from "i18n-js";
import translations from "@/translations/translation";

type LanguageContextType = {
  language: string;
  setLanguage: (language: string) => void;
  i18n: I18n;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider(props: { children: React.ReactNode }) {
  const [language, setLanguage] = useState(getLocales()[0]?.languageCode ?? 'en');
  const i18n = new I18n({
    locale: 'en',
    fallbacks: true,
    translations: translations,
  });

  // useEffect(() => {
  //   i18n.locale = language;
  // }, [language]);
  // console.log('language', language);
  // i18n.enableFallback = true;
  // i18n.locale = language;
  // i18n.locale = 'en';

  return (
    <LanguageContext.Provider value={{language, setLanguage, i18n}}>
      {props.children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
