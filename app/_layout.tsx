import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { Provider, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState, store } from "../features/store";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { Connection, Keypair } from '@solana/web3.js';
import { fetchUser } from '@/features/authSlice';
import StackNavigator from '@/components/navigation/StackNavigator';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
      'Sans-bold': require('../assets/fonts/Sans-bold.ttf'),
      'Sans-medium': require('../assets/fonts/Sans-medium.ttf'),
      'Sans-regular': require('../assets/fonts/Sans-regular.ttf'),
  });

  useEffect(() => {
    const connection = new Connection("https://api.devnet.solana.com", "confirmed");
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  const toastConfig = {
    success: (props: any) => (
      <BaseToast
      // 189040
      // #21bf55
        {...props}
        style={{ backgroundColor: "#189040", borderRadius: "25%", borderLeftWidth: 0, height: 70 }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontFamily: "Sans-bold",
          fontSize: 15,
          color: "white",
          textAlign: "center"
        }}
        text2Style={{
          fontFamily: "Sans-medium",
          fontSize: 12,
          color: "#efefef"
        }}
      />
    ),
    error: (props: any) => (
      <ErrorToast
        {...props}
        style={{ backgroundColor: "#ff2205", borderRadius: "25%", borderLeftWidth: 0, height: 70 }}
        text1Style={{
          fontFamily: "Sans-bold",
          fontSize: 15,
          color: "white",
          textAlign: "center",
          flexWrap: "nowrap"
        }}
        text2Style={{
          fontFamily: "Sans-medium",
          fontSize: 12,
          color: "#efefef"
        }}
      />
    )
  };

  return (
    <Provider store={store}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <GestureHandlerRootView style={{flex: 1}}>
          <StackNavigator />
        </GestureHandlerRootView>
        <Toast config={toastConfig} topOffset={50} />
      </ThemeProvider>
    </Provider>
  );
}
