import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppHeader from "../components/AppHeader";

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
    return (
        <SafeAreaView className="flex-1 bg-white">
            {/* App Header with drawer button and back button */}
            <AppHeader title="Screen Time" showBack={false} />

            <ScrollView className="flex-1 px-5" contentContainerStyle={{ gap: 18, paddingBottom: 24 }}>
                {/* Total time card */}
                <View className="bg-neutral-900 rounded-2xl px-5 py-7 shadow-sm">
                    <Text className="text-[10px] font-semibold tracking-wider text-neutral-400 mb-1.5 uppercase">
                        TODAY
                    </Text>
                    <View className="flex-row items-baseline gap-2.5">
                        <Text className="text-4xl font-bold text-white">4h 12m</Text>
                        <View className="bg-neutral-800 rounded-lg px-2.5 py-1 border border-neutral-700">
                            <Text className="text-[11px] font-medium text-green-400">
                                ↓ 18% vs yesterday
                            </Text>
                        </View>
                    </View>
                </View>

                {/* App usage bars */}
                <View>
                    <Text className="text-xs font-semibold text-neutral-500 mb-3 uppercase tracking-wider">
                        Top apps
                    </Text>
                    <View style={{ gap: 12 }}>
                        {usage.map((app) => (
                            <View key={app.name}>
                                <View className="flex-row justify-between mb-1.5">
                                    <Text className="text-xs font-medium text-neutral-900">{app.name}</Text>
                                    <Text className="text-[11px] text-neutral-400 font-medium">
                                        {app.time}
                                    </Text>
                                </View>
                                <View className="h-2 bg-neutral-100 rounded-full overflow-hidden">
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
                <View className="bg-green-50 border border-green-200/60 rounded-2xl px-4 py-4">
                    <View className="flex-row items-center gap-1.5 mb-1.5">
                        <View className="w-2 h-2 rounded-full bg-green-700" />
                        <Text className="text-[11px] font-semibold text-green-800">
                            Generated on-device AI
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
                <Pressable className="bg-neutral-900 rounded-full px-7 py-3.5 active:opacity-80 shadow-sm">
                    <Text className="text-white text-[13px] font-medium">
                        Set a focus goal
                    </Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}