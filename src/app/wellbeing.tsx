import { useRouter } from "expo-router";
import { Pressable, SafeAreaView, ScrollView, Text, View } from "react-native";

type AppUsage = {
    name: string;
    time: string;
    pct: number; // 0 to 1
    color: string;
};

const usage: AppUsage[] = [
    { name: "YouTube", time: "1h 32m", pct: 0.75, color: "bg-red-500" },
    { name: "Instagram", time: "58m", pct: 0.5, color: "bg-purple-500" },
    { name: "Chrome", time: "41m", pct: 0.35, color: "bg-blue-500" },
    { name: "NeuroPocket", time: "22m", pct: 0.2, color: "bg-green-700" },
];

export default function Wellbeing() {
    const router = useRouter();

    return (
        <SafeAreaView className="flex-1 bg-white">
            {/* Header */}
            <View className="flex-row items-center gap-2 px-5 pt-4 pb-3">
                <Pressable onPress={() => router.back()}>
                    <Text className="text-[15px] text-neutral-900">←</Text>
                </Pressable>
                <Text className="text-[17px] font-semibold text-neutral-900">
                    Screen Time
                </Text>
            </View>

            <ScrollView className="flex-1 px-5" contentContainerStyle={{ gap: 18 }}>
                {/* Total time card */}
                <View className="bg-neutral-900 rounded-2xl px-4 py-8">
                    <Text className="text-[10px] font-medium text-neutral-400 mb-1.5">
                        TODAY
                    </Text>
                    <View className="flex-row items-baseline gap-2.5">
                        <Text className="text-4xl font-semibold text-white">4h 12m</Text>
                        <View className="bg-neutral-700 rounded-lg px-2 py-0.5">
                            <Text className="text-[10px] text-green-50">
                                ↓ 18% vs yesterday
                            </Text>
                        </View>
                    </View>
                </View>

                {/* App usage bars */}
                <View>
                    <Text className="text-xs font-medium text-neutral-500 mb-2.5">
                        Top apps
                    </Text>
                    <View style={{ gap: 10 }}>
                        {usage.map((app) => (
                            <View key={app.name}>
                                <View className="flex-row justify-between mb-1.5">
                                    <Text className="text-xs text-neutral-900">{app.name}</Text>
                                    <Text className="text-[11px] text-neutral-400">
                                        {app.time}
                                    </Text>
                                </View>
                                <View className="h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                                    <View
                                        className={`h-full rounded-full ${app.color}`}
                                        style={{ width: `${app.pct * 100}%` }}
                                    />
                                </View>
                            </View>
                        ))}
                    </View>
                </View>

                {/* AI insight card */}
                <View className="bg-green-50 rounded-2xl px-4 py-3.5">
                    <View className="flex-row items-center gap-1.5 mb-1.5">
                        <View className="w-1.5 h-1.5 rounded-full bg-green-700" />
                        <Text className="text-[10px] font-medium text-green-800">
                            Generated on-device
                        </Text>
                    </View>
                    <Text className="text-[13px] text-green-900 leading-5">
                        You tend to get distracted after 2 PM. Try a 25-minute focus
                        session before your next task.
                    </Text>
                </View>
            </ScrollView>

            {/* CTA */}
            <View className="items-center px-5 pb-6 pt-2">
                <Pressable className="bg-neutral-900 rounded-full px-7 py-3.5 active:opacity-80">
                    <Text className="text-white text-[13px] font-medium">
                        Set a focus goal
                    </Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}