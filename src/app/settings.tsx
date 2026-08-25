import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppHeader from "../components/AppHeader";

type ToggleProps = {
    value: boolean;
    onChange: () => void;
};

function Toggle({ value, onChange }: ToggleProps) {
    return (
        <Pressable
            onPress={onChange}
            className={`h-7 w-12 justify-center rounded-full px-1 ${
                value ? "bg-black" : "bg-[#DDDDDD]"
            }`}
        >
            <View
                className={`h-5 w-5 rounded-full bg-white ${
                    value ? "self-end" : "self-start"
                }`}
            />
        </Pressable>
    );
}

export default function Settings() {
    const [onDeviceOnly, setOnDeviceOnly] = useState(true);
    const [cloudFallback, setCloudFallback] = useState(false);
    const [notificationAccess, setNotificationAccess] = useState(true);
    const [localChatHistory, setLocalChatHistory] = useState(true);

    return (
        <SafeAreaView className="flex-1 bg-[#F7F7F5]">
            {/* App Header with sidebar drawer access and back button */}
            <AppHeader title="Settings" showBack={false} />

            <ScrollView className="flex-1 px-6" contentContainerStyle={{ paddingBottom: 32 }}>
                {/* Settings list */}
                <View className="mt-2">
                    <Text className="text-xs font-semibold tracking-wider text-neutral-400 uppercase mb-3 px-1">
                        Privacy & Local Preferences
                    </Text>

                    {/* On-device only */}
                    <View className="flex-row items-center justify-between rounded-2xl bg-white px-5 py-4 border border-neutral-200/60 shadow-sm">
                        <View className="flex-1 pr-4">
                            <Text className="text-sm font-medium text-[#242424]">
                                On-device only
                            </Text>
                            <Text className="mt-1 text-xs leading-4 text-[#737373]">
                                Block all cloud requests and internet traffic
                            </Text>
                        </View>
                        <Toggle value={onDeviceOnly} onChange={() => setOnDeviceOnly((v) => !v)} />
                    </View>

                    {/* Cloud fallback */}
                    <View className="mt-3 flex-row items-center justify-between rounded-2xl bg-white px-5 py-4 border border-neutral-200/60 shadow-sm">
                        <View className="flex-1 pr-4">
                            <Text className="text-sm font-medium text-[#242424]">
                                Cloud fallback
                            </Text>
                            <Text className="mt-1 text-xs leading-4 text-[#737373]">
                                Use online API for complex queries when needed
                            </Text>
                        </View>
                        <Toggle value={cloudFallback} onChange={() => setCloudFallback((v) => !v)} />
                    </View>

                    {/* Notification access */}
                    <View className="mt-3 flex-row items-center justify-between rounded-2xl bg-white px-5 py-4 border border-neutral-200/60 shadow-sm">
                        <View className="flex-1 pr-4">
                            <Text className="text-sm font-medium text-[#242424]">
                                Notification access
                            </Text>
                            <Text className="mt-1 text-xs leading-4 text-[#737373]">
                                Needed for smart local notification summaries
                            </Text>
                        </View>
                        <Toggle value={notificationAccess} onChange={() => setNotificationAccess((v) => !v)} />
                    </View>

                    {/* Local chat history */}
                    <View className="mt-3 flex-row items-center justify-between rounded-2xl bg-white px-5 py-4 border border-neutral-200/60 shadow-sm">
                        <View className="flex-1 pr-4">
                            <Text className="text-sm font-medium text-[#242424]">
                                Local chat history
                            </Text>
                            <Text className="mt-1 text-xs leading-4 text-[#737373]">
                                Encrypted and stored strictly on this device
                            </Text>
                        </View>
                        <Toggle value={localChatHistory} onChange={() => setLocalChatHistory((v) => !v)} />
                    </View>
                </View>

                {/* Footer note */}
                <Text className="mt-6 max-w-[300px] text-xs leading-5 text-[#737373] px-1">
                    All intelligence and text generation happens locally on this phone. Nothing is uploaded unless you explicitly enable cloud fallback.
                </Text>
            </ScrollView>
        </SafeAreaView>
    );
}