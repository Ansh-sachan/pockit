// app/notification-summary.tsx
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NotificationSummary() {
    const router = useRouter();

    return (
        <SafeAreaView className="flex-1 bg-[#F7F7F5]">
            <View className="flex-1 px-6">

                {/* Header */}
                <View className="flex-row items-center py-5">
                    <Pressable
                        onPress={() => router.back()}
                        className="mr-3 h-9 w-9 items-center justify-center"
                    >
                        <Ionicons name="chevron-back" size={22} color="#242424" />
                    </Pressable>

                    <Text className="text-2xl font-semibold text-[#242424]">
                        Notification summary
                    </Text>
                </View>

                {/* Processed on-device badge */}
                <View className="rounded-2xl bg-[#EAF1E7] px-5 py-4">
                    <Text className="text-sm leading-5 text-[#46683E]">
                        Processed on-device · nothing sent to the cloud
                    </Text>
                </View>

                {/* Notifications */}
                <View className="mt-5">

                    {/* Payment */}
                    <View className="rounded-2xl bg-white px-5 py-4">
                        <Text className="text-xs font-medium tracking-wide text-[#9A9A9A]">
                            PAYMENT
                        </Text>
                        <Text className="mt-1 text-sm leading-5 text-[#242424]">
                            Credit card bill due in 2 days — Rs 4,200
                        </Text>
                    </View>

                    {/* Calendar */}
                    <View className="mt-3 rounded-2xl bg-white px-5 py-4">
                        <Text className="text-xs font-medium tracking-wide text-[#9A9A9A]">
                            CALENDAR
                        </Text>
                        <Text className="mt-1 text-sm leading-5 text-[#242424]">
                            Team meeting moved from 3 PM to 5 PM
                        </Text>
                    </View>

                    {/* Message */}
                    <View className="mt-3 rounded-2xl bg-white px-5 py-4">
                        <Text className="text-xs font-medium tracking-wide text-[#9A9A9A]">
                            MESSAGE
                        </Text>
                        <Text className="mt-1 text-sm leading-5 text-[#242424]">
                            Priya asked about the pitch deck on WhatsApp
                        </Text>
                    </View>

                </View>

                {/* Draft a reply button */}
                <Pressable className="mt-6 h-12 w-40 items-center justify-center rounded-full bg-black">
                    <Text className="text-sm font-medium text-white">
                        Draft a reply
                    </Text>
                </Pressable>

            </View>
        </SafeAreaView>
    );
}