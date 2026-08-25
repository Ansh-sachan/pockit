import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const router = useRouter();
  return (
    <SafeAreaView className="flex-1 bg-[#F7F7F5]">
      <View className="flex-1 px-6">

        {/* Main Content */}
        <View className="flex-1 items-center justify-center">

          {/* Logo */}
          <View className="mb-5 h-14 w-14 items-center justify-center rounded-full bg-[#242424]">
            <Ionicons
              name="sparkles-outline"
              size={28}
              color="#FFFFFF"
            />
          </View>

          {/* App Name */}
          <Text className="text-2xl font-semibold text-[#242424]">
            NeuroPocket
          </Text>

          {/* Description */}
          <Text className="mt-3 max-w-[280px] text-center text-sm leading-5 text-[#737373]">
            On-device AI that never leaves your phone.
            No internet, no subscription, no data sharing.
          </Text>

        </View>

        {/* Button */}
        <View className="pb-12">
          <Pressable onPress={() => router.push("/settings")} className="h-12 items-center justify-center rounded-full bg-[#000000]">
            <Text className="text-sm font-medium text-white">
              Get started
            </Text>
          </Pressable>
        </View>

      </View>
    </SafeAreaView>
  );
}