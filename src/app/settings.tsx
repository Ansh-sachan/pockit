// app/settings.tsx
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type ToggleProps = {
    value: boolean;
    onChange: () => void;
};

function Toggle({ value, onChange }: ToggleProps) {
    return (
        <Pressable
            onPress={onChange}
            className={`h-7 w-12 justify-center rounded-full px-1 ${value ? "bg-black" : "bg-[#DDDDDD]"
                }`}
        >
            <View
                className={`h-5 w-5 rounded-full bg-white ${value ? "self-end" : "self-start"
                    }`}
            />
        </Pressable>
    );
}

export default function Settings() {
    const router = useRouter();

    const [onDeviceOnly, setOnDeviceOnly] = useState(true);
    const [cloudFallback, setCloudFallback] = useState(false);
    const [notificationAccess, setNotificationAccess] = useState(true);
    const [localChatHistory, setLocalChatHistory] = useState(true);

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
                        Settings
                    </Text>
                </View>

                {/* Settings list */}
                <View>

                    {/* On-device only */}
                    <View className="flex-row items-center justify-between rounded-2xl bg-white px-5 py-4">
                        <View className="flex-1 pr-4">
                            <Text className="text-sm font-medium text-[#242424]">
                                On-device only
                            </Text>
                            <Text className="mt-1 text-xs leading-4 text-[#737373]">
                                Block all cloud requests
                            </Text>
                        </View>
                        <Toggle value={onDeviceOnly} onChange={() => setOnDeviceOnly((v) => !v)} />
                    </View>

                    {/* Cloud fallback */}
                    <View className="mt-3 flex-row items-center justify-between rounded-2xl bg-white px-5 py-4">
                        <View className="flex-1 pr-4">
                            <Text className="text-sm font-medium text-[#242424]">
                                Cloud fallback
                            </Text>
                            <Text className="mt-1 text-xs leading-4 text-[#737373]">
                                Use API for complex queries
                            </Text>
                        </View>
                        <Toggle value={cloudFallback} onChange={() => setCloudFallback((v) => !v)} />
                    </View>

                    {/* Notification access */}
                    <View className="mt-3 flex-row items-center justify-between rounded-2xl bg-white px-5 py-4">
                        <View className="flex-1 pr-4">
                            <Text className="text-sm font-medium text-[#242424]">
                                Notification access
                            </Text>
                            <Text className="mt-1 text-xs leading-4 text-[#737373]">
                                Needed for summaries
                            </Text>
                        </View>
                        <Toggle value={notificationAccess} onChange={() => setNotificationAccess((v) => !v)} />
                    </View>

                    {/* Local chat history */}
                    <View className="mt-3 flex-row items-center justify-between rounded-2xl bg-white px-5 py-4">
                        <View className="flex-1 pr-4">
                            <Text className="text-sm font-medium text-[#242424]">
                                Local chat history
                            </Text>
                            <Text className="mt-1 text-xs leading-4 text-[#737373]">
                                Stored only on this device
                            </Text>
                        </View>
                        <Toggle value={localChatHistory} onChange={() => setLocalChatHistory((v) => !v)} />
                    </View>

                </View>

                {/* Footer note */}
                <Text className="mt-5 max-w-[280px] text-xs leading-5 text-[#737373]">
                    All processing happens on this device. Nothing is uploaded unless
                    you turn on cloud fallback.
                </Text>

            </View>
        </SafeAreaView>
    );
}