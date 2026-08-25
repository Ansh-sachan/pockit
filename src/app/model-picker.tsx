import { ScrollView, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import AppHeader from "../components/AppHeader";

export default function ModelScreen() {
    return (
        <SafeAreaView className="flex-1 bg-white">
            {/* App Header with sidebar drawer access and back button */}
            <AppHeader title="Choose Model" showBack={false} />

            <ScrollView className="flex-1 px-5" contentContainerStyle={{ paddingBottom: 32 }}>
                {/* Device detected */}
                <View className="mt-2 rounded-2xl bg-[#f1f1ef] px-5 py-4 border border-neutral-200/50">
                    <Text className="text-xs font-semibold text-[#858585] tracking-wider uppercase">
                        Device hardware detected
                    </Text>

                    <Text className="mt-1 text-base font-semibold text-neutral-900">
                        iQOO 15 · 12 GB RAM · Snapdragon
                    </Text>
                </View>

                {/* Models List */}
                <View className="mt-6">
                    <Text className="text-xs font-semibold tracking-wider text-neutral-400 uppercase mb-3 px-1">
                        Available Local Models
                    </Text>

                    {/* Llama */}
                    <View className="rounded-2xl border-2 border-neutral-900 bg-white px-5 py-4 shadow-sm">
                        <View className="flex-row items-center justify-between">
                            <View className="flex-row items-center gap-2">
                                <Ionicons name="sparkles" size={18} color="#171717" />
                                <Text className="text-lg font-bold text-neutral-900">
                                    Llama 3.2 1B
                                </Text>
                            </View>

                            <View className="rounded-full bg-[#eaf1e7] px-3 py-1 border border-green-200">
                                <Text className="text-xs font-semibold text-[#46683e]">
                                    Recommended
                                </Text>
                            </View>
                        </View>

                        <Text className="mt-2 text-xs font-medium text-neutral-500">
                            700 MB · fast generation · lightweight reasoning
                        </Text>
                    </View>

                    {/* Gemma */}
                    <View className="mt-3 rounded-2xl border border-neutral-200 bg-white px-5 py-4 active:bg-neutral-50">
                        <Text className="text-lg font-semibold text-neutral-900">
                            Gemma 2 2B
                        </Text>

                        <Text className="mt-1 text-xs font-medium text-neutral-500">
                            1.4 GB · balanced accuracy & speed
                        </Text>
                    </View>

                    {/* Phi */}
                    <View className="mt-3 rounded-2xl border border-neutral-200 bg-white px-5 py-4 active:bg-neutral-50">
                        <Text className="text-lg font-semibold text-neutral-900">
                            Phi-3 Mini
                        </Text>

                        <Text className="mt-1 text-xs font-medium text-neutral-500">
                            2.1 GB · stronger coding & math reasoning
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}