import React, {createContext, useState, ReactNode} from 'react';
import translation from "@/translations/translation";
import {getLocales} from "expo-localization";

export type Language = 'en' | 'ja';

export interface I18nContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  i18n: {
    [key in Language]: {
      welcome: string;
      login: string;
      email: string;
      enterEmail: string;
      password: string;
      enterPassword: string;
      loginToAccount: string;
      forgotPassword: string;
      resetPassword: string;
    };
  };
}

const i18n: I18nContextType['i18n'] = translation;

export const I18nContext = createContext<I18nContextType>({
  language: 'en',
  setLanguage: () => {
  },
  i18n: i18n,
});

interface I18nProviderProps {
  children: ReactNode;
}

export const I18nProvider = ({ children }: I18nProviderProps) => {
  const [language, setLanguage] = useState<Language>(
    (getLocales()[0].languageCode as Language) || 'en'
  );

  return (
    <I18nContext.Provider value={{ language, setLanguage, i18n }}>
      {children}
    </I18nContext.Provider>
  );
};
