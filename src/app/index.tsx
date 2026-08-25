import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, Text, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppHeader from "../components/AppHeader";

export default function Home() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-[#F7F7F5]">
      {/* Header with Sidebar Toggle */}
      <AppHeader
        rightElement={
          <View className="bg-green-100 rounded-full px-2.5 py-1 flex-row items-center gap-1.5">
            <View className="w-2 h-2 rounded-full bg-green-600" />
            <Text className="text-[11px] font-semibold text-green-800">
              Offline Ready
            </Text>
          </View>
        }
      />

      <ScrollView className="flex-1 px-6" contentContainerStyle={{ paddingBottom: 32 }}>
        {/* Hero Section */}
        <View className="items-center justify-center pt-8 pb-8">
          {/* Logo */}
          <View className="mb-4 h-16 w-16 items-center justify-center rounded-2xl bg-[#242424] shadow-md">
            <Ionicons name="sparkles-outline" size={32} color="#FFFFFF" />
          </View>

          {/* App Name */}
          <Text className="text-3xl font-bold text-[#242424] tracking-tight">
            NeuroPocket
          </Text>

          {/* Description */}
          <Text className="mt-3 max-w-[300px] text-center text-sm leading-6 text-[#737373]">
            On-device AI assistant that never leaves your phone.
            No internet, no subscription, 100% private.
          </Text>
        </View>

        {/* Quick Action Buttons */}
        <View className="gap-3 mb-6">
          <Pressable
            onPress={() => router.push("/chat")}
            className="flex-row items-center justify-between p-4 rounded-2xl bg-neutral-900 active:opacity-90 shadow-sm"
          >
            <View className="flex-row items-center gap-3">
              <View className="w-10 h-10 rounded-xl bg-neutral-800 items-center justify-center">
                <Ionicons name="chatbubble-ellipses-outline" size={22} color="white" />
              </View>
              <View>
                <Text className="text-white font-semibold text-base">Start AI Chat</Text>
                <Text className="text-neutral-400 text-xs">Ask anything offline with Llama 3.2</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#a3a3a3" />
          </Pressable>

          <Pressable
            onPress={() => router.push("/todo")}
            className="flex-row items-center justify-between p-4 rounded-2xl bg-white active:bg-neutral-50 shadow-sm border border-neutral-200/80"
          >
            <View className="flex-row items-center gap-3">
              <View className="w-10 h-10 rounded-xl bg-orange-50 items-center justify-center">
                <Ionicons name="checkbox-outline" size={22} color="#f97316" />
              </View>
              <View>
                <Text className="text-neutral-900 font-semibold text-base">Task Assistant</Text>
                <Text className="text-neutral-500 text-xs">Manage to-dos & AI smart syncing</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#737373" />
          </Pressable>
        </View>

        {/* Navigation Grid Cards */}
        <Text className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-3 px-1">
          Explore Features
        </Text>

        <View className="flex-row flex-wrap justify-between gap-3">
          <Pressable
            onPress={() => router.push("/notificationsum")}
            className="w-[48%] bg-white p-4 rounded-2xl border border-neutral-200/60 active:bg-neutral-50"
          >
            <View className="w-9 h-9 rounded-xl bg-amber-50 items-center justify-center mb-3">
              <Ionicons name="notifications-outline" size={20} color="#d97706" />
            </View>
            <Text className="font-semibold text-neutral-900 text-sm">Notifications</Text>
            <Text className="text-neutral-500 text-[11px] mt-1">Smart summary</Text>
          </Pressable>

          <Pressable
            onPress={() => router.push("/wellbeing")}
            className="w-[48%] bg-white p-4 rounded-2xl border border-neutral-200/60 active:bg-neutral-50"
          >
            <View className="w-9 h-9 rounded-xl bg-purple-50 items-center justify-center mb-3">
              <Ionicons name="stats-chart-outline" size={20} color="#9333ea" />
            </View>
            <Text className="font-semibold text-neutral-900 text-sm">Screen Time</Text>
            <Text className="text-neutral-500 text-[11px] mt-1">Focus analytics</Text>
          </Pressable>

          <Pressable
            onPress={() => router.push("/model-picker")}
            className="w-[48%] bg-white p-4 rounded-2xl border border-neutral-200/60 active:bg-neutral-50"
          >
            <View className="w-9 h-9 rounded-xl bg-blue-50 items-center justify-center mb-3">
              <Ionicons name="hardware-chip-outline" size={20} color="#2563eb" />
            </View>
            <Text className="font-semibold text-neutral-900 text-sm">AI Models</Text>
            <Text className="text-neutral-500 text-[11px] mt-1">Llama, Gemma, Phi</Text>
          </Pressable>

          <Pressable
            onPress={() => router.push("/settings")}
            className="w-[48%] bg-white p-4 rounded-2xl border border-neutral-200/60 active:bg-neutral-50"
          >
            <View className="w-9 h-9 rounded-xl bg-emerald-50 items-center justify-center mb-3">
              <Ionicons name="settings-outline" size={20} color="#059669" />
            </View>
            <Text className="font-semibold text-neutral-900 text-sm">Settings</Text>
            <Text className="text-neutral-500 text-[11px] mt-1">Privacy & device</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}