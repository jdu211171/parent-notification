import {DarkTheme, DefaultTheme, ThemeProvider} from '@react-navigation/native';
import {useFonts} from 'expo-font';
import {Stack, Tabs} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, {useEffect} from 'react';
import 'react-native-reanimated';

import {useColorScheme} from '@/hooks/useColorScheme';
import {SQLiteProvider} from "expo-sqlite";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../../assets/fonts/SpaceMono-Regular.ttf'),
    Poppins: require('../../assets/fonts/Poppins-Light.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
        <Stack.Screen name="+not-found"/>
      </Stack>
    </ThemeProvider>
  );
}
