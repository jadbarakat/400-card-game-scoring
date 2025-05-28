import { ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { AppDarkTheme, AppLightTheme } from "@/theme/theme";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <GestureHandlerRootView>
      <ThemeProvider
        value={colorScheme === "dark" ? AppDarkTheme : AppLightTheme}
      >
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen
            name="team-one-entry"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="team-two-entry"
            options={{ headerShown: false }}
          />
          <Stack.Screen name="playing-order" options={{ headerShown: false }} />
          {/* <Stack.Screen name="rules-setup" options={{ headerShown: false }} /> */}
          <Stack.Screen
            name="main-game-screen"
            options={{ headerShown: false }}
          />
          {/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> */}
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
