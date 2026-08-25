import { useRouter } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppHeader from "../components/AppHeader";

export default function NotificationSummary() {
    const router = useRouter();

    return (
        <SafeAreaView className="flex-1 bg-[#F7F7F5]">
            {/* App Header with sidebar drawer access and back button */}
            <AppHeader title="Notification Summary" showBack={false} />

            <ScrollView className="flex-1 px-6" contentContainerStyle={{ paddingBottom: 32 }}>
                {/* Processed on-device badge */}
                <View className="mt-2 rounded-2xl bg-[#EAF1E7] border border-[#d2e4cb] px-5 py-4">
                    <Text className="text-xs font-semibold text-[#46683E] tracking-wide uppercase mb-1">
                        Privacy Shield Active
                    </Text>
                    <Text className="text-sm leading-5 text-[#3b5934]">
                        Processed 100% on-device · zero data sent to the cloud
                    </Text>
                </View>

                {/* Notifications list */}
                <View className="mt-5">
                    <Text className="text-xs font-semibold tracking-wider text-neutral-400 uppercase mb-3 px-1">
                        Today's Action Items
                    </Text>

                    {/* Payment */}
                    <View className="rounded-2xl bg-white px-5 py-4 border border-neutral-200/60 shadow-sm">
                        <Text className="text-xs font-semibold tracking-wide text-amber-600">
                            PAYMENT DUE
                        </Text>
                        <Text className="mt-1 text-sm font-medium leading-5 text-[#242424]">
                            Credit card bill due in 2 days — ₹4,200
                        </Text>
                    </View>

                    {/* Calendar */}
                    <View className="mt-3 rounded-2xl bg-white px-5 py-4 border border-neutral-200/60 shadow-sm">
                        <Text className="text-xs font-semibold tracking-wide text-blue-600">
                            CALENDAR SHIFT
                        </Text>
                        <Text className="mt-1 text-sm font-medium leading-5 text-[#242424]">
                            Team meeting moved from 3 PM to 5 PM
                        </Text>
                    </View>

                    {/* Message */}
                    <View className="mt-3 rounded-2xl bg-white px-5 py-4 border border-neutral-200/60 shadow-sm">
                        <Text className="text-xs font-semibold tracking-wide text-purple-600">
                            WHATSAPP MESSAGE
                        </Text>
                        <Text className="mt-1 text-sm font-medium leading-5 text-[#242424]">
                            Priya asked about the pitch deck on WhatsApp
                        </Text>
                    </View>
                </View>

                {/* Draft a reply button */}
                <Pressable
                    onPress={() => router.push("/chat")}
                    className="mt-6 h-12 px-6 items-center justify-center rounded-full bg-black active:opacity-80 self-start flex-row gap-2 shadow-sm"
                >
                    <Text className="text-sm font-medium text-white">
                        Draft AI Reply in Chat →
                    </Text>
                </Pressable>
            </ScrollView>
        </SafeAreaView>
    );
}