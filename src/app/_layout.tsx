import "../../global.css";

import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Sidebar from "../components/Sidebar";
import { DrawerProvider } from "../context/DrawerContext";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <DrawerProvider>
        <StatusBar style="dark" />
        <Sidebar />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="todo" />
          <Stack.Screen name="chat" />
          <Stack.Screen name="notificationsum" />
          <Stack.Screen name="wellbeing" />
          <Stack.Screen name="model-picker" />
          <Stack.Screen name="settings" />
        </Stack>
      </DrawerProvider>
    </SafeAreaProvider>
  );
}
