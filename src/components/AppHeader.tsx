import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { useDrawer } from "../context/DrawerContext";

type AppHeaderProps = {
  title?: string;
  showBack?: boolean;
  onBackPress?: () => void;
  rightElement?: React.ReactNode;
  showDrawerButton?: boolean;
  className?: string;
};

export default function AppHeader({
  title,
  showBack = false,
  onBackPress,
  rightElement,
  showDrawerButton = true,
  className = "",
}: AppHeaderProps) {
  const router = useRouter();
  const { openDrawer } = useDrawer();

  const handleBack = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      router.back();
    }
  };

  return (
    <View className={`flex-row items-center justify-between px-5 py-3.5 bg-transparent ${className}`}>
      <View className="flex-row items-center gap-3">
        {showDrawerButton && (
          <Pressable
            onPress={openDrawer}
            className="w-10 h-10 rounded-full bg-neutral-100 items-center justify-center active:bg-neutral-200"
            accessibilityLabel="Open Menu Sidebar"
          >
            <Ionicons name="menu-outline" size={22} color="#171717" />
          </Pressable>
        )}

        {showBack && (
          <Pressable
            onPress={handleBack}
            className="w-10 h-10 rounded-full bg-neutral-100 items-center justify-center active:bg-neutral-200"
            accessibilityLabel="Go Back"
          >
            <Ionicons name="chevron-back" size={20} color="#171717" />
          </Pressable>
        )}

        {title ? (
          <Text className="text-lg font-semibold text-neutral-900 leading-6">
            {title}
          </Text>
        ) : null}
      </View>

      {rightElement ? <View>{rightElement}</View> : null}
    </View>
  );
}
