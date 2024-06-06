import {Slot} from 'expo-router';
import {SessionProvider} from "@/contexts/auth-context";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {ThemeProvider} from "@/contexts/theme-context";
import {LanguageProvider} from "@/contexts/language-context";
import {I18nProvider} from "@/contexts/i18n-context";

export default function Root() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SessionProvider>
        <ThemeProvider>
          <LanguageProvider>
            <I18nProvider>
              <Slot/>
            </I18nProvider>
          </LanguageProvider>
        </ThemeProvider>
      </SessionProvider>
    </GestureHandlerRootView>
  );
}
