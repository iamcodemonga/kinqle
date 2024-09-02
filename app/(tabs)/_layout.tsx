import { Tabs, useRouter } from 'expo-router';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { BellIcon, HomeIcon, ProfileIcon, TrendIcon } from '../../components/tabIcons';
import { Provider } from "react-redux";
import { store } from "../../features/store";
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Platform } from 'react-native';
import { getFocusedRouteNameFromRoute, useRoute } from '@react-navigation/native';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const route = useRoute()
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';

  return (
    <Provider store={store} >
      <Tabs screenOptions={{ tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint, headerShown: false, tabBarStyle: { position: "absolute", minHeight: 100, backgroundColor: (routeName == "me" ? "#ffffff" : "#202124"), height: (Platform.OS == "android" ? 65 : 90), borderTopLeftRadius: (Platform.OS == "ios" ? 25 : 0 ), borderTopRightRadius: (Platform.OS == "ios" ? 25 : 0 ), borderTopColor: "transparent"} }}>
          <Tabs.Screen name="index" options={{ headerShown: false,tabBarShowLabel: false, tabBarIcon: (focused) => HomeIcon(focused.focused)}} />
          <Tabs.Screen name="trending" options={{ headerShown: false,tabBarShowLabel: false, tabBarIcon: (focused) => TrendIcon(focused.focused)}} />
          <Tabs.Screen name="notifications" options={{ headerShown: false,tabBarShowLabel: false, tabBarIcon: (focused) => BellIcon(focused.focused)}} />
          <Tabs.Screen name="me" options={{ headerShown: false,tabBarShowLabel: false, tabBarIcon: (focused) => ProfileIcon(focused.focused)}} />
      </Tabs>
    </Provider>
  );
}
