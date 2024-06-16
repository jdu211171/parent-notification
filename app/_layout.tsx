import {Slot} from 'expo-router';
import {SessionProvider} from "@/contexts/auth-context";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {ThemeProvider} from "@/contexts/theme-context";
import {I18nProvider} from "@/contexts/i18n-context";
import {SQLiteProvider} from "expo-sqlite";
import {RootSiblingParent} from "react-native-root-siblings";

export default function Root() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SessionProvider>
        <ThemeProvider>
          <I18nProvider>
            <RootSiblingParent>
              <SQLiteProvider databaseName='parent.db' assetSource={{assetId: require('../assets/database/parent.db')}}  >
                <Slot/>
              </SQLiteProvider>
            </RootSiblingParent>
          </I18nProvider>
        </ThemeProvider>
      </SessionProvider>
    </GestureHandlerRootView>
  );
}
