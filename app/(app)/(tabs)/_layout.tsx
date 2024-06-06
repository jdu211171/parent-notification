import {Redirect, Tabs} from 'expo-router';
import React from 'react';
import {TabBarIcon} from '@/components/navigation/TabBarIcon';
import {Colors} from '@/constants/Colors';
import {useColorScheme} from '@/hooks/useColorScheme';
import {Text} from "react-native";
import {useSession} from "@/contexts/auth-context";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const {session, isLoading} = useSession();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!session) {
    return <Redirect href="/sign-in"/>;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({color, focused}) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color}/>
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Form',
          tabBarIcon: ({color, focused}) => (
            <TabBarIcon name={focused ? 'document-text' : 'document-text-outline'} color={color}/>
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({color, focused}) => (
            <TabBarIcon name={focused ? 'settings' : 'settings-outline'} color={color}/>
          ),
        }}
      />
    </Tabs>
  );
}
